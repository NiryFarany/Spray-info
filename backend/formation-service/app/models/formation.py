from app import db

class Formation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)#ty titre ty
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100))#afaka tsy  atao ty fa efa @ spray info ve le toerana, efa vita io,@ sray info
    dates = db.Column(db.String(100))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'location': self.location,
            'dates': self.dates
        }
    