from collections import UserDict
from curses import flash
from flask import app, redirect, request, render_template, url_for
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy
from marshmallow import ValidationError
from sqlalchemy.sql import func
# database models
from database.models import db, Subscription_item, User, Survey
# database Schema
from database.schemas import SurveySchema, subscription_schema, subscription_item_schema, user_schema, survey_schema
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
    


class SurveyResource(Resource):
    @jwt_required()  # Requires authentication for accessing this resource
    def post(self):
        try:
            # Get the current user's identity
            user_id = get_jwt_identity()

            # Get survey data from the request
            data = request.get_json()

            # Create a new survey record
            new_survey = Survey(
                user_id=user_id,
                question=data.get('question'),
                answer=data.get('answer'),
                rating=data.get('rating')
            )

            # Add the survey to the database
            db.session.add(new_survey)
            db.session.commit()

            # Return the newly created survey
            return survey_schema.dump(new_survey), 201
        except ValidationError as err:
            return err.messages, 400

    @jwt_required()
    def get(self):
        try:
            # Get the current user's identity
            user_id = get_jwt_identity()

            # Query surveys for the current user
            user_surveys = Survey.query.filter_by(user_id=user_id).all()

            # Serialize the survey data
            result = SurveySchema.dump(user_surveys, many=True)

            # Return the user's surveys
            return result, 200
        except Exception as e:
            return {'message': 'An error occurred while retrieving surveys.'}, 500
