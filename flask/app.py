from flask import Flask, request, jsonify, render_template
from PIL import Image
import numpy as np
import tensorflow as tf
import io
graph = tf.compat.v1.get_default_graph()
class_names = ['Encroachment by parking','Encroachment by planters','Encroachment by vendor or shop spillover','Encroachment by construction sites',
               'Junction boxes', 'Low hanging wires', 'Overgrown weeds','Transformers','Obstructions (Others)','Construction debris',
               'Garbage vulnerable point','Litter on street (Commercial)','Silt accumulation in drains','Silt accumulation on road',
               'Yellow spots','Broken footpath','Level difference','No footpath','Dark zone or No street lights','Streetlight not working'] 

# Use pickle to load in the pre-trained model.
#model = tf.keras.models.load_model("pavement.h5")
model = tf.keras.models.load_model('pavement.h5', compile=False)

#Initializing new Flask instance. Find the html template in "templates".
app = Flask(__name__, template_folder='templates')


#Second route : Use our model to make prediction - render the results page.
@app.route('/predict', methods=['POST'])
def predict():
    image = request.files['image']
    img = Image.open(io.BytesIO(image.read()))
    
    img = img.resize((224, 224))  # Resize to match the input size expected by the model
    img = np.array(img) / 255.0  # Normalize the image
    
    # Perform prediction
    prediction = model.predict(np.expand_dims(img, axis=0))
    predicted_class = class_names[np.argmax(prediction)]
    
    #return render_template('form.html', prediction = predicted_class)
    return jsonify({"label": predicted_class})


if __name__ == '__main__':
	app.run(debug=True)
