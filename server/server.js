const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const dotenv = require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static file-serving middleware
app.get('/client/Styles/global.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'css', 'style.css'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
