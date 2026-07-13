const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getCandidateProfile,
  updateCandidateProfile,
  uploadCandidateResume,
  getCandidateResume,
  testGemini,
} = require("../controllers/candidateController");

// ==================================
// Candidate Routes
// ==================================

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

// Get Resume (Signed URL)
router.get(
  "/resume",
  authMiddleware,
  roleMiddleware("candidate"),
  getCandidateResume
);

// Test Gemini AI (Temporary Route)
router.post(
  "/test-ai",
  authMiddleware,
  roleMiddleware("candidate"),
  testGemini
);

module.exports = router;