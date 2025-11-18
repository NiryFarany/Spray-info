'''
Salut ! Super, le **formation-service** est terminé, on passe maintenant aux autres microservices backend avec Flask. On va procéder **service par service**, en respectueurant la **structure modulaire**, les **bases de données indépendantes**, et en préparant une **intégration propre avec le frontend React**.

---

## ÉTAPE ACTUELLE : **ORDER-SERVICE** (on commence par celui-ci)

> L’`order-service` gère le panier, les commandes, et fait le lien entre utilisateur, formations et paiement.

---

### Objectif du `order-service`
- Créer une commande (order)
- Ajouter des formations au panier (order items)
- Calculer le total
- Lier à un utilisateur
- Préparer pour le paiement (status: pending → paid)

---

## 1. Structure du `order-service`

```bash
order-service/
├── app/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── order.py
│   ├── routes/
│   │   ├── __init__.py
│   │   └── order_routes.py
├── config.py
├── run.py
```

---

## 2. `config.py`

```python
# order-service/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'ORDER_DB_URI', 
        'mysql+pymysql://root:password@localhost:3306/order_db'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'order-secret-key')
```

> Crée une base `order_db` dans MySQL.

---

## 3. `app/models/order.py`

```python
# order-service/app/models/order.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)  # Référence externe
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, paid, cancelled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    items = db.relationship('OrderItem', backref='order', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_amount': self.total_amount,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'items': [item.to_dict() for item in self.items]
        }


class OrderItem(db.Model):
    __tablename__ = 'order_items'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    formation_id = db.Column(db.Integer, nullable=False)
    formation_name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'formation_id': self.formation_id,
            'formation_name': self.formation_name,
            'price': self.price
        }
```

---

## 4. `app/__init__.py`

```python
# order-service/app/__init__.py
from flask import Flask
from flask_cors import CORS
from .models.order import db
from .routes.order_routes import order_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    CORS(app)  # Autorise les requêtes depuis React
    db.init_app(app)

    # Créer les tables
    with app.app_context():
        db.create_all()

    app.register_blueprint(order_bp, url_prefix='/api/orders')
    
    return app
```

---

## 5. `app/routes/order_routes.py`

```python
# order-service/app/routes/order_routes.py
from flask import Blueprint, request, jsonify
from . import db
from .models.order import Order, OrderItem
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
```

---

## 6. `run.py`

```python
# order-service/run.py
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(port=5003, debug=True)
```

---

## 7. `.env` (dans `order-service/`)

```env
ORDER_DB_URI=mysql+pymysql://root:password@localhost:3306/order_db
SECRET_KEY=order-secret-key
```

---

## 8. Créer la base de données

```sql
CREATE DATABASE order_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## Lancer le service

```bash
cd order-service
python run.py
```

> Port: `5003`

---

## Test avec `curl`

```bash
curl -X POST http://localhost:5003/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "items": [{"formation_id": 1}, {"formation_id": 2}]
  }'
```

---

## Prochaines étapes (après validation)

1. **payment-service** → Stripe ou Orange Money simulé
2. **user-service** → Authentification JWT
3. **Mettre à jour le frontend React** :
   - `orderService.js`
   - `CartContext.js` → appel réel
   - `Checkout.js` → appel à `/api/orders`

---

## Tu veux qu’on continue avec le **payment-service** maintenant ?

Dis-moi :
- Moyen de paiement préféré ? (Stripe, Orange Money, M-Pesa, MVola, etc.)
- Simulation ou vrai paiement ?

Je te prépare tout de suite.
'''