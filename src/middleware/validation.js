const { body, param, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// User registration validation
const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin'),
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Project creation/update validation
const validateProject = [
  body('name')
    .notEmpty()
    .withMessage('Project name is required')
    .isLength({ min: 1 })
    .withMessage('Project name must be at least 1 character'),
  body('description')
    .notEmpty()
    .withMessage('Project description is required'),
  body('status')
    .optional()
    .isIn(['active', 'completed', 'on-hold'])
    .withMessage('Status must be active, completed, or on-hold'),
  handleValidationErrors
];

// ID parameter validation
const validateIdParam = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid ID parameter'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateProject,
  validateIdParam,
  handleValidationErrors
};
