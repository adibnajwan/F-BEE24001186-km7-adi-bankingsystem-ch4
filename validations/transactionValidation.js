const { body, validationResult } = require('express-validator');

const validateTransaction = [
  body('fromAccountId').isInt().withMessage('From Account ID must be an integer'),
  body('toAccountId').isInt().withMessage('To Account ID must be an integer'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be greater than zero'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateTransaction };