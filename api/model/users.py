from api.database import Document
from mongoengine import StringField, BinaryField

class Users(Document):
    
    username = StringField(max_length=24)
    email = StringField(max_length=255)
    password = BinaryField(max_bytes=60)
    secret = StringField(max_length=19)
