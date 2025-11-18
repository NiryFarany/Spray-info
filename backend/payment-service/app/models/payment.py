# backend/payment-service/app/models/payment.py
from app import db
from datetime import datetime

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, nullable=False, unique=True)
    amount = db.Column(db.Float, nullable=False)
    method = db.Column(db.String(20), default='mvola')  # mvola, orange_money
    phone = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, success, failed
    transaction_id = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'amount': self.amount,
            'method': self.method,
            'phone': self.phone,
            'status': self.status,
            'transaction_id': self.transaction_id,
            'created_at': self.created_at.isoformat()
        }