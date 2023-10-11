from datetime import datetime
import random
from flask import app
from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Subscription, Subscription_item, Payment, Survey, Item, db,Admin

ma = Marshmallow()

# Auth schemas


class RegisterSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    email = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    address = fields.String(required=True)
    phone_number = fields.String(required=True)

    class Meta:
        fields = ("id", "username",  "password",
                  "first_name", "last_name", "email", "address", "phone_number")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)

class AdminSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    email = fields.Email(required=True)

    class Meta:
        model = Admin
        fields = ('id', 'first_name', 'last_name', 'username', 'password', 'email')

    @post_load
    def create_admin(self, data, **kwargs):
        return Admin(**data)


admin_schema = AdminSchema()
admins_schema = AdminSchema(many=True)

class UserSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    address = fields.String(required=True)
    phone_number = fields.String(required=True)
    role = fields.String(required=True)

    class Meta:
        model = User

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)


register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)


class SubscriptionSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    user_id = fields.Integer(required=True)
    subscription_tier = fields.String(required=True)
    subscription_type = fields.String(required=True)
    active = fields.Boolean(default=True)
    price_per_box = fields.Integer(places=2, required=True)
    demographic = fields.Dict()

    class Meta:
        model = Subscription
        fields = ('id', 'user_id', 'subscription_tier',
                  'subscription_type', 'active', 'price_per_box', 'demographic')

    @post_load
    def create_subscription(self, data, **kwargs):
        return Subscription(**data)


subscription_schema = SubscriptionSchema()
subscriptions_schema = SubscriptionSchema(many=True)


class PaymentSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    user_id = fields.Integer(required=True)
    amount = fields.Date(required=True)
    date = fields.DateTime(
        dump_only=True, default=datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ'))
    payment_type_id = fields.Integer()
    status = fields.String()

    class Meta:
        model = Payment

    @post_load
    def create_payment(self, data, **kwargs):
        return Payment(**data)


payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)


class Subscription_itemSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    subscription_id = fields.Integer(required=True)
    item_id = fields.Integer(required=True)
    items = fields.String(required=True)
    quantity = fields.String(required=True)
    created_at = fields.DateTime(
        dump_only=True, default=datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ'))

    class Meta:
        model = Subscription_item
        fields = ('id', 'subscription', 'item_id',
                  'items', 'quantity', 'create_at')

    @post_load
    def create_subscription_item(self, data, **kwargs):
        return Subscription_item(**data)


subscription_item_schema = Subscription_itemSchema()
subscription_items_schema = Subscription_itemSchema(many=True)


class ItemSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    name = fields.String()
    description = fields.String()
    price = fields.Integer()

    class Meta:
        model = Item

    @post_load
    def create_item(self, data, **kwargs):
        return Item(**data)


item_schema = ItemSchema()


class SurveySchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    user_id = fields.Integer(required=True)
    question = fields.String(required=True)
    answer = fields.String(required=True)
    rating = fields.Integer(required=True)

    class Meta:
        model = Survey

    @post_load
    def create_survey(self, data, **kwargs):
        return Survey(**data)


survey_schema = SurveySchema()
surveys_schema = SurveySchema(many=True)


def create_subscription_item():
    categories = ['games', 'makeup', 'clothes', 'electronics']
    quantity = ['basic', 'premium']

    new_item = Subscription_item(
        subscription_id=3,
        item_id=4,
        items=random.choice(categories),
        quantity=random.choice(quantity),
        created_at=datetime.utcnow()
    )

    db.session.add(new_item)
    db.session.commit()
