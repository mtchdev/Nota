from flask import jsonify


def response(obj, code=200):
    if 'status' in obj:
        code = obj['status']
        del obj['status']
        print(obj)

    resp = {
        "code": code,
        "data": obj if obj else {}
    }

    if code > 399:
        return jsonify(resp), code
    else:
        return jsonify(resp)
