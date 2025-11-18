 # order-service/app/__init__.py
from flask import Flask # type: ignore
from flask_cors import CORS # type: ignore
from app.models.order import db
from app.routes.order_routes import order_bp


# from flask_cors import CORS # type: ignore
# from .models.order import db
# from .routes.order_routes import order_bp



def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # CORS : autorise React (localhost:3000)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialiser SQLAlchemy
    db.init_app(app)

    # Créer les tables
    with app.app_context():
        db.create_all()

    # Enregistrer le blueprint
    app.register_blueprint(order_bp, url_prefix='/api/orders', strict_slashes=False)

    # Route de test
    @app.route('/')
    def home():
        return {"message": "Order Service is running!"}, 200

    return app 

