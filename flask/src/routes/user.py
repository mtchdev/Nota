"""
Defines the blueprint for the users
"""
from flask import Blueprint
from flask_restful import Api

from resources import RegisterResource

AUTH_BLUEPRINT = Blueprint("auth", __name__)
Api(AUTH_BLUEPRINT).add_resource(
    RegisterResource, "/auth/register"
)
