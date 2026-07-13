const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  analyzeResume,
  getResumeAnalysis,
} = require("../controllers/aiController");
router.post(
  "/analyze-resume",
  authMiddleware,
  roleMiddleware("candidate"),
  analyzeResume
);

router.get(
  "/analysis",
  authMiddleware,
  roleMiddleware("candidate"),
  getResumeAnalysis
);

module.exports = router;