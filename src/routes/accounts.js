const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', accountController.createAccount);
router.get('/', accountController.getAllAccounts);
router.get('/:accountId', accountController.getAccountById);
router.get('/', authenticateToken, accountController.getAccountByUser);

module.exports = router;