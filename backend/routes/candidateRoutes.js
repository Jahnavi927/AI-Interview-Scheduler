const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getCandidateProfile,
} = require("../controllers/candidateController");

// ===============================
// Candidate Routes
// ===============================

// Get Candidate Profile
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("candidate"),
  getCandidateProfile
);

module.exports = router;