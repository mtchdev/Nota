import json
import unittest

from models import User
from models.abc import db
from repositories import UserRepository
from server import server


class TestUser(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = server.test_client()

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_create(self):
        response = self.client.post(
            "/api/auth/register",
            content_type="application/json",
            data=json.dumps({
                "username": "foobar",
                "email": "foo@bar.com",
                "password": "hunter2"
            }),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.query.count(), 1)
