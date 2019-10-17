def validate(form, opts) -> bool:
    if not form:
        return False

    # maybe include some sort of string/length etc validation but now just checking exists
    keys = list(form.keys())

    for key in range(len(opts)):
        if not keys[key] in opts:
            return False

    return True
