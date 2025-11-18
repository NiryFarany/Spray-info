# backend/payment-service/app/routes/payment_routes.py
from flask import Blueprint, request, jsonify # type: ignore
from app import db
from app.models.payment import Payment
import requests
import uuid
import time

payment_bp = Blueprint('payment_bp', __name__)

ORDER_SERVICE_URL = 'http://localhost:5003/api/orders'

# Simule appel Mvola
def simulate_mvola_payment(phone, amount):
    time.sleep(2)  # Simulation délai
    return {
        "success": True,
        "transaction_id": f"MV{uuid.uuid4().hex[:10].upper()}",
        "message": "Paiement reçu"
    }

@payment_bp.route('/pay/<int:order_id>', methods=['POST'])
def initiate_payment(order_id):
    data = request.get_json()
    phone = data.get('phone')
    if not phone:
        return jsonify({"error": "Numéro de téléphone requis"}), 400

    # Vérifie commande
    try:
        resp = requests.get(f"{ORDER_SERVICE_URL}/order/{order_id}")
        if resp.status_code != 200:
            return jsonify({"error": "Commande introuvable"}), 404
        order = resp.json()
    except:
        return jsonify({"error": "Service commande indisponible"}), 500

    if order['status'] != 'pending':
        return jsonify({"error": "Commande non payable"}), 400

    # Crée paiement
    payment = Payment(
        order_id=order_id,
        amount=order['total_amount'],
        phone=phone
    )
    db.session.add(payment)
    db.session.commit()

    # Simule Mvola
    result = simulate_mvola_payment(phone, order['total_amount'])

    if result['success']:
        payment.status = 'success'
        payment.transaction_id = result['transaction_id']
        db.session.commit()

        # Met à jour commande
        requests.post(f"{ORDER_SERVICE_URL}/{order_id}/pay")

        return jsonify({
            "message": "Paiement réussi !",
            "payment": payment.to_dict()
        }), 200
    else:
        payment.status = 'failed'
        db.session.commit()
        return jsonify({"error": "Paiement échoué"}), 400
    

#voir table payment
# backend/payment-service/app/routes/payment_routes.py

@payment_bp.route('/payments', methods=['GET'])
def get_all_payments():
    payments = Payment.query.all()
    return jsonify([p.to_dict() for p in payments])
#fa izy ty kay

