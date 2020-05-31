"""
Defines the blueprint for the users
"""
from flask import Blueprint
from flask_restful import Api

from resources import RegisterResource
from resources import LoginResource
from resources import RefreshResource

AUTH_BLUEPRINT = Blueprint("auth", __name__)
Api(AUTH_BLUEPRINT).add_resource(
    RegisterResource, "/auth/register"
)

Api(AUTH_BLUEPRINT).add_resource(
    LoginResource, "/auth/login"
)

Api(AUTH_BLUEPRINT).add_resource(
    RefreshResource, "/auth/refresh"
)
