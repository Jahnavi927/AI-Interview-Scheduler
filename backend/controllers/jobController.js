const jobService = require("../services/jobService");

/**
 * @desc    Create Job
 * @route   POST /api/jobs
 * @access  Private (Recruiter)
 */
const createJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const job = await jobService.createJob(recruiterId, req.body);

    return res.status(201).json({
      success: true,
      message: "Job created successfully.",
      data: job,
    });
  } catch (error) {
    console.error("Create Job Error:", error);

    if (
      error.message === "Job title and description are required" ||
      error.message === "Invalid employment type" ||
      error.message === "Minimum salary cannot exceed maximum salary" ||
      error.message === "Experience cannot be negative"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Get All Jobs
 * @route   GET /api/jobs
 * @access  Private (Recruiter)
 */
const getAllJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const jobs = await jobService.getAllJobs(recruiterId);

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully.",
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Get Jobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Get Job By ID
 * @route   GET /api/jobs/:id
 * @access  Private (Recruiter)
 */
const getJobById = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const job = await jobService.getJobById(
    req.params.id,
    recruiterId
);
    return res.status(200).json({
      success: true,
      message: "Job fetched successfully.",
      data: job,
    });
  } catch (error) {
    console.error("Get Job Error:", error);

    if (error.message === "Job not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    if (error.message === "You are not authorized to perform this action.") {
  return res.status(403).json({
    success: false,
    message: error.message,
  });
}

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Update Job
 * @route   PUT /api/jobs/:id
 * @access  Private (Recruiter)
 */
const updateJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const updatedJob = await jobService.updateJob(
      req.params.id,
      recruiterId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      data: updatedJob,
    });
  } catch (error) {
    console.error("Update Job Error:", error);

    if (error.message === "Job not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "You are not authorized to perform this action.") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Close Job
 * @route   DELETE /api/jobs/:id
 * @access  Private (Recruiter)
 */
const closeJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const closedJob = await jobService.closeJob(
      req.params.id,
      recruiterId
    );

    return res.status(200).json({
      success: true,
      message: "Job closed successfully.",
      data: closedJob,
    });
  } catch (error) {
    console.error("Close Job Error:", error);

    if (error.message === "Job not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "You are not authorized to perform this action.") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  closeJob,
};