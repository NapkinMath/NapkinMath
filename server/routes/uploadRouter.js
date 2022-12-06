const express = require('express');
const router = express.Router();
const multer = require('multer'); //node. js middleware for handling multipart/form-data , which is primarily used for uploading files.
const path = require('path');
const VisionAPIController = require('../controllers/VisionAPIController');
const fse = require('fs-extra');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// const upload = multer({dest: path.join(__dirname, '../uploads')});

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page');
});
// define the about route
router.post(
  '/',
  upload.single('file'),
  VisionAPIController.quickstart,
  VisionAPIController.parse,
  (req, res) => {
    fse.emptyDirSync(path.join(__dirname, '../uploads'));
    return res.json(res.locals.itemsListObj)
  }
);

module.exports = router;
