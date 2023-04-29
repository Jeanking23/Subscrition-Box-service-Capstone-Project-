from datetime import datetime
from flask_marshmallow import Marshmallow
from marshmallow  import post_load, fields
from database.models import Users, Subscription, SubscriptionItem, Payment, Survey

ma = Marshmallow()

# Auth schemas

class RegisterSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "email")

    @post_load
    def create_user(self, data, **kwargs):
        return Users(**data)

class UserSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    address = fields.String(required=True)
    phone_number = fields.String(required=True)

    class Meta:
        model = Users

    @post_load
    def make_user(self, data, **kwargs):
        return Users(**data)
register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)

class SubscriptionSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    user_id = fields.Integer(required=True)
    subscription_tier = fields.DateTime()
    active = fields.Boolean(default=True)
    price_per_box = fields.Integer(default=100)
    demographic = fields.String()

    class Meta:
        model = Subscription
        fields = ('id', 'user_id', 'subscription_tier', 'active', 'price_per_box', 'demographic')

    @post_load
    def create_subscription(self, data, **kwargs):
          return Subscription(**data)

subscription_schema = SubscriptionSchema()
subscriptions_schema = SubscriptionSchema(many=True)

class PaymentSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    user_id = fields.Integer(required=True)
    date = fields.DateTime(dump_only=True, default=datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ'))
    payment_type_id = fields.Integer()
    status = fields.String()

    class Meta:
        model = Payment

    @post_load
    def create_payment(self, data, **kwargs):
        return Payment(**data)

payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)

class SubscriptionItemSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    subscription_id = fields.Integer(required=True)
    item_id = fields.Integer(required=True)
    item = fields.String(required=True)
    quantity = fields.String(required=True)
    created_at = fields.DateTime(dump_only=True, default=datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ'))

    class Meta:
        model = SubscriptionItem

    @post_load
    def create_subscription_item(self, data, **kwargs):
        return SubscriptionItem(**data)

subscription_item_schema = SubscriptionItemSchema()
subscription_items_schema = SubscriptionItemSchema(many=True)

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

