#SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://username:password@localhost/formation_db"
#SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://SprayInfo:tsyHaiko#123@localhost/formation_db" #localhost
#SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://SprayInfo:tsyHaiko#123@formation_db/formation_db" #pour config root pour l'instant pour docker
SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://root:root@formation_db/formation_db" #pour config root 
SQLALCHEMY_TRACK_MODIFICATIONS = False
