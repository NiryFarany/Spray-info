# order-service/app/routes/order_routes.py
from flask import Blueprint, request, jsonify # type: ignore
from app.models.order import Order, OrderItem, db
import requests
#from app import db#nataoko ty

order_bp = Blueprint('order_bp', __name__, url_prefix='/api/orders')

# Désactiver la redirection automatique avec slash
order_bp.url_defaults({'path': ''})

# URL du formation-service
FORMATION_SERVICE_URL = 'http://localhost:5002/api/formations'

def get_formation_details(formation_id):
    try:
        resp = requests.get(f"{FORMATION_SERVICE_URL}/{formation_id}")
        if resp.status_code == 200:
            return resp.json()
    except Exception as e:
        print(f"Erreur formation-service: {e}")
    return None


# === CRÉER UNE COMMANDE ===
@order_bp.route('', methods=['POST'])
@order_bp.route('/', methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    items = data.get('items', [])

    if not user_id or not items:
        return jsonify({'error': 'user_id et items requis'}), 400

    total = 0.0
    order_items = []

    for item in items:
        formation_id = item.get('formation_id')
        formation = get_formation_details(formation_id)
        if not formation:
            return jsonify({'error': f'Formation ID {formation_id} introuvable'}), 404

        price = float(formation['price'])
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


# === LISTER TOUTES LES COMMANDES (admin ou debug) ===
@order_bp.route('', methods=['GET'])
@order_bp.route('/', methods=['GET'])
def get_all_orders():
    orders = Order.query.all()
    return jsonify([o.to_dict() for o in orders])


# === COMMANDES D'UN UTILISATEUR ===
@order_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([o.to_dict() for o in orders])


# === MARQUER COMME PAYÉE ===
@order_bp.route('/<int:order_id>/pay', methods=['POST'])
def mark_as_paid(order_id):
    order = Order.query.get_or_404(order_id)
    if order.status == 'paid':
        return jsonify({'message': 'Déjà payée'}), 200

    order.status = 'paid'
    db.session.commit()
    return jsonify(order.to_dict()), 200



# === ANNULER UNE COMMANDE (seulement si pending) ===
@order_bp.route('/<int:order_id>', methods=['DELETE'])
def cancel_order(order_id):
    order = Order.query.get_or_404(order_id)

    if order.status != 'pending':
        return jsonify({"error": "Seules les commandes en attente peuvent être annulées"}), 400

    # Supprime les items en cascade (grâce à cascade="all, delete-orphan")
    db.session.delete(order)
    db.session.commit()

    return jsonify({"message": "Commande annulée avec succès"}), 200
#nagnova tsy nety