# order-service/app/routes/order_routes.py
#juste ameliortion pendant code
from flask import Blueprint, request, jsonify # type: ignore
#from . import db
from app.models.order import db
#from .models.order import Order, OrderItem # type: ignore
from app.models.order import Order, OrderItem
import requests

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

@order_bp.route('/', methods=['POST'])
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


@order_bp.route('/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([o.to_dict() for o in orders])


@order_bp.route('/<int:order_id>/pay', methods=['POST'])
def mark_as_paid(order_id):
    order = Order.query.get_or_404(order_id)
    order.status = 'paid'
    db.session.commit()
    return jsonify(order.to_dict())