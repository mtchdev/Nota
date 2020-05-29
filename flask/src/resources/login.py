from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import UserRepository
from util import parse_params, auth


class LoginResource(Resource):

    @staticmethod
    @parse_params(
        Argument("username", location="json", required=True, help="Username."),
        Argument("password", location="json", required=True, help="Password.")
    )
    @swag_from("../swagger/user/POST.yml")
    def post(username, password):
        user = UserRepository.authenticate(
            username=username, password=password
        )

        return jsonify({"data": user})
