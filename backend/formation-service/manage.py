""" import os
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from app import create_app, db

app = create_app()
migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run() """

#à ignoré d'abord
""" from flask import Flask # type: ignore
from app import app, db  # Remplacez `your_app` par le nom de votre module
from flask_migrate import Migrate # type: ignore

# Initialisation de Flask-Migrate
migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run() """