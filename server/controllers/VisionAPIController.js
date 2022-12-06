const VisionAPIController = {};

VisionAPIController.quickstart = async (req, res, next) => {
  const image = req.body.file;
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection(image); //parameter should be the Image's Url (saved from multer?)
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach((label) => console.log(label.description));

  res.locals = labels;

  return res.status(200).send(res.locals);

  // quickstart();
};

module.exports = VisionAPIController;
