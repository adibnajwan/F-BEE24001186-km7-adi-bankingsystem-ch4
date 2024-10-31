const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Pastikan authController diimpor

router.post('/login', authController.login); // Gunakan authController untuk login

module.exports = router;