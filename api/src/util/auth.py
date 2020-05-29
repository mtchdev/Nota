import jwt
from flask import request
from functools import wraps
from werkzeug.exceptions import Forbidden
from models import User

"""
Auth Decorator
Provides a backend auth-wall for incoming requests decorated with this function.
"""

def auth(f) -> User:
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization')
        if not auth or auth and not auth.startswith('Bearer '):
           raise Forbidden(description="INVALID_HEADER")

        token = auth.replace('Bearer ', '')

        data = jwt.decode(token, 'JWT_SECRET')
        ret = User.query.filter_by(secret=data['personal_secret']).first()

        if ret:
            return f(ret)
        else:
            raise Forbidden("USER_USER_NOT_FOUND")
    
    return decorated
