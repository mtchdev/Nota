FROM alpine:latest

RUN apk add --no-cache \
    python3-dev \
    libffi-dev \
    gcc \
    linux-headers \
    musl-dev \
    && pip3 install --upgrade pip

COPY . /app
WORKDIR /app

RUN pip3 install --no-cache -r requirements.txt

EXPOSE 5000

ENTRYPOINT [ "python3" ]
CMD [ "server.py" ]
