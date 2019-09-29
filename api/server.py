import sys
from flask import Flask
from db.extensions import mongo
from routes import http

def create_app(config="config"):
    app = Flask(__name__)
    app.config.from_object(config)
    mongo.init_app(app)
    app.register_blueprint(http, url_prefix='/api/v1')
    return app

if __name__ == "__main__":
    app = create_app()
