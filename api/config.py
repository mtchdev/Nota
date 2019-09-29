import os
import dotenv

dotenv.load_dotenv()

MONGO_URI = os.environ.get('MONGO_URI')
