import uvicorn
from fastapi import FastAPI, File, UploadFile
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os
import lime
from lime import lime_image
from skimage.segmentation import mark_boundaries
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import base64

app = FastAPI()

# Load the model with the correct local file path
model_path = os.path.abspath('densenet_with_metrics.h5')

loaded_model = load_model(model_path)
loaded_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

classes = {
    0: 'Normal',
    1: 'Tuberculosis',
    2: 'Pneumonia'
}


def preprocess_image(image_path, target_size=(128, 128)):
    img = image.load_img(image_path, target_size=target_size)
    img_array = image.img_to_array(img)
    
    # Convert color space from RGB to BGR
    img_array_rgb = img_array[..., ::-1]
    
    # Expand dimensions to match the model's input shape
    img_array_expanded = np.expand_dims(img_array_rgb, axis=0)
    
    # Normalize pixel values
    img_array_normalized = img_array_expanded / 255.0
    
    return img_array_normalized


def lime_explain(model, image, class_index):
    explainer = lime_image.LimeImageExplainer()
    explanation = explainer.explain_instance(image[0].astype('uint8'), model.predict, top_labels=3, hide_color=0, num_samples=1000)
    temp, mask = explanation.get_image_and_mask(class_index, positive_only=True, num_features=5, hide_rest=False)
    img_boundry1 = mark_boundaries(temp / 2 + 0.5, mask, color=(0, 0, 1))
    return img_boundry1

def adjust_contrast_brightness(image, alpha=1.5, beta=25):
    adjusted_image = cv2.convertScaleAbs(image, alpha=alpha, beta=beta)
    return adjusted_image

def image_to_base64(image):
    retval, buffer = cv2.imencode('.jpg', image)
    image_base64 = base64.b64encode(buffer).decode('utf-8')
    return image_base64

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    image_resized = cv2.resize(image, (128, 128))
    image_rgb = cv2.cvtColor(image_resized, cv2.COLOR_BGR2RGB)
    image_normalized = image_rgb / 255.0
    image_expanded = np.expand_dims(image_normalized, axis=0)

    prediction = loaded_model.predict(image_expanded)
    softmax_probabilities = tf.nn.softmax(prediction[0]).numpy()
    predicted_class_idx = np.argmax(softmax_probabilities)
    predicted_class = classes[predicted_class_idx]

    preprocessed_image_uint8 = (image_expanded * 255).astype('uint8')
    lime_explanation = lime_explain(loaded_model, preprocessed_image_uint8, predicted_class_idx)
    lime_explanation_resized = cv2.resize(lime_explanation, (preprocessed_image_uint8.shape[2], preprocessed_image_uint8.shape[1]))

    original_image_adjusted = adjust_contrast_brightness(preprocessed_image_uint8[0])
    lime_explanation_adjusted = adjust_contrast_brightness(lime_explanation_resized)
    superimposed_img = cv2.addWeighted(original_image_adjusted, 0.6, lime_explanation_adjusted, 0.4, 0)

    original_image_base64 = image_to_base64(cv2.cvtColor(original_image_adjusted, cv2.COLOR_BGR2RGB))
    superimposed_image_base64 = image_to_base64(cv2.cvtColor(superimposed_img, cv2.COLOR_BGR2RGB))

    return {
        "Prediction": predicted_class,
        "Probability": float(softmax_probabilities[predicted_class_idx]),
        "Softmax Probabilities": softmax_probabilities.tolist(),
        "Original Image": original_image_base64,
        "Superimposed Image": superimposed_image_base64
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 