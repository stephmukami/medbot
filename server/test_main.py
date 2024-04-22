import pytest
from fastapi.testclient import TestClient
from main import app

@pytest.fixture
def client():
    return TestClient(app)


def test_get_chat_endpoint(client):
    payload = {"user_text": "state symptoms of tb"}
    response = client.post('/getChat/', json=payload)
    assert response.status_code == 200


def test_output_component(client):
      payload = {"user_text": "state symptoms of tb"}
      response = client.post('/getChat/', json=payload)
      assert response.status_code == 200
      assert 'output_text' in response.json()
