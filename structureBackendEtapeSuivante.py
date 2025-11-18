'''
Super, c'est un excellent début d'avoir déjà créé tous les dossiers et fichiers avec la structure mise à jour ! Maintenant, passons à l'étape suivante pour rendre ces microservices fonctionnels. Voici ce que vous pouvez faire d'abord, étape par étape, en commençant par le microservice `formation-service` comme exemple (vous pourrez ensuite appliquer la même logique aux autres).

### Étape 1 : Installer les dépendances
Assurez-vous que chaque microservice a les dépendances nécessaires installées. Allez dans chaque dossier de microservice (ex. `backend/formation-service/`) et exécutez :
```bash
pip install flask flask-sqlalchemy flask-migrate mysql-connector-python
```
Cela installera Flask (pour le serveur), SQLAlchemy (pour la gestion de la base de données), Flask-Migrate (pour les migrations), et le connecteur MySQL.

### Étape 2 : Configurer `config.py`
Ouvrez le fichier `config.py` dans chaque microservice et définissez la connexion à la base de données spécifique. Par exemple, pour `formation-service/config.py` :
```python
SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://username:password@localhost/formation_db"
SQLALCHEMY_TRACK_MODIFICATIONS = False
```
- Remplacez `username` et `password` par vos identifiants MySQL.
- Créez la base de données `formation_db` dans MySQL si elle n'existe pas encore (`CREATE DATABASE formation_db;`) et faites de même pour `user_db`, `order_db`, et `payment_db` dans les autres microservices.

### Étape 3 : Initialiser l'application dans `__init__.py`
Ouvrez `backend/formation-service/app/__init__.py` et configurez l'application Flask. Voici un exemple :
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('../config.py')
    db.init_app(app)

    from .routes.formation_routes import bp
    app.register_blueprint(bp)

    with app.app_context():
        db.create_all()  # Crée les tables si elles n'existent pas
    return app
```

### Étape 4 : Définir les modèles dans `models/formation.py`
Ouvrez `backend/formation-service/app/models/formation.py` et définissez le modèle pour les formations :
```python
from app import db

class Formation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100))
    dates = db.Column(db.String(100))
```

### Étape 5 : Implémenter les routes dans `routes/formation_routes.py`
Ouvrez `backend/formation-service/app/routes/formation_routes.py` et ajoutez des endpoints de base :
```python
from flask import Blueprint, jsonify
from app.models.formation import Formation
from app import db

bp = Blueprint('formation', __name__, url_prefix='/api/formations')

@bp.route('/', methods=['GET'])
def get_formations():
    formations = Formation.query.all()
    return jsonify([{'id': f.id, 'name': f.name, 'description': f.description, 'price': f.price, 'location': f.location, 'dates': f.dates} for f in formations])

@bp.route('/<int:id>', methods=['GET'])
def get_formation(id):
    formation = Formation.query.get_or_404(id)
    return jsonify({'id': formation.id, 'name': formation.name, 'description': formation.description, 'price': formation.price, 'location': formation.location, 'dates': formation.dates})
```

### Étape 6 : Lancer l'application avec `run.py`
Ouvrez `backend/formation-service/run.py` et ajoutez :
```python
from app import create_app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5002, host='0.0.0.0')
```
- Le port `5002` est choisi pour `formation-service`. Utilisez des ports différents pour les autres (ex. `5001` pour `user-service`, `5003` pour `order-service`, `5004` pour `payment-service`).

### Étape 7 : Tester le microservice
- Allez dans le dossier `backend/formation-service/` et lancez le serveur :
  ```bash
  python run.py
  ```
- Ouvrez un navigateur ou utilisez un outil comme Postman pour tester l'endpoint `http://localhost:5002/api/formations`. Pour l'instant, il renverra une liste vide tant que vous n'aurez pas ajouté de données.

### Étape 8 : Ajouter des migrations (optionnel mais recommandé)
Pour gérer les changements dans les modèles :
- Installez Flask-Migrate si ce n'est pas encore fait.
- Dans `backend/formation-service/`, exécutez :
  ```bash
  flask db init
  flask db migrate -m "Initial migration"
  flask db upgrade
  ```
- Assurez-vous d'avoir un fichier `manage.py` ou de configurer les commandes via `FLASK_APP=run.py`.

### Que faire ensuite ?
- **Répétez pour les autres microservices** : Appliquez les mêmes étapes pour `user-service`, `order-service`, et `payment-service`, en adaptant les modèles et routes selon leurs responsabilités.
- **Ajouter des données** : Insérez des formations dans `formation_db` via une route POST ou directement dans MySQL.
- **Connecter au frontend** : Mettez à jour `formationService.js` pour appeler `http://localhost:5002/api/formations`.

Commencez par tester `formation-service` comme décrit. Si vous rencontrez des erreurs ou avez besoin d'aide pour une étape spécifique, dites-le-moi ! Voulez-vous avancer avec un autre microservice ensuite ?
'''