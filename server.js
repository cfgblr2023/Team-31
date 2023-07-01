const express = require('express');
const axios = require('axios');
const multer = require('multer');
const app = express();

app.use(express.json());

// const { MongoClient } = require('mongodb');

// const uri = 'mongodb://165.225.106.173:3000'; 
// const dbName = 'Image_Label';

// Create a MongoDB client instance
// const client = new MongoClient(uri);

// Connect to the MongoDB server
// async function connectToDatabase() {
//     try {
//         await client.connect();
//         console.log('Connected to the MongoDB server');
//     } catch (error) {
//         console.error('Error connecting to the MongoDB server:', error);
//     }
// }

// app.post('/upload', async (req, res) => {
//     const imageData = req.body.imageData;

//     try {
//         // Call the ML service to obtain the label for the image
//         const mlResponse = await axios.post('http://127.0.0.1:5000', {
//             imageData: imageData,
//         });

//         const label = mlResponse.data.label;

//         // Save the image, label, latitude, and longitude to MongoDB
//         const db = client.db(dbName);
//         const collection = db.collection('images');

//         const imageDocument = {
//             imageData: imageData,
//             label: label,
//             latitude: req.body.latitude,
//             longitude: req.body.longitude,
//         };

//         await collection.insertOne(imageDocument);

//         // Send the label back to the Flutter app
//         res.json({ label: label });
//     } catch (error) {
//         console.error('Error processing image:', error);
//         res.status(500).json({ error: 'Failed to process image' });
//     }
// });

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No image uploaded');
    }

    // Access the uploaded file information
    console.log(req.file);

    const mlResponse = await axios.post('http://127.0.0.1:5000', {
        imageData: imageData,
    });
    console.log(mlResponse);
    res.send('Image uploaded successfully');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// connectToDatabase().then(() => {
//     app.listen(3000, () => {
//         console.log('Server started on port 3000');
//     });
// });

// app.listen(3000, () => {
//     console.log('Server started on port 3000');
// });