#original @ formation mandeha tsara ty tsisy probleme
from flask import Blueprint, jsonify, request # type: ignore
from app.models.formation import Formation
from app import db
from flask_cors import CORS  # type: ignore # Ajoutez cette ligne


bp = Blueprint('formation', __name__, url_prefix='/api/formations')
#Blueprint
CORS(bp, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # type: ignore # Autorise localhost:3000


@bp.route('/', methods=['GET'])
def get_formations():
    formations = Formation.query.all()
    return jsonify([{'id': f.id, 'name': f.name, 'description': f.description, 'price': f.price, 'location': f.location, 'dates': f.dates} for f in formations])


@bp.route('/<int:id>', methods=['GET'])
def get_formation(id):
    formation = Formation.query.get_or_404(id)
    return jsonify({'id': formation.id, 'name': formation.name, 'description': formation.description, 'price': formation.price, 'location': formation.location, 'dates': formation.dates})


# @bp.route('/<int:id>', methods=['GET'])
# def get_formation(id):
#     formation = Formation.query.get_or_404(id)
#     return jsonify(formation.to_dict())


@bp.route('/', methods=['POST'])#pour ajout de formation, pour Admin ty bien sur
def add_formation():
    data = request.json
    new_formation = Formation(name=data['name'], description=data['description'], price=data['price'], location=data['location'], dates=data['dates'])
    db.session.add(new_formation)
    db.session.commit()
    return jsonify({'id': new_formation.id, 'name': new_formation.name}), 201

'''
Le code que vous avez partagé utilise un Blueprint dans Flask, qui est une façon de structurer votre application en regroupant des routes et des fonctionnalités similaires. Voici une explication de chaque partie :
Qu'est-ce qu'un Blueprint ?

Un Blueprint permet de créer des composants d'application réutilisables et modulaires. Cela est particulièrement utile pour les applications Flask plus grandes, car cela permet de gérer les routes, les modèles et les vues de manière plus organisée.
'''

@bp.route('/<int:id>', methods=['PUT'])
def update_formation(id):
    formation = Formation.query.get_or_404(id)
    data = request.json
    formation.name = data.get('name', formation.name)
    formation.description = data.get('description', formation.description)
    formation.price = data.get('price', formation.price)
    formation.location = data.get('location', formation.location)
    formation.dates = data.get('dates', formation.dates)
    db.session.commit()
    return jsonify({'id': formation.id, 'name': formation.name}), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete_formation(id):
    formation = Formation.query.get_or_404(id)
    db.session.delete(formation)
    db.session.commit()
    return jsonify({'message': 'Formation supprimée avec succès'}), 200