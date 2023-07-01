const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const connection = require('./db')
require ('dotenv').config();
connection();

const app = express();
const port = 3000;

app.use(express.json());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads'); 
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg'); 
//   },
// });
// const upload = multer({ storage });

// const imageSchema = new mongoose.Schema({
//   filename: String,
//   path: String,
// });
// const Image = mongoose.model('Image', imageSchema);

// app.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const newImage = new Image({
//       filename: req.file.filename,
//       path: req.file.path,
//     });

//     await newImage.save();

//     res.sendStatus(200);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

app.post('/upload', async (req, res) => {
  const imageData = req.body.imageData;

  try {
      // Call the ML service to obtain the label for the image
      const mlResponse = await axios.post('http://your-ml-service-url', {
          imageData: imageData,
      });

      const label = mlResponse.data.label;

      // Save the image, label, latitude, and longitude to MongoDB
      const db = client.db(dbName);
      const collection = db.collection('images');

      const imageDocument = {
          imageData: imageData,
          label: label,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
      };

      await collection.insertOne(imageDocument);

      // Send the label back to the Flutter app
      res.json({ label: label });
  } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Failed to process image' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});