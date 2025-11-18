# order-service/app/routes/order_routes.py
#juste ameliortion pendant code
from flask import Blueprint, request, jsonify # type: ignore
#from . import db
#from app.models.order import db
#from .models.order import Order, OrderItem # type: ignore
from app import db
from app.models.order import Order, OrderItem
import requests
from flask_jwt_extended import jwt_required, get_jwt_identity # type: ignore


order_bp = Blueprint('order_bp', __name__)

# Récupérer les formations via formation-service
FORMATION_SERVICE_URL = 'http://localhost:5002/api/formations'

def get_formation_details(formation_id):
    try:
        resp = requests.get(f"{FORMATION_SERVICE_URL}/{formation_id}")
        if resp.status_code == 200:
            return resp.json()
    except:
        pass
    return None

""" @order_bp.route('/', methods=['POST'])
@jwt_required()  # OBLIGATOIRE MAINTENANT  @zay tsy user_id=1 sasy
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    items = data.get('items', [])  # [{formation_id: 1}, ...]

    if not user_id or not items:
        return jsonify({'error': 'user_id et items requis'}), 400

    total = 0
    order_items = []

    for item in items:
        formation_id = item.get('formation_id')
        formation = get_formation_details(formation_id)
        if not formation:
            return jsonify({'error': f'Formation {formation_id} non trouvée'}), 404
        
        price = formation['price']
        total += price

        order_items.append(OrderItem(
            formation_id=formation_id,
            formation_name=formation['name'],
            price=price
        ))

    order = Order(user_id=user_id, total_amount=total, status='pending')
    order.items = order_items

    db.session.add(order)
    db.session.commit()

    return jsonify(order.to_dict()), 201

 """

@order_bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()

    try:
        data = request.get_json(force=True)
    except:
        return jsonify({"error": "JSON invalide"}), 400

    print("DATA REÇUE →", data)  # ← Tu vas voir ça !

    # VÉRIFICATION PROPRE ET CLAIRE
    if not data or 'items' not in data:
        return jsonify({"error": "Le champ 'items' est requis"}), 422

    items = data['items']

    if not isinstance(items, list) or len(items) == 0:
        return jsonify({"error": "Le champ 'items' doit être une liste non vide"}), 422

    # MAINTENANT ON EST SÛR QUE items EST UNE LISTE NON VIDE
    total = 0
    order_items = []

    for item in items:
        formation_id = item.get('formation_id')
        if not formation_id:
            return jsonify({"error": "formation_id manquant dans un item"}), 400

        formation = get_formation_details(formation_id)
        if not formation:
            return jsonify({'error': f'Formation {formation_id} non trouvée'}), 404

        price = formation['price']
        total += price
        order_items.append(OrderItem(
            formation_id=formation_id,
            formation_name=formation['name'],
            price=price
        ))

    # CRÉATION DE LA COMMANDE
    order = Order(user_id=user_id, total_amount=total, status='pending')
    order.items = order_items
    db.session.add(order)
    db.session.commit()

    return jsonify(order.to_dict()), 201

@order_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([o.to_dict() for o in orders])



@order_bp.route('/<int:order_id>/pay', methods=['POST'])
def mark_as_paid(order_id):
    order = Order.query.get_or_404(order_id)
    order.status = 'paid'
    db.session.commit()
    return jsonify(order.to_dict())


""" # === ANNULER UNE COMMANDE (seulement si pending et appartenant au client) ===
@order_bp.route('/<int:order_id>', methods=['DELETE'])
@jwt_required()
def cancel_order(order_id):
    current_user_id = get_jwt_identity()  # ID du client connecté
    order = Order.query.get_or_404(order_id)

    # Vérifie que la commande appartient bien à l'utilisateur connecté
    if order.user_id != current_user_id:
        return jsonify({"error": "Accès refusé : cette commande ne vous appartient pas"}), 403

    # Seules les commandes en attente ("pending") peuvent être annulées
    if order.status != 'pending':
        return jsonify({"error": "Seules les commandes en attente peuvent être annulées"}), 400

    # OPTION 1 : supprimer la commande (si tu tiens à delete)
    # db.session.delete(order)

    # OPTION 2 (recommandé) : mettre à jour le statut en "cancelled"
    order.status = "cancelled"

    db.session.commit()

    return jsonify({"message": "Commande annulée avec succès"}), 200
 """


