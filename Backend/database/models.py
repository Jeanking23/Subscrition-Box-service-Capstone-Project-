from flask import Flask
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from datetime import datetime


app = Flask(__name__)

db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = 'admin_login'
login_manager.init_app(app)
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

class Admin(UserMixin, db.Model):
    __tablename__ ='Admin'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)

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
    subscription_type = db.Column(db.String(20))
    active = db.Column(db.Boolean, default=True)
    price_per_box = db.Column(db.Integer, default=100)
    demographic = db.Column(db.String(100))

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.Date)
    amount = db.Column(db.Integer)
    payment_type_id = db.Column(db.Integer)
    status = db.Column(db.String(20))


class Subscription_item(db.Model):
    __tablename__ = 'subscription_item'

    id = db.Column(db.Integer, primary_key=True)
    subscription_id = db.Column(db.Integer, db.ForeignKey('subscription.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'))
    items = db.Column(db.String(255))
    quantity = db.Column(db.String(20))
    create_at = db.Column(db.DateTime, default=datetime.utcnow)

    subscription = relationship('Subscription', backref='subscription_item')
    item = relationship('Item', backref='subscription_item')

class Item(db.Model):
    __tablename__ = 'item'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)

class Survey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    question = db.Column(db.String(255))
    answer = db.Column(db.String(255))
    rating = db.Column(db.Integer)
