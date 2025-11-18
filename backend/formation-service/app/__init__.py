from flask import Flask # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_cors import CORS  # type: ignore # Ajoutez cette ligne


db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('../config.py')

    # Initialiser CORS
    CORS(app)  # Ajoutez cette ligne pour permettre les requêtes CORS; eh ty nampety an'azy; t@ affichage de base de données vers interface react ty zao

    db.init_app(app)

    from .routes.formation_routes import bp
    app.register_blueprint(bp)

    with app.app_context():
        db.create_all()  # Crée les tables si elles n'existent pas
    return app