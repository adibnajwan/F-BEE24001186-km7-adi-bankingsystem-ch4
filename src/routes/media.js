const express = require('express');
const router = express.Router();
const { imageUpload } = require('../libs/multer'); 
const { uploadImage } = require('../controllers/mediaController');

router.post('/images', imageUpload.single('image'), uploadImage);

module.exports = router;