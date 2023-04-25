const vision = require('@google-cloud/vision'); // Imports the Google Cloud client library
const path = require('path');
const getItemsListObj = require('./utils/receiptParser');
require('dotenv').config();

const VisionAPIController = {};

const CONFIG = {
  credentials: {
    private_key: JSON.parse(JSON.stringify(process.env.PRIVATE_KEY)),
    client_email: process.env.CLIENT_EMAIL,
  },
};

const client = new vision.ImageAnnotatorClient(CONFIG); // Creates a client

VisionAPIController.quickstart = async (req, res, next) => {
  // Performs label detection on the image file
  const [result] = await client.textDetection(
    path.join(__dirname, `../uploads/${req.file.filename}`)
  ); //parameter should be the Image's Url (saved from multer?)
  const textData = result.textAnnotations;

  res.locals.textData = textData;
  return next();
};

VisionAPIController.parse = async (req, res, next) => {
  res.locals.itemsListObj = getItemsListObj(res.locals.textData);
  return next();
};

// // DELETE LATER WHEN DONE TESTING
// async function testAPI(imageUrl) {
//   const [result] = await client.textDetection(path.join(__dirname, imageUrl)); //parameter should be the Image's Url (saved from multer?)
//   //const labels = result.labelAnnotations;
//   console.log(getItemsListObj(result.textAnnotations));
//   // labels.forEach((label) => console.log(label.description));
// }

// testAPI('image.png');

module.exports = VisionAPIController;

//<--------------- OLD VERSION --------->

// // const vision = require('@google-cloud/vision'); // Imports the Google Cloud client library
// const path = require('path');
// // const {getItemsListObj} = require('./utils/receiptParser');
// // require('dotenv').config();
// //
// // const VisionAPIController = {};

// // const CONFIG = {
// //   credentials: {
//     private_key: JSON.parse(JSON.stringify(process.env.PRIVATE_KEY)),
// //     client_email: process.env.CLIENT_EMAIL,
// //   },
// // };
// //
// // const client = new vision.ImageAnnotatorClient(CONFIG); // Creates a client

// // VisionAPIController.quickstart = async (req, res, next) => {
//   // Performs label detection on the image file
// //   const [result] = await client.textDetection(
//     path.join(__dirname, `../uploads/${req.file.filename}`)
// //   ); //parameter should be the Image's Url (saved from multer?)
// //   const textData = result.textAnnotations;

// //   res.locals.textData = textData;
//   return next();
// };

// VisionAPIController.parse = async (req, res, next) => {
//   res.locals.itemsListObj = getItemsListObj(res.locals.textData);
//   return next();
// };

// // // DELETE LATER WHEN DONE TESTING
// // async function testAPI(imageUrl) {
// //   const [result] = await client.textDetection(path.join(__dirname, imageUrl)); //parameter should be the Image's Url (saved from multer?)
// //   //const labels = result.labelAnnotations;
// //   console.log(getItemsListObj(result.textAnnotations));
// //   // labels.forEach((label) => console.log(label.description));
// // }

// // testAPI('image.png');

// module.exports = VisionAPIController;
