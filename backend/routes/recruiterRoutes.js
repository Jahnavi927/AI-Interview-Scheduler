const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getAllCandidates,
  getCandidateById,
} = require("../controllers/recruiterController");

/**
 * @route GET /api/recruiter/candidates
 * @access Recruiter
 */
router.get(
  "/candidates",
  authMiddleware,
  roleMiddleware("recruiter"),
  getAllCandidates
);

router.get(
  "/candidate/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  getCandidateById
);


module.exports = router;