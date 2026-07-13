const applicationRepository = require("../repositories/applicationRepository");

/**
 * Create Application
 */
const createApplication = async (applicationData) => {
  // Check if candidate has already applied for this job
  const existingApplication =
    await applicationRepository.getApplicationByCandidateAndJob(
      applicationData.candidate_id,
      applicationData.job_id
    );

  if (existingApplication) {
    throw new Error("You have already applied for this job.");
  }

  return await applicationRepository.createApplication(applicationData);
};

/**
 * Get Application By ID
 */
const getApplicationById = async (applicationId) => {
  const application = await applicationRepository.getApplicationById(
    applicationId
  );

  if (!application) {
    throw new Error("Application not found.");
  }

  return application;
};

/**
 * Get Applications By Candidate
 */
const getApplicationsByCandidate = async (candidateId) => {
  return await applicationRepository.getApplicationsByCandidate(candidateId);
};

/**
 * Get Applications By Job
 */
const getApplicationsByJob = async (jobId) => {
  return await applicationRepository.getApplicationsByJob(jobId);
};

/**
 * Update Application
 */
const updateApplication = async (applicationId, updateData) => {
  const application = await applicationRepository.getApplicationById(
    applicationId
  );

  if (!application) {
    throw new Error("Application not found.");
  }

  return await applicationRepository.updateApplication(
    applicationId,
    updateData
  );
};

/**
 * Update Application Status
 */
const updateApplicationStatus = async (applicationId, status) => {
  const application = await applicationRepository.getApplicationById(
    applicationId
  );

  if (!application) {
    throw new Error("Application not found.");
  }

  const validStatuses = [
    "Applied",
    "Shortlisted",
    "Interview Scheduled",
    "Rejected",
    "Selected",
    "Withdrawn",
  ];

  if (!validStatuses.includes(status)) {
    throw new Error("Invalid application status.");
  }

  return await applicationRepository.updateApplicationStatus(
    applicationId,
    status
  );
};

/**
 * Delete Application
 */
const deleteApplication = async (applicationId) => {
  const application = await applicationRepository.getApplicationById(
    applicationId
  );

  if (!application) {
    throw new Error("Application not found.");
  }

  return await applicationRepository.deleteApplication(applicationId);
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