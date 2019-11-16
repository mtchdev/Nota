import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

db = None

def create_app(config="config"):
    app = Flask(__name__)
    app.config.from_object(config)

    CORS(app)

    from api.routes import http
    route_prefix = os.getenv('API_PREFIX') or '/api/v1'

    app.register_blueprint(http, url_prefix=route_prefix)
    return app

if __name__ == "__main__":
    load_dotenv()
    app = create_app()
    app.run(debug=True, host='0.0.0.0', use_reloader=True)
