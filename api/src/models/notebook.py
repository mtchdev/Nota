from . import db
from .abc import BaseModel, MetaBaseModel
import jwt

class Notebook(db.Model, BaseModel, metaclass=MetaBaseModel):
    """ The Notebook Model """

    __tablename__ = "notebooks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(24))
    color = db.Column(db.String(6))
    user = db.Column(db.Integer())
    created_at = db.Column(db.Integer())
    updated_at = db.Column(db.Integer())

    def __init__(self, name, color, user, created_at, updated_at):
        """ Create a new Notebook """
        self.name = name
        self.color = color
        self.user = user
        self.created_at = created_at
        self.updated_at = updated_at
    
    def transform(self):
        return {
            'name': self.name,
            'color': self.color,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
