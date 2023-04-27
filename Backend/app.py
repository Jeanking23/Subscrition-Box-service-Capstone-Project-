from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_migrate import Migrate
from database.models import db
from database.schemas import ma
from dotenv import load_dotenv
from os import environ

#Add the environment variables
load_dotenv()

# create instance of additional libraries
bcrypt = Bcrypt()
jwt = JWTManager()
cors = CORS()
migrate = Migrate()

# create instance of flask application

def create_app():
    app = Flask(__name__)
    
# config properties from .env file
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = environ.get('JWT_ACCESS_TOKEN_EXPIRES')
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = environ.get('JWT_REFRESH_TOKEN_EXPIRES')
    
#route with API
    api = create_routes()
    
# Flask app with additional libraries created
    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    api.init_app(app)
    migrate.init_app(app, db)

    return app

#Flask routes
