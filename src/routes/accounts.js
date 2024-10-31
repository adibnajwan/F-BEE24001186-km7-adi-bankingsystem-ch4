// src/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Rute untuk membuat akun
router.post('/', accountController.createAccount);

// Rute untuk mendapatkan semua akun
router.get('/', accountController.getAllAccounts);

// Rute untuk mendapatkan akun berdasarkan ID
router.get('/:accountId', accountController.getAccountById);

// Rute untuk mendapatkan akun berdasarkan pengguna
router.get('/user', authenticateToken, accountController.getAccountByUser); // Ganti '/' dengan '/user'

module.exports = router;
