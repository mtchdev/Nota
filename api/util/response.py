from bson import json_util

def response(obj, code=200):
    if 'status' in obj:
        code = obj['status']
        del obj['status']
        print(obj)

    resp = {
        "code": code,
        "data": obj or {}
    }

    resp = json_util.dumps(obj)

    if code > 399:
        return resp, code
    else:
        return resp

def error(data):
    return response({'message': str(data)}, 500)
