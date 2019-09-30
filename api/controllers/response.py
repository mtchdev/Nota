from flask import jsonify

def response(obj, code=200):
    if 'status' in obj:
        code = obj['status']
        del obj['status']
        print(obj)

    resp = {
        "status": code,
        "data": obj if obj else {}
    }

    return jsonify(resp)
