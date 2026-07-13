const applicationService = require("../services/applicationService");

/**
 * Create Application
 */
const createApplication = async (req, res) => {
  try {
    const application = await applicationService.createApplication(req.body);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Application By ID
 */
const getApplicationById = async (req, res) => {
  try {
    const application = await applicationService.getApplicationById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Application fetched successfully.",
      data: application,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Applications By Candidate
 */
const getApplicationsByCandidate = async (req, res) => {
  try {
    const applications =
      await applicationService.getApplicationsByCandidate(
        req.params.candidateId
      );

    res.status(200).json({
      success: true,
      message: "Applications fetched successfully.",
      data: applications,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Applications By Job
 */
const getApplicationsByJob = async (req, res) => {
  try {
    const applications = await applicationService.getApplicationsByJob(
      req.params.jobId
    );

    res.status(200).json({
      success: true,
      message: "Applications fetched successfully.",
      data: applications,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Application
 */
const updateApplication = async (req, res) => {
  try {
    const application = await applicationService.updateApplication(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Application updated successfully.",
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Application Status
 */
const updateApplicationStatus = async (req, res) => {
  try {
    const application =
      await applicationService.updateApplicationStatus(
        req.params.id,
        req.body.status
      );

    res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Application
 */
const deleteApplication = async (req, res) => {
  try {
    await applicationService.deleteApplication(req.params.id);

    res.status(200).json({
      success: true,
      message: "Application deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createApplication,
  getApplicationById,
  getApplicationsByCandidate,
  getApplicationsByJob,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
};