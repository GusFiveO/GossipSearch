import pytest
from fastapi.testclient import TestClient
from main import app


@pytest.fixture(scope="module")
def test_client():
    client = TestClient(app)
    yield client


def test_query_articles(test_client):
    response = test_client.post("/query/", json={"query": "test query", "top_k": 5})
    assert response.status_code == 200
    data = response.json()
    assert "articles" in data
    assert len(data["articles"]) == 5


def test_create_dataset(test_client):
    response = test_client.post("/create-dataset/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "Dataset created with" in data["message"]
