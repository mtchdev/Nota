""" Defines the User repository """

from models import User
from sqlalchemy.orm import load_only
import bcrypt
import string
import random
from werkzeug.exceptions import UnprocessableEntity, Forbidden


class UserRepository:

    @staticmethod
    def create(username, email, password):
        """ Create a new user """

        exists_username = bool(User.query.filter_by(username=username).first())
        exists_email = bool(User.query.filter_by(email=email).first())
        if exists_username:
            raise UnprocessableEntity(description="USER_USERNAME_EXISTS")

        if exists_email:
            raise UnprocessableEntity(description="USER_EMAIL_EXISTS")

        
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        secret = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=16))

        user = User(username=username, email=email, password=hashed, secret=secret)

        user.save()

        ret = {
            'user': {
                'username': user.json['username'],
                'email': user.json['email']
            },
            'token': user.generateToken()
        }

        return ret
    
    @staticmethod
    def authenticate(username, password):
        """ Authenticate a user """

        user = User.query.filter_by(username=username).first()

        if user:
            if bcrypt.checkpw(password.encode('utf-8'), user.json['password']):
                return {
                    'token': user.generateToken()
                }
            else:
                raise Forbidden(description="USER_PASSWORD_INCORRECT")
        else:
            raise Forbidden(description="USER_USER_NOT_FOUND")
    
    @staticmethod
    def refresh(user):
        """ Refresh user token """

        user = User.query.filter_by(username=user.json['username']).first()

        return {
            'user': {
                'username': user.json['username'],
                'email': user.json['email']
            },
            'token': user.generateToken()
        }
