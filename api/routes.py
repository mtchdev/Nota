from flask import Blueprint, jsonify, request
from api.db.extensions import mongo
from bson import json_util
from api.controllers.response import response
from api.controllers.auth import auth
# ROUTES
import api.controllers.auth

http = Blueprint('api', __name__)

@http.route('/')
def index():
    res = api.controllers.auth.register({
        'username': 'spliitzx',
        'email': 'eee',
        'password': '1'
    })
    
    return response(res)

@http.route('/someauthwall', methods=['POST'])
@auth
def test(user):
    print(user)
    return jsonify([])
