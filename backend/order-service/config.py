# SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://SprayInfo:tsyHaiko#123@localhost/order_db"
# SQLALCHEMY_TRACK_MODIFICATIONS = False
# order-service/config.py
import os
from dotenv import load_dotenv # type: ignore

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'ORDER_DB_URI', 
        # 'mysql+pymysql://root:password@localhost:3306/order_db'
        #'mysql+pymysql://SprayInfo:tsyHaiko#123@localhost:3306/order_db'#t@localhost
        #'mysql+pymysql://SprayInfo:tsyHaiko#123@order_db:3306/order_db'#pour config root @ docker 
        'mysql+pymysql://root:root@order_db:3306/order_db'#pour config root
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'order-secret-key')
    # ✅ clé utilisée pour vérifier les tokens JWT envoyés par le auth-service
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")  
    #alaiko ty averina @ place-ny  tena ty le erreur teo

    # ✅ obligatoire avec flask_jwt_extended
    JWT_TOKEN_LOCATION = ["headers"]  # token envoyé dans les headers HTTP
    JWT_HEADER_NAME = "Authorization"  # nom du header
    JWT_HEADER_TYPE = "Bearer"  # le frontend doit envoyer: Authorization: Bearer <token>


