const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser, validateUserInput } = require('../validations/userValidation'); 

router.post('/', validateUser, validateUserInput, userController.postUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;

const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/userControllers');