const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  closeJob,
} = require("../controllers/jobController");

/**
 * @route POST /api/jobs
 * @access Recruiter
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("recruiter"),
  createJob
);

/**
 * @route GET /api/jobs
 * @access Recruiter
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("recruiter"),
  getAllJobs
);

/**
 * @route GET /api/jobs/:id
 * @access Recruiter
 */
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  getJobById
);

/**
 * @route PUT /api/jobs/:id
 * @access Recruiter
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateJob
);

/**
 * @route DELETE /api/jobs/:id
 * @access Recruiter
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  closeJob
);

module.exports = router;