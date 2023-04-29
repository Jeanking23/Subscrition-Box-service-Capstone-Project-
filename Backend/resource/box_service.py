from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from database.schemas import SubscriptionItemSchema
from database.models import db, Subscription
from database.schemas import subscription_schema, subscription_item_schema

class SubscriptionList(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()
        new_subscription = subscription_schema.load(data)
        new_subscription.user_id = user_id
        db.session.add(new_subscription)
        db.session.commit()
        return subscription_schema.dump(new_subscription), 201

class SubscriptionItem(Resource):
    @jwt_required
    def get(self):
        subscription_id = get_jwt_identity()
        item_id = request.args.get(item_id)
        item = db.session.query( SubscriptionItemSchema).filter_by(subscription_id=subscription_id, item_id= item_id).first()
        if not item:
            return {"message": "Subscription not found"}, 404
        return subscription_item_schema.dump(item), 200  
    