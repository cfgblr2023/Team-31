const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const axios = require('axios');
const connection = require('./db')
const cors = require('cors');

const FormData = require('form-data');
// const body-parser = require('body-parser');
require ('dotenv').config();
connection();

const app = express();
const port = 4000;
app.use(express(cors()));

// Set up multer storage and file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where the uploaded file will be saved
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Set the filename of the uploaded file
    cb(null, file.originalname);
  }
});

// Create multer instance with the storage configuration
const upload = multer({ storage });

app.get('/hello', (req, res) => {
  res.send('Hello World!');
})

// POST route to handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  // Access the uploaded file through req.file
  // console.log(req);
  const imageData = req.file;
  
  console.log(imageData);
    try {
      // var formData = new FormData();
      // formData.append('file', imageData);
      var fs = require('fs');
      var form = new FormData();
      form.append('file', fs.createReadStream(imageData));

      // Call the ML service to obtain the label for the image
      const mlResponse = await axios.post('http://127.0.0.1:5000/predict', form,{
          file: imageData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      });

      const label = mlResponse.data.label;

      // Save the image, label, latitude, and longitude to MongoDB
      // const db = client.db(dbName);
      // const collection = db.collection('images');

      // const imageDocument = {
      //     imageData: imageData,
      //     label: label,
      //     latitude: req.body.latitude,
      //     longitude: req.body.longitude,
      // };

      // await collection.insertOne(imageDocument);

      // Send the label back to the Flutter app
      return res.json({ label: label });
  } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Failed to process image' });
  }
 // res.json({ message: 'File uploaded successfully' });
});

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
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//package

{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.4.0",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "form-data": "^4.0.0",
    "mongodb": "^5.6.0",
    "mongoose": "^7.3.1",
    "multer": "^1.4.5-lts.1",
    "nodemon": "^2.0.22",
    "react-scripts": "^5.0.1",
    "ws": "^8.13.0"
  }
}



