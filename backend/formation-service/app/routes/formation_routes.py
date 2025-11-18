# formation-service/app/routes/formation_routes.py
from flask import Blueprint, jsonify, request # type: ignore
from app.models.formation import Formation
from app import db
from flask_cors import CORS  # type: ignore # Ajoutez cette ligne


bp = Blueprint('formation', __name__, url_prefix='/api/formations')
CORS(bp, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# === LISTE TOUTES LES FORMATIONS ===
@bp.route('/', methods=['GET'])
def get_formations():
    formations = Formation.query.all()
    return jsonify([f.to_dict() for f in formations])

# === UNE FORMATION PAR ID ===
@bp.route('/<int:id>', methods=['GET'])
def get_formation(id):
    formation = Formation.query.get_or_404(id)
    return jsonify(formation.to_dict())  # ← Utilise to_dict()

# === AJOUTER (ADMIN) ===
@bp.route('/', methods=['POST'])
def add_formation():
    data = request.get_json()
    if not all(k in data for k in ['name', 'description', 'price']):
        return jsonify({'error': 'Données manquantes'}), 400

    new_formation = Formation(
        name=data['name'],
        description=data['description'],
        price=data['price'],
        location=data.get('location'),
        dates=data.get('dates')
    )
    db.session.add(new_formation)
    db.session.commit()
    return jsonify(new_formation.to_dict()), 201

# === MODIFIER (ADMIN) ===
@bp.route('/<int:id>', methods=['PUT'])
def update_formation(id):
    formation = Formation.query.get_or_404(id)
    data = request.get_json()

    formation.name = data.get('name', formation.name)
    formation.description = data.get('description', formation.description)
    formation.price = data.get('price', formation.price)
    formation.location = data.get('location', formation.location)
    formation.dates = data.get('dates', formation.dates)

    db.session.commit()
    return jsonify(formation.to_dict()), 200

# === SUPPRIMER (ADMIN) ===
@bp.route('/<int:id>', methods=['DELETE'])
def delete_formation(id):
    formation = Formation.query.get_or_404(id)
    db.session.delete(formation)
    db.session.commit()
    return jsonify({'message': 'Formation supprimée avec succès'}), 200
#le misy suppression no tsy azoko nefa code mandeha
#hee code supprimer kay ty fa tsy hoe misy code supprimer-na
#kay, amelioration koa ty zany