# This file contains the authentication resources for the API
from flask import request
from flask_jwt_extended import create_access_token, jwt_required
from flask import app, redirect, request, render_template, url_for
from flask_login import current_user, login_required
from flask_restful import Resource
from marshmallow import ValidationError
from curses import flash
import logging
import datetime
# database models
from database.models import db, User, Admin

# database Schema
from database.schemas import register_schema, user_schema, payment_schema, admin_schema
from flask_login import login_user
from flask import jsonify


class RegisterResource(Resource):
    def post(self):
        data = request.get_json()

        role = data.get('role')
        print("Received role: ", role, "Data: ", data)

        if role == 'admin':
            if not data.get('username').lower().startswith('admin'):
                return {'message': 'Admin username must start with "admin"'}, 400

            try:
                new_admin = admin_schema.load(data)
                # Make sure Admin model has this method
                new_admin.hash_password("password")
                db.session.add(new_admin)
                db.session.commit()
                return admin_schema.dump(new_admin), 201
            except ValidationError as err:
                return {'message': 'Failed to register admin', 'errors': err.messages}, 400

        elif role == 'user':
            try:
                new_user = register_schema.load(data)
                # Make sure User model has this method
                new_user.hash_password("password")
                db.session.add(new_user)
                db.session.commit()
                return user_schema.dump(new_user), 201
            except ValidationError as err:
                logging.exception(
                    "An error occurred during user registration:")
                return {'message': 'Failed to register user', 'errors': err.messages}, 400
        else:
            return {'message': 'Invalid role'}, 400


class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        print(data)
        user = db.one_or_404(User.query.filter_by(username=data.get('username')),
                             description=f"No user with that username"
                             )
        authorized = user.check_password(data.get('password'))
        if not authorized:
            return {'message': 'Invalid username or password'}, 401
        print(data)

        expires = datetime.timedelta(days=7)
        print(user.id)
        additional_claims = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name
        }
        access_token = create_access_token(identity=str(
            user.id), expires_delta=expires, additional_claims=additional_claims)
        return {'access_token': access_token}, 200


class AdminResource(Resource):
    @jwt_required()
    def get(self):
        users = User.query.all()
        result = user_schema.dump(users, many=True)
        return result, 200


def admin_login():
    if current_user.is_authenticated:
        # Admin is already logged in
        return redirect(url_for('admin_dashboard'))

    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        admin = Admin.query.filter_by(username=username).first()
        if admin and admin.check_password(password):
            user_schema(admin)
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid username or password', 'danger')

    return render_template('admin_login.html')


def admin_dashboard():
    transactions = payment_schema.query.all()
    users = User.query.all()
    # You can pass the transactions and users to the template and display them

    return render_template('admin_dashboard.html', transactions=transactions, users=users)
