# Final-API

### Respiratory Disease Prediction Model

This repository contains a Deep Learning model for predicting respiratory diseases using chest X-ray images. The model is based on DenseNet architecture and is capable of classifying images into three categories: Normal, Tuberculosis, and Pneumonia.

#### Files Included:

1. **densenet_with_metrics.h5**: This file contains the trained DenseNet model along with associated metrics.

2. **disease_prediction_model.ipynb**: This Jupyter Notebook file contains the logic for loading the data and preprocessing it,building the prediction model, testingand outputting  evaluation metrics.

3. **main.py**: This Python script implements a FastAPI server for deploying the prediction model. It includes the logic for handling image uploads, making predictions, and providing explanations using LIME (Local Interpretable Model-Agnostic Explanations) technique.

4. **test_app.py**: This Python script contains unit tests for testing the prediction endpoint of the FastAPI server.

5. **test_image.jpeg**: This is a sample test image used for testing the prediction endpoint.

6. **requirements.txt**: This file lists all the Python packages required to run the application.

#### Usage:

1. Clone this repository to your local machine.
   ```
   git clone <repository_url>
   ```

2. Install the required dependencies using pip.
   ```
   pip install -r requirements.txt
   ```

3. Run the FastAPI server using the following command:
   ```
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

4. Once the server is running, you can make predictions by sending POST requests to the `/predict/` endpoint with an image file attached.

#### How to Contribute:

If you'd like to contribute to this project, you can:

- Test the model with your own images and provide feedback on its performance.
- Improve the model architecture or fine-tune hyperparameters to enhance accuracy.
- Add support for more respiratory disease categories or improve the explanation mechanism.
- Report any issues or bugs you encounter while using the application.

Feel free to fork this repository, make your changes, and submit a pull request. We welcome contributions from the community!

