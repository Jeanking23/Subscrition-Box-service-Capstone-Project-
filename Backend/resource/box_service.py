from collections import UserDict
from curses import flash
from flask import app, redirect, request, render_template, url_for
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
# database models
from database.models import db, Subscription_item, Users, Admin
# database Schema
from database.schemas import subscription_schema, subscription_item_schema, Subscription_itemSchema, user_schema, payment_schema
from flask_login import current_user, login_required

db.create_all
class SubscriptionListResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()
        new_subscription = subscription_schema.load(data)
        new_subscription.user_id = user_id
        db.session.add(new_subscription)
        db.session.commit()
        return subscription_schema.dump(new_subscription), 201


class SubscriptionItemResource(Resource):
    @jwt_required()
    def get(self):
        subscription_id = get_jwt_identity()
        item_id = request.args.get('item_id')

        items = db.session.query(
            Subscription_item.id,
            Subscription_item.subscription_id,
            Subscription_item.item_id,
            Subscription_item.items,
            Subscription_item.quantity,
            Subscription_item.create_at

        ).filter_by(
            subscription_id=subscription_id,
            item_id=item_id
        ).all()

        if not items:
            return {"message": "Subscription not found"}, 404

        item_list = []
        for item in items:
            item_dict = {
                "id": item.id,
                "subscription_id": item.subscription_id,
                "item_id": item.item_id,
                "items": ",".join(item.items),  # convert list to string
                "quantity": item.quantity,
                "created_at": item.created_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
            } 
            item_list.append(item_dict)
        return item_list, 200

class AdminResource(Resource):
    @jwt_required()
    def get(self):
        users = Users.query.all()
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
    users = Users.query.all()
    # You can pass the transactions and users to the template and display them

    return render_template('admin_dashboard.html', transactions=transactions, users=users)