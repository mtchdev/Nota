import os
import dotenv

dotenv.load_dotenv()

MONGO_URI = os.environ.get('MONGO_URI')
JWT_SECRET = os.environ.get('JWT_SECRET')
