"""
Define the REST verbs relative to the users
"""

from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import UserRepository
from util import parse_params


class RegisterResource(Resource):

    @staticmethod
    @parse_params(
        Argument("username", location="json", required=True, help="Username."),
        Argument("email", location="json", required=True, help="Email."),
        Argument("password", location="json", required=True, help="Password.")
    )
    @swag_from("../swagger/user/POST.yml")
    def post(username, email, password):
        user = UserRepository.create(
            username=username, email=email, password=password
        )

        return jsonify({"data": user})
