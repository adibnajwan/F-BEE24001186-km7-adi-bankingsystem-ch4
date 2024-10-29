const { body, validationResult } = require('express-validator');

const validateAccount = [
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('accountNumber').isString().withMessage('Account number must be a string'),
  body('balance').isFloat({ min: 0 }).withMessage('Balance must be a non-negative number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateAccount };