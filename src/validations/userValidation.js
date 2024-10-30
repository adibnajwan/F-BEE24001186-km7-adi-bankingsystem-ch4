const { body, validationResult } = require('express-validator');

const validateUser = [
  body('name').isString().withMessage('Name must be a string'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('bio').optional().isString(),
];

const validateUserInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());  
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateUser, validateUserInput };