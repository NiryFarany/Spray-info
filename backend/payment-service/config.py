# SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://SprayInfo:tsyHaiko#123@localhost/payment_db"
# SQLALCHEMY_TRACK_MODIFICATIONS = False
# backend/payment-service/config.py
import os
from dotenv import load_dotenv # type: ignore

load_dotenv()

class Config:
    #SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://SprayInfo:tsyHaiko#123@localhost:3306/payment_db'
    SQLALCHEMY_DATABASE_URI = os.getenv('PAYMENT_DB_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    #JWT_SECRET_KEY = 'super-secret-key-2025'
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    SECRET_KEY = os.getenv('SECRET_KEY', 'order-secret-key')