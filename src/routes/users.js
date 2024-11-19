const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser, validateUserInput } = require('../validations/userValidation'); 
const { forgotPassword, resetPassword } = require('../controllers/userController');

router.post('/', validateUser, validateUserInput, userController.postUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;