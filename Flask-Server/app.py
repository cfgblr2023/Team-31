from flask import Flask, request, jsonify, render_template
from PIL import Image
import numpy as np
import tensorflow as tf
import io
class_names = ['Encroachment by parking','Encroachment by planters','Encroachment by vendor or shop spillover','Encroachment by construction sites',
               'Junction boxes', 'Low hanging wires', 'Overgrown weeds','Transformers','Obstructions (Others)','Construction debris',
               'Garbage vulnerable point','Litter on street (Commercial)','Silt accumulation in drains','Silt accumulation on road',
               'Yellow spots','Broken footpath','Level difference','No footpath','Dark zone or No street lights','Streetlight not working'] 

model = tf.keras.models.load_model('pavement.h5', compile=False)

app = Flask(__name__)
@app.route('/predict', methods=['POST'])
def predict():
    image = request.files['image']
    img = Image.open(io.BytesIO(image.read()))
    img = img.resize((224, 224))
    img = np.array(img) / 255.0 
    prediction = model.predict(np.expand_dims(img, axis=0))
    predicted_class = class_names[np.argmax(prediction)]
 
    return jsonify({"label": predicted_class})


if __name__ == '__main__':
    app.run(debug=True)