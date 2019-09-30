import bcrypt
import base64
from api.db.extensions import mongo
import jwt
from api.config import JWT_SECRET
from functools import wraps
from flask import request, jsonify
from bson.objectid import ObjectId
from api.controllers.response import response

"""
Authentication Routes
"""

def register(form) -> str:
    username = form['username']
    email = form['email']
    password = form['password']
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()) # bcrypt hashed password

    try:
        user = mongo.db.users.insert({
            'username': username,
            'email': email,
            'password': hashed
        })

        # token = jwt.encode({'user': str(user)}, JWT_SECRET)
        return login(form)
    
    except Exception as e:
        print(e)
        return {
            'status': 500,
            'data': str(e)
        }

def login(form):
    username = form['username']
    password = form['password']

    user = mongo.db.users.find_one({'username': username})
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = jwt.encode({'user': str(user['_id'])}, JWT_SECRET)
        return {
            'token': token.decode('utf-8'),
            'user': serialize_user_dict(user)
        }
    else:
        return {
            'status': 404
        }

def serialize_user_dict(user) -> dict:
    ret = {
        'username': user.get('username', None),
        'email': user.get('email', None)
    }

    return ret

def auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        form = request.form
        try:
            data = jwt.decode(form['token'], JWT_SECRET)
        except KeyError:
            return response({'message': 'NO_AUTH'}, 403)

        ret = mongo.db.users.find_one({'_id': ObjectId(data['user'])})
        return f(ret) if ret else response({'message': 'NOT_FOUND'}, 404)
    
    return decorated
