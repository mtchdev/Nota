import bcrypt
import base64
from api.server import db
import jwt
from api.config import JWT_SECRET
from functools import wraps
from flask import request, jsonify, abort
from bson.objectid import ObjectId
from api.util.response import response
from api.model.users import Users
from api.util.validate import validate
import random
import string
import re
import traceback

"""
Authentication Routes
"""

def register(form) -> str:
    if not validate(form, [
        'username',
        'email',
        'password'
    ]):
        return response({'message': 'FORM_INVALID'}, 422)

    username = form['username']
    email = form['email']
    password = form['password']

    if len(username) < 3:
        return response({'message': 'USERNAME_TOO_SHORT'}, 422)
    
    if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        return response({'message': 'INVALID_EMAIL'}, 422)

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
        traceback.print_exc()
        return response({'message': str(e)}, 500)

def login(form):
    username = form['username']
    password = form['password']

    user = Users.objects(username=username)[0]
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = jwt.encode({'personal_secret': user['secret']}, JWT_SECRET)
        return response({
            'token': token.decode('utf-8'),
            'user': serialize_user_dict(user)
        })
    else:
        return response({'message': 'USER_NOT_FOUND'}, 404)

def serialize_user_dict(user) -> Users:
    delattr(user, 'password')
    delattr(user, 'secret')
    return user

def auth(f) -> Users:
    @wraps(f)
    def decorated(*args, **kwargs):
        form = request.form
        try:
            data = jwt.decode(form['token'], JWT_SECRET)
        except KeyError:
            return response({'message': 'NO_AUTH'}, 403)

        ret = Users.objects(secret=data['personal_secret'])[0]
        return f(serialize_user_dict(ret)) if ret else response({'message': 'USER_NOT_FOUND'}, 404)
    
    return decorated
