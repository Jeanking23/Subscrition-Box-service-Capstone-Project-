from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    email = db.Column(db.String(100), unique=True)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(100))
    address = db.Column(db.String(100), nullable=True)
    phone_number = db.Column(db.String(100), nullable=True)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    subscription_tier = db.Column(db.Integer)
    active = db.Column(db.Boolean, default=True)
    price_per_box = db.Column(db.Integer, default=100)
    demographic = db.Column(db.String(100))

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.Date)
    amount = db.Column(db.Integer)
    payment_type_id = db.Column(db.Integer)
    status = db.Column(db.String(20))

class SubscriptionItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subscription_id = db.Column(db.Integer, db.ForeignKey('subscription.id'))
    item_id = db.Column(db.Integer)
    item = db.Column(db.String(45))
    quantity = db.Column(db.String(20))
    created_at = db.Column(db.DateTime)

class Survey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    question = db.Column(db.String(255))
    answer = db.Column(db.String(255))
    rating = db.Column(db.Integer)
