// src/routes/media.js
const express = require('express');
const router = express.Router();
const { imageUpload } = require('../libs/multer');
const { uploadImage, getImages, getImageById, deleteImage, updateImage } = require('../controllers/mediaController');

router.post('/images', imageUpload.single('image'), uploadImage);

router.get('/images', getImages);

router.get('/images/:id', getImageById);

router.delete('/images/:id', deleteImage);

router.put('/images/:id', updateImage);

module.exports = router;
