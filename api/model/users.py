from api.server import db
from mongoengine import StringField, BinaryField

class Users(db.Document):
    
    username = StringField(max_length=24)
    email = StringField(max_length=255)
    password = BinaryField(max_bytes=60)
