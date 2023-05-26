from flask import request
from flask_jwt_extended import create_access_token
from flask_restful import Resource
from database.models import db, Users
from database.schemas import register_schema, user_schema
from marshmallow import ValidationError
import datetime

class RegisterResource(Resource):
    def post(self):
        # get data from request
        data = request.get_json()
        try:
            new_user = register_schema.load(data)
            new_user.hash_password()
            db.session.add(new_user)
            db.session.commit()
            return user_schema.dump(new_user), 201
        except ValidationError as err:
            return err.messages, 400

class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        user = db.one_or_404(Users.query.filter_by(username=data.get('username')))
        authorized = user.check_password(data.get('password'))
        if not authorized:
            return {'message': 'Invalid username or password'}, 401
        expires = datetime.timedelta(days=7)
        print(user.id)
        additional_claims = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name
        }
        access_token = create_access_token(identity=str(user.id), expires_delta=expires, additional_claims=additional_claims)
        return {'access_token': access_token}, 200