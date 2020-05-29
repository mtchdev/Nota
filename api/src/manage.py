from flask import Flask
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

import config
from models import db

server = Flask(__name__)
server.debug = config.DEBUG
server.config["SQLALCHEMY_DATABASE_URI"] = config.DB_URI
db.init_app(server)

migrate = Migrate(server, db)
manager = Manager(server)
manager.add_command("db", MigrateCommand)

if __name__ == "__main__":
    manager.run()
