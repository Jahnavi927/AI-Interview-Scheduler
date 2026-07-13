const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  analyzeResume,
} = require("../controllers/aiController");

router.post(
  "/analyze-resume",
  authMiddleware,
  roleMiddleware("candidate"),
  analyzeResume
);

module.exports = router;