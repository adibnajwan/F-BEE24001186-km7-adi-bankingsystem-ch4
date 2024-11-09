const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController'); 

router.post('/upload', mediaController.uploadImage);

router.get('/', mediaController.getImages);

router.get('/:id', mediaController.getImageById);

router.put('/:id', mediaController.updateImage);

router.delete('/:id', mediaController.deleteImage);

module.exports = router;
