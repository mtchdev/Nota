from flask import Blueprint, jsonify, request
from bson import json_util
from api.controllers.response import response
from api.controllers.auth import auth
# ROUTES
import api.controllers.auth

http = Blueprint('api', __name__)

@http.route('/')
def index():
    return jsonify({})

@http.route('/auth/register', methods=['POST'])
def auth_register():
    return response(api.controllers.auth.register(request.form))

@http.route('/auth/login', methods=['POST'])
def auth_login():
    return response(api.controllers.auth.login(request.form))

@http.route('/self', methods=['GET'])
@auth
def get_self(user):
    return response({'user': user})
