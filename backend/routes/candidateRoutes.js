const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getCandidateProfile,
  updateCandidateProfile,
  uploadCandidateResume,
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

// Update Candidate Profile
router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("candidate"),
  updateCandidateProfile
);

// Upload Resume
router.post(
  "/resume",
  authMiddleware,
  roleMiddleware("candidate"),
  upload.single("resume"),
  uploadCandidateResume
);

module.exports = router;