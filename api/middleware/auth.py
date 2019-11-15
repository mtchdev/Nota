import jwt
from flask import request
from api.util.response import response
from api.model.users import Users
from api.controllers.auth import serialize_user_dict
from functools import wraps
from api.config import JWT_SECRET

"""
Auth Decorator
Provides a backend auth-wall for incoming requests decorated with this function.
"""

def auth(f) -> Users:
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization')
        if not auth or auth and not auth.startswith('Bearer '):
           return response({'message': 'INVALID_HEADER'}, 403)

        token = auth.replace('Bearer ', '')

        try:
            data = jwt.decode(token, JWT_SECRET)
            ret = Users.objects(secret=data['personal_secret'])[0]
        except Exception as e:
            print(e)
            return response({'message': 'NO_AUTH'}, 403)

        return f(serialize_user_dict(ret)) if ret else response({'message': 'USER_NOT_FOUND'}, 404)
    
    return decorated

