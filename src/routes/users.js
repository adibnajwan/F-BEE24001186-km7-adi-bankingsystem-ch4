const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser, validateUserInput } = require('../validations/userValidation'); // Import disini

router.post('/', validateUser, validateUserInput, userController.postUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);

module.exports = router;