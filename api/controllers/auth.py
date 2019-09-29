import bcrypt
import base64
from api.db.extensions import mongo
import jwt
from api.config import JWT_SECRET
from functools import wraps
from flask import request, jsonify
from bson.objectid import ObjectId

"""
Authentication Routes
"""

def register(form) -> str:
    username = form['username']
    email = form['email']
    password = form['password']
    
    # hash password
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        user = mongo.db.users.insert({
            'username': username,
            'email': email,
            'password': password
        });

        token = jwt.encode({'user': str(user)}, JWT_SECRET)
        return {'token': token.decode('utf-8')}
    
    except Exception as e:
        print(e)
        return 500;

def auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        form = request.form
        try:
            data = jwt.decode(form['token'], JWT_SECRET)
        except KeyError:
            return jsonify({
                'status': 403,
                'message': 'NO_AUTH'
            })

        user = mongo.db.users.find_one({'_id': ObjectId(data['user'])})
        return f(user)
    
    return decorated
