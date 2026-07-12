const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const {
  registerValidation,
  loginValidation,
  validate,
} = require("../validations/authValidation");

// ==========================
// Register Route
// ==========================
router.post(
  "/register",
  registerValidation,
  validate,
  authController.register
);

// ==========================
// Login Route
// ==========================
router.post(
  "/login",
  loginValidation,
  validate,
  authController.login
);

module.exports = router;