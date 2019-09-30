import bcrypt
import base64
from api.server import db
import jwt
from api.config import JWT_SECRET
from functools import wraps
from flask import request, jsonify
from bson.objectid import ObjectId
from api.controllers.response import response
from api.model.users import Users
import random
import string

"""
Authentication Routes
"""

def register(form) -> str:
    print(form)
    username = form['username']
    email = form['email']
    password = form['password']
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()) # bcrypt hashed password
    user_secret = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=16))

    try:
        user = Users()
        user.username = username
        user.email = email
        user.password = hashed
        user.secret = user_secret
        user.save()

        return login(form)
    
    except Exception as e:
        print(e)
        return {
            'status': 509,
            'data': str(e)
        }

def login(form):
    username = form['username']
    password = form['password']

    user = Users.objects(username=username)[0]
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = jwt.encode({'personal_secret': user['secret']}, JWT_SECRET)
        return {
            'token': token.decode('utf-8'),
            'user': serialize_user_dict(user)
        }
    else:
        return { 'status': 404 }

def serialize_user_dict(user) -> Users:
    delattr(user, 'password')
    return user

def auth(f) -> Users:
    @wraps(f)
    def decorated(*args, **kwargs):
        form = request.form
        try:
            data = jwt.decode(form['token'], JWT_SECRET)
        except KeyError:
            return response({'message': 'NO_AUTH'}, 403)

        ret = Users.objects(id=ObjectId(data['user']))[0]
        return f(serialize_user_dict(ret)) if ret else response({'message': 'NOT_FOUND'}, 404)
    
    return decorated
