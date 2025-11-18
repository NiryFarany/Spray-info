# backend/user-service/app/__init__.py
from flask import Flask # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_cors import CORS # type: ignore
from flask_jwt_extended import JWTManager # type: ignore

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    from .routes.user_routes import user_bp
    #app.register_blueprint(user_bp)#nandeha t@ty, frontend marche avec ça
    #app.register_blueprint(user_bp, url_prefix='/api')  # AJOUTE ÇA !
    app.register_blueprint(user_bp)#averiko @place-ny

    return app