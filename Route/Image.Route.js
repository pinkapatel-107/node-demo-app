const express = require('express');
const upload = require('../Config/upload.Multer'); 
const imageConverterController= require('../Controller/imageConverter.Controller');  

const router = express.Router();

router.post('/image-to-pdf', upload, imageConverterController.imageToPdf);

module.exports = router;
