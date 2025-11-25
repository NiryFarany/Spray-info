# backend/payment-service/run.py
from app import create_app, db

app = create_app()

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(port=5000, debug=True, host='0.0.0.0')
    #app.run(port=5004, debug=True, host='0.0.0.0')#localhost