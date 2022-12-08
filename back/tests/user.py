import unittest
import asyncio
import functools

from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()
client = TestClient(app)


def async_test(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        coro = func(*args, **kwargs)
        asyncio.run(coro)

    return wrapper


class UserTests(unittest.TestCase):

    @async_test
    async def test_create(self):
        response = client.get("/")
        assert response.status_code == 404


if __name__ == '__main__':
    unittest.main()
