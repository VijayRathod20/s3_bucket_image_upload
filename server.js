// server.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const s3 = require('./s3'); // Import the S3 configuration

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for uploading an image to S3
app.post('/upload', upload.single('image'), (req, res) => {
  const params = {
    Bucket: 'rv-spark',
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading image to S3');
    }
    res.send('Image uploaded successfully!');
  });
});

// Route for displaying an image from S3
app.get('/image/:key', (req, res) => {
  const params = {
    Bucket: 'rv-spark',
    Key: req.params.key,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).send('Image not found');
    }
    res.contentType(data.ContentType);
    res.send(data.Body);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
