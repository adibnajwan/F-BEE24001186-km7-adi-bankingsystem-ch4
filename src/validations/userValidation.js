const { body, validationResult } = require('express-validator');

const validateUser = [
  body('name').isString().withMessage('Name must be a string'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('bio').optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateUser };