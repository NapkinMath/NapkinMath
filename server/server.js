const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const dotenv = require('dotenv').config();
const uploadRoute = require('./routes/uploadRouter')





app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static file-serving middleware
app.use(
  express.static(path.join(__dirname, '..', 'client', 'Styles', ))
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/upload', uploadRoute)





// app.post(
//   '/',
//   upload.single('file'),
//   // VisionAPIController.quickstart,
//   (req, res) => {
//     // The image is available in the request body
//     const image = req.body.file;

//     // You can save the image to a server and generate a URL for it here
//     const imageUrl = 'http://example.com/' + image.name;

//     // Send the URL back to the client
//     res.json({ url: imageUrl });
//   }
// );

app.use('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
