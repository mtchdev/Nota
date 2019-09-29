from flask import Blueprint, jsonify
from db.extensions import mongo
from bson import json_util

http = Blueprint('api', __name__)

@http.route('/')
def index():
    return jsonify([])
