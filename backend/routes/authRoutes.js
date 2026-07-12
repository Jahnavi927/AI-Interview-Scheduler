const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const roleMiddleware = require("../middleware/roleMiddleware");
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

// Candidate Dashboard
router.get(
  "/candidate-dashboard",
  authMiddleware,
  roleMiddleware("candidate"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Candidate",
    });
  }
);

// Recruiter Dashboard
router.get(
  "/recruiter-dashboard",
  authMiddleware,
  roleMiddleware("recruiter"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Recruiter",
    });
  }
);

// Admin Dashboard
router.get(
  "/admin-dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

module.exports = router;