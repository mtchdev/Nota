"""
Define the REST verbs relative to the users
"""

from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import UserRepository
from util import parse_params


class UserResource(Resource):
    """ Verbs relative to the users """

    @staticmethod
    @swag_from("../swagger/user/GET.yml")
    def get(last_name, first_name):
        """ Return an user key information based on his name """
        user = UserRepository.get(last_name=last_name, first_name=first_name)
        return jsonify({"user": user.json})

    @staticmethod
    @parse_params(
        Argument("username", location="json", required=True, help="Username."),
        Argument("email", location="json", required=True, help="Email."),
        Argument("password", location="json", required=True, help="Password."),
    )
    @swag_from("../swagger/user/POST.yml")
    def post(username, email, password):
        """ Create an user based on the sent information """
        user = UserRepository.create(
            username=username, email=email, password=password
        )
        return jsonify({"user": user})

    @staticmethod
    @parse_params(
        Argument("age", location="json", required=True, help="The age of the user.")
    )
    @swag_from("../swagger/user/PUT.yml")
    def put(last_name, first_name, age):
        """ Update an user based on the sent information """
        repository = UserRepository()
        user = repository.update(last_name=last_name, first_name=first_name, age=age)
        return jsonify({"user": user.json})
