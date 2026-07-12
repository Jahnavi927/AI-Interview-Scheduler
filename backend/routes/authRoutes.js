const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
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

// ==========================
// Profile Route (Protected)
// ==========================
router.get(
  "/profile",
  authMiddleware,
  authController.getProfile
);

module.exports = router;