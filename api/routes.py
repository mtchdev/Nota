from flask import Blueprint, jsonify, request
from bson import json_util
from api.controllers.response import response
from api.controllers.auth import auth
# ROUTES
import api.controllers.auth

http = Blueprint('api', __name__)

@http.errorhandler(Exception)
def handle_error(e):
    print(e.code)
    print(e.description)
    message = e.description if e.description else ""
    ret = jsonify({'status': e.code, 'data': {'message': message}})

    return ret, e.code

@http.route('/')
def index():
    return jsonify({})

@http.route('/auth/register', methods=['POST'])
def auth_register():
    return api.controllers.auth.register(request.json)

@http.route('/auth/login', methods=['POST'])
def auth_login():
    return api.controllers.auth.login(request.form.to_dict())

@http.route('/self', methods=['GET'])
@auth
def get_self(user):
    return response({'user': user})
