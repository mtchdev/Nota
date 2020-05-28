""" Defines the User repository """

from models import User
from sqlalchemy.orm import load_only
import bcrypt
import base64
import jwt
import string
import random


class UserRepository:
    """ The repository for the user model """

    # @staticmethod
    # def get(last_name, first_name):
    #     """ Query a user by last and first name """
    #     return User.query.filter_by(last_name=last_name, first_name=first_name).one()

    # def update(self, last_name, first_name, age):
    #     """ Update a user's age """
    #     user = self.get(last_name, first_name)
    #     user.age = age

    #     return user.save()

    @staticmethod
    def create(username, email, password):
        """ Create a new user """
        
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        secret = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=16))

        user = User(username=username, email=email, password=hashed, secret=secret)

        user.save()

        token = jwt.encode({'personal_secret': user.json['secret']}, 'JWT_SECRET')

        ret = {
            'username': user.json['username'],
            'email': user.json['email'],
            'token': token.decode('utf-8')
        }

        return ret
