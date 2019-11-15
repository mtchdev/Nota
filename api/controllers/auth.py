import bcrypt
import base64
from api.server import db
import jwt
from api.config import JWT_SECRET
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
        return response({'username': ['Username msut be less than 3 characters.']}, 400)
    
    if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        return response({
            'email': ['Email is invalid.']
        }, 400)

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

    # TODO: validate user AND password separately
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = jwt.encode({'personal_secret': user['secret']}, JWT_SECRET)
        return response({
            'token': token.decode('utf-8'),
            'user': serialize_user_dict(user)
        })
    else:
        return response({
            'username': ['We couldn\'t find a user with that username.']
        }, 400)

def serialize_user_dict(user) -> Users:
    delattr(user, 'password')
    delattr(user, 'secret')
    return user

