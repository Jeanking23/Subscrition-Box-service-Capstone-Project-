from flask import Flask
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
from sqlalchemy import Column, Integer, String, Boolean, JSON, DECIMAL, TIMESTAMP, func, ForeignKey
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from datetime import datetime


app = Flask(__name__)

db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = 'admin_login'
login_manager.init_app(app)
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    email = db.Column(db.String(100), unique=True)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(100))
    address = db.Column(db.String(100), nullable=True)
    phone_number = db.Column(db.String(100), nullable=True)
    role=db.Column(db.String(100), nullable=True)

    # Define the one-to-many relationship between User and Subscription
    subscriptions = relationship('Subscription', backref='user_ref', lazy=True)


    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def __init__(self, username,password, role='user'):
         self.role = role

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
    __tablename__ = 'subscriptions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, db.ForeignKey('users.id'), nullable=False)
    subscription_tier = Column(String(255), nullable=False)
    subscription_type = Column(String(255), nullable=False)
    active = Column(Boolean, nullable=False, default=True)
    price_per_box = Column(Integer, nullable=False, default=100)
    demographic = Column(JSON)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.current_timestamp())

    # relationship to the User model 
    user = relationship("User", backref='user_subscriptions')


class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)


class Subscription_item(db.Model):
    __tablename__ = 'subscription_items'

    id = db.Column(db.Integer, primary_key=True)
    subscription_id = db.Column(db.Integer, db.ForeignKey('subscriptions.id')) 
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    items = db.Column(db.String(255))
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    subscription = db.relationship('Subscription', backref='subscription_items', primaryjoin='Subscription.id == Subscription_item.subscription_id')
    item = db.relationship('Item', backref='subscription_item')


class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.Date)
    amount = db.Column(db.Integer)
    payment_type_id = db.Column(db.Integer)
    status = db.Column(db.String(20))

class Survey(db.Model):
    __tablename__ = 'survey'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    question = db.Column(db.String(255))
    answer = db.Column(db.String(255))
    rating = db.Column(db.Integer)  

    # Define a relationship to the User model
    user = db.relationship("User", backref="surveys")

    def __init__(self, user_id, question, answer, rating):
        self.user_id = user_id
        self.question = question
        self.answer = answer
        self.rating = rating

