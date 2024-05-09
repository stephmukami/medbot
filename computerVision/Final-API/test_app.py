import pytest
from fastapi.testclient import TestClient
from main import app ,classes 
import warnings

client = TestClient(app)

def test_predict_endpoint():
    with open("test_image.jpeg", "rb") as image_file:
        image_contents = image_file.read()

    response = client.post("/predict/", files={"file": ("test_image.jpeg", image_contents)})

    assert response.status_code == 200

    # Assert the response contains the expected keys
    assert "Prediction" in response.json()
    assert "Probability" in response.json()
    assert "Softmax Probabilities" in response.json()
    assert "Original Image" in response.json()
    assert "Superimposed Image" in response.json()


def test_prediction_class_validity():
    with open("test_image.jpeg", "rb") as image_file:
        image_contents = image_file.read()

    response = client.post("/predict/", files={"file": ("test_image.jpeg", image_contents)})

    predicted_class = response.json()["Prediction"]
    assert predicted_class in classes.values()

def test_probability_range():
    with open("test_image.jpeg", "rb") as image_file:
        image_contents = image_file.read()

    response = client.post("/predict/", files={"file": ("test_image.jpeg", image_contents)})

    # Assert the probability is between 0 and 1
    probability = response.json()["Probability"]
    assert 0 <= probability <= 1

def test_softmax_probabilities_sum():
    with open("test_image.jpeg", "rb") as image_file:
        image_contents = image_file.read()

    response = client.post("/predict/", files={"file": ("test_image.jpeg", image_contents)})

    # Assert the sum of softmax probabilities is close to 1
    softmax_probabilities = response.json()["Softmax Probabilities"]
    sum_of_probabilities = sum(softmax_probabilities)
    assert abs(sum_of_probabilities - 1) < 1e-6

