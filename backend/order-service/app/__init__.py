# order-service/app/__init__.py

from flask import Flask # type: ignore
from flask_cors import CORS # type: ignore
from flask_sqlalchemy import SQLAlchemy   # type: ignore # ✅ ajouter si pas déjà ajouté
#from flask_jwt_extended import JWTManager # type: ignore
from flask_jwt_extended import JWTManager # type: ignore  ty
#from .config import Config # type: ignore  ty


db = SQLAlchemy()   # ✅ Déclaration ici
# ❌ PAS d'import de models ou routes ici
jwt = JWTManager()  # ⬅️ instancier ici mais pas encore lié à app  ty




#jwt = JWTManager(app)
def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    #app.config['JWT_SECRET_KEY'] = '6r2kW2zSQk2agOgthyDA5o6FC_NAB0J3pSJs6gTG6os' tsy ilaina ty
    #app.config.from_object(Config) #ty

    CORS(app, resources={r"/api/*": {"origins": "*"}}) #averiko eo avao
    #CORS(app, resources={r"/api/*": {"origins": "http://localhost:3001"}}, supports_credentials=True)
    

    db.init_app(app)
    jwt.init_app(app)  # ⬅️ activer JWT ici  ty

    # ✅ importer les models et routes APRÈS init_app()
    from app.models.order import Order, OrderItem
    from app.routes.order_routes import order_bp

    with app.app_context():
        db.create_all()

    app.register_blueprint(order_bp, url_prefix='/api/orders', strict_slashes=False)
    #app.register_blueprint(order_bp, url_prefix='/api/order_items', strict_slashes=False)#tsy haiko

    @app.route('/')
    def home():
        return {"message": "Order Service is running!"}, 200

    return app
