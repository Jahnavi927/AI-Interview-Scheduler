const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const applicationController = require("../controllers/applicationController");

/**
 * Candidate applies for a job
 */
router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("candidate"),
  applicationController.createApplication
);

/**
 * Get application by ID
 */
router.get(
  "/:id",
  authMiddleware,
  applicationController.getApplicationById
);

/**
 * Get all applications of a candidate
 */
router.get(
  "/candidate/:candidateId",
  authMiddleware,
  applicationController.getApplicationsByCandidate
);

/**
 * Get all applications for a job
 */
router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware("recruiter", "admin"),
  applicationController.getApplicationsByJob
);

/**
 * Update application
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("candidate"),
  applicationController.updateApplication
);

/**
 * Update application status
 */
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("recruiter", "admin"),
  applicationController.updateApplicationStatus
);

/**
 * Delete application
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("candidate", "admin"),
  applicationController.deleteApplication
);

module.exports = router;