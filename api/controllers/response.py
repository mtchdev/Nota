from flask import jsonify

def response(obj, code=200):
    resp = {
        "status": code,
        "data": obj
    }

    return jsonify(resp)
