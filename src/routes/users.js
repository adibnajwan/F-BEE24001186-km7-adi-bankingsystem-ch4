const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.postUser);  
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);

module.exports = router;