# === ANNULER COMMANDE (seulement si pending + appartient à l'utilisateur) ===
@order_bp.route('/<int:order_id>', methods=['DELETE'])
#@jwt_required()  #apodiko @ place_ny @zay
#@jwt_required()#commenter-na hi tester-vana zvt
@jwt_required(optional=True)  # PERMET TEST SANS JWT
def cancel_order(order_id):
    #current_user_id = get_jwt_identity()    # ✅ récupère l'id dans le token
    current_user_id = 1 #apodiko @ place_ny @zay  apres n'ny test supprimer commande, devient status cancelled
    order = Order.query.get_or_404(order_id)

    # Vérifie que la commande appartient à l'utilisateur connecté
    if order.user_id != current_user_id:
        return jsonify({"error": "Accès refusé : cette commande ne vous appartient pas"}), 403

    # Seules les commandes "pending" peuvent être annulées
    if order.status != 'pending':
        return jsonify({"error": "Seules les commandes en attente peuvent être annulées"}), 400

    # OPTION RECOMMANDÉE : Marquer comme "cancelled" (au lieu de supprimer)
    order.status = "cancelled" #ty kay
    db.session.commit()

    return jsonify({"message": "Commande annulée avec succès"}), 200


#pour afficher order service en frontend
# === OBTENIR UNE COMMANDE PAR ID (pour Confirmation) ===
@order_bp.route('/order/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify(order.to_dict()), 200


# === TOUTES LES COMMANDES (admin) ===
@order_bp.route('', methods=['GET'])
@order_bp.route('/', methods=['GET'])
def get_all_orders():
    orders = Order.query.all()
    return jsonify([o.to_dict() for o in orders]), 200

'''
@order_bp.route('/order/<int:order_id>', methods=['GET'])
def get_order(order_id): ...


#taloha
@order_bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify(order.to_dict()), 200


@order_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_orders(user_id): ...

#taloha
@order_bp.route('/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([o.to_dict() for o in orders])

'''

#remettre statut en pending
@order_bp.route('/<int:order_id>/reactivate', methods=['POST'])
#@jwt_required()#commenter-na hi tester-na zvt
@jwt_required(optional=True)  # PERMET TEST SANS JWT
def reactivate_order(order_id):
    #current_user_id = get_jwt_identity()
    current_user_id = 1  # SIMULE user_id = 1
    order = Order.query.get_or_404(order_id)

    # Vérifie que la commande appartient à l'utilisateur connecté
    if order.user_id != current_user_id:
        return jsonify({"error": "Accès refusé : cette commande ne vous appartient pas"}), 403

    # Seules les commandes "cancelled" peuvent être réactivées
    if order.status != 'cancelled':
        return jsonify({"error": "Seules les commandes annulées peuvent être réactivées"}), 400

    # Met à jour le statut en "pending"
    order.status = "pending"
    db.session.commit()

    return jsonify({"message": "Commande réactivée avec succès"}), 200


#pour order_items pour Admin
# === TOUTES LES LIGNES DE COMMANDES (order_items) ===
@order_bp.route('/items', methods=['GET'])
def get_all_order_items():
    items = OrderItem.query.all()
    return jsonify([{
        "id": item.id,
        "order_id": item.order_id,
        "formation_id": item.formation_id,
        "formation_name": item.formation_name,
        "price": item.price
    } for item in items]), 200
#ay vee, important be kay zany le order_routes.py
#hi normale agn koa izy