""" Defines the User repository """

from models import User
from sqlalchemy.orm import load_only
import bcrypt
import string
import random
from werkzeug.exceptions import UnprocessableEntity


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
            'username': user.json['username'],
            'email': user.json['email'],
            'token': user.generateToken()
        }

        return ret
