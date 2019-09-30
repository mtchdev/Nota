import sys
from flask import Flask
from flask_mongoengine import MongoEngine
from flask_cors import CORS

db = None

def init_db(app):
    app.config['MONGODB_SETTINGS'] = {
        'db': 'mailx',
        'host': 'localhost',
        'port': 27017,
        'username': 'root',
        'password': 'root'
    }
    global db
    db = MongoEngine(app)
    # db.init_app(app)

def create_app(config="config"):
    app = Flask(__name__)
    app.config.from_object(config)
    CORS(app)
    init_db(app)
    from api.routes import http
    app.register_blueprint(http, url_prefix='/api/v1')
    return app

if __name__ == "__main__":
    app = create_app()
