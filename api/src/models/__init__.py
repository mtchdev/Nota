from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .notebook import Notebook
