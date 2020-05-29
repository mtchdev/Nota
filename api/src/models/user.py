from . import db
from .abc import BaseModel, MetaBaseModel
import jwt

class User(db.Model, BaseModel, metaclass=MetaBaseModel):
    """ The User model """

    __tablename__ = "users"

    username = db.Column(db.String(24), primary_key=True)
    email = db.Column(db.String(255))
    password = db.Column(db.Binary())
    secret = db.Column(db.String(19))

    def __init__(self, username, email, password, secret):
        """ Create a new User """
        self.username = username
        self.email = email
        self.password = password
        self.secret = secret
    
    def generateToken(self):
        """ Generate JWT auth token """

        ret = jwt.encode({'personal_secret': self.secret}, 'JWT_SECRET')
        return ret.decode('utf-8')
