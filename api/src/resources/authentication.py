from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import UserRepository
from util import parse_params
from util import auth


class RegisterResource(Resource):

    @staticmethod
    @parse_params(
        Argument("username", location="json", required=True, help="Username."),
        Argument("email", location="json", required=True, help="Email."),
        Argument("password", location="json", required=True, help="Password.")
    )
    @swag_from("../swagger/auth/register.yml")
    def post(username, email, password):
        user = UserRepository.create(
            username=username, email=email, password=password
        )

        return jsonify({"data": user})

class LoginResource(Resource):

    @staticmethod
    @parse_params(
        Argument("username", location="json", required=True, help="Username."),
        Argument("password", location="json", required=True, help="Password.")
    )
    @swag_from("../swagger/auth/login.yml")
    def post(username, password):
        user = UserRepository.authenticate(
            username=username, password=password
        )

        return jsonify({"data": user})

class RefreshResource(Resource):

    @staticmethod
    @auth
    @swag_from("../swagger/auth/refresh.yml")
    def get(user):
        user = UserRepository.refresh(user=user)

        return jsonify({"data": user})
