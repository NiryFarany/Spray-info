# order-service/app/__init__.py

from flask import Flask # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_cors import CORS # type: ignore

db = SQLAlchemy()   # ✅ Déclarer db ici (NE PAS importer les models maintenant)


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)

    # ⚠️ importer les routes ET les modèles APRÈS db.init_app()
    from app.routes.order_routes import order_bp

    # Créer tables
    with app.app_context():
        from app.models.order import Order, OrderItem   # ✅ Import ICI
        db.create_all()

    app.register_blueprint(order_bp)

    @app.route('/')
    def home():
        return {"message": "Order Service is running!"}, 200

    return app
