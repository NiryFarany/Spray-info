# backend/user-service/app/routes/user_routes.py
from flask import Blueprint, request, jsonify # type: ignore
from app import db
from app.models.user import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity # type: ignore
import re

user_bp = Blueprint('user_bp', __name__)

# === REGISTER ===
@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone')


    if not all([name, email, password,phone]):
        return jsonify({"error": "Tous les champs sont requis"}), 400

    if len(password) < 8:
        return jsonify({"error": "Mot de passe trop court"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email déjà utilisé"}), 400

    user = User(name=name, email=email, phone=phone)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Inscription réussie"}), 201

# === LOGIN ===
@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Email ou mot de passe incorrect"}), 401

    #token = create_access_token(identity=user.id)  #de ho ity ve?
    token = create_access_token(identity=str(user.id))#eka tena ity
    return jsonify({
        "token": token,
        "user": user.to_dict()
    }), 200

# === PROFIL (PROTÉGÉ) ===
@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.to_dict())

# backend/user-service/app/routes/user_routes.py

# === AJOUTE ÇA À LA FIN ===
@user_bp.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]) #nijereko t@backend ty fa mety moa zany

# === ROUTE ADMIN : TOUS LES UTILISATEURS ===
@user_bp.route('/admin/users', methods=['GET'])
@jwt_required()
def get_all_users_admin():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user or not current_user.is_admin:
        return jsonify({"error": "Accès refusé. Admin requis."}), 403
    
    users = User.query.all()
    return jsonify([{
        "id": u.id,
        "name": u.name,
        "phone": u.phone,
        "email": u.email,
        "is_admin": u.is_admin,
        "created_at": u.created_at.strftime("%d/%m/%Y")
    } for u in users]), 200
#tsisy modifier sy supprimer ato
#supprimer user
""" @user_bp.route('/admin/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user_admin(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Vérification admin
    if not current_user or not current_user.is_admin:
        return jsonify({"error": "Accès refusé. Admin requis."}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Utilisateur introuvable"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "Utilisateur supprimé"}), 200
 """
#on ne supprime n'import les admin
@user_bp.route('/admin/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user_admin(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Vérification admin
    if not current_user or not current_user.is_admin:
        return jsonify({"error": "Accès refusé. Admin requis."}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Utilisateur introuvable"}), 404

    # 🚫 Empêcher la suppression d'un admin
    if user.is_admin:
        return jsonify({"error": "Impossible de supprimer un administrateur"}), 403

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "Utilisateur supprimé"}), 200


#modifier user
@user_bp.route('/admin/user/<int:user_id>/role', methods=['PUT'])
@jwt_required()
def update_role_admin(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Vérification admin
    if not current_user or not current_user.is_admin:
        return jsonify({"error": "Accès refusé. Admin requis."}), 403

    data = request.get_json()
    is_admin = data.get('is_admin')

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Utilisateur introuvable"}), 404

    user.is_admin = bool(is_admin)
    db.session.commit()

    return jsonify({"message": "Rôle mis à jour", "is_admin": user.is_admin}), 200

#user information
# === CHANGER MOT DE PASSE ===
""" @user_bp.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    data = request.get_json()
    
    old_password = data.get('old_password')
    new_password = data.get('new_password')
    
    if not user.check_password(old_password):
        return jsonify({"error": "Ancien mot de passe incorrect"}), 400
        
    if len(new_password) < 8:
        return jsonify({"error": "Nouveau mot de passe trop court"}), 400
        
    user.set_password(new_password)
    db.session.commit()
    
    return jsonify({"message": "Mot de passe changé avec succès"}), 200
alako aloha ty
 """
@user_bp.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    data = request.get_json()

    if not user.check_password(data['currentPassword']):
        return jsonify({"error": "Mot de passe actuel incorrect"}), 400

    user.set_password(data['newPassword'])
    db.session.commit()

    return jsonify({"message": "Mot de passe changé avec succès"}), 200

# === MODIFIER SON PROFIL (NOM + TÉLÉPHONE) ===
@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "Utilisateur non trouvé"}), 404

    data = request.get_json()

    # Champs autorisés à être modifiés
    user.name = data.get('name', user.name).strip()
    phone = data.get('phone', user.phone)
    user.phone = phone.strip() if phone and phone.strip() else None
    #
    """ user.name = data.get('name', user.name).strip()
    user.phone = data.get('phone', user.phone)
    if data.get('phone') == '':
        user.phone = None """
    #

    try:
        db.session.commit()
        return jsonify({
            "message": "Profil mis à jour avec succès",
            "user": user.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erreur lors de la sauvegarde"}), 500
