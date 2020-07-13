from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import NotebookRepository
from util import parse_params
from util import auth


class NotebookResource(Resource):

    @staticmethod
    @auth
    @parse_params(
        Argument("name", location="json", required=True, help="Notebook Name."),
        Argument("color", location="json", required=True, help="Notebook Color."),
    )
    @swag_from("../swagger/auth/register.yml")
    def post(user, name, color):
        notebook = NotebookRepository.create(
            user=user, name=name, color=color
        )

        return jsonify({"data": notebook})

    @staticmethod
    @auth
    @swag_from("../swagger/auth/register.yml")
    def get(user):
        notebooks = NotebookRepository.getAll(
            user=user
        )

        return jsonify({"data": notebooks})
