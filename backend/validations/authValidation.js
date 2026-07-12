const { body, validationResult } = require("express-validator");

// =======================
// Register Validation
// =======================
const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("role")
    .isIn([
      "candidate",
      "recruiter",
      "interviewer",
      "admin",
    ])
    .withMessage("Invalid role"),
];

// =======================
// Login Validation
// =======================
const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

// =======================
// Validation Result Handler
// =======================
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

// =======================
// Exports
// =======================
module.exports = {
  registerValidation,
  loginValidation,
  validate,
};