const jobRepository = require("../repositories/jobRepository");

/**
 * Create Job
 */
const createJob = async (recruiterId, jobData) => {
  // Required fields
  if (!jobData.title || !jobData.description) {
    throw new Error("Job title and description are required");
  }

  // Employment Type Validation
  const validEmploymentTypes = [
    "Full-Time",
    "Part-Time",
    "Internship",
    "Contract",
  ];

  if (
    jobData.employment_type &&
    !validEmploymentTypes.includes(jobData.employment_type)
  ) {
    throw new Error("Invalid employment type");
  }

  // Salary Validation
  if (
    jobData.salary_min !== undefined &&
    jobData.salary_max !== undefined &&
    Number(jobData.salary_min) > Number(jobData.salary_max)
  ) {
    throw new Error("Minimum salary cannot exceed maximum salary");
  }

  // Experience Validation
  if (
    jobData.experience_required !== undefined &&
    Number(jobData.experience_required) < 0
  ) {
    throw new Error("Experience cannot be negative");
  }

  // Required Skills Validation
  let requiredSkills = [];

  if (Array.isArray(jobData.required_skills)) {
    requiredSkills = jobData.required_skills;
  }

  const newJob = {
    recruiter_id: recruiterId,
    title: jobData.title,
    department: jobData.department || null,
    location: jobData.location || null,
    employment_type: jobData.employment_type || null,
    experience_required: jobData.experience_required ?? 0,
    salary_min: jobData.salary_min ?? null,
    salary_max: jobData.salary_max ?? null,
    description: jobData.description,
    required_skills: requiredSkills,
    status: "Open",
  };

  return await jobRepository.createJob(newJob);
};

/**
 * Get All Jobs
 */
const getAllJobs = async (recruiterId) => {
  return await jobRepository.getAllJobsByRecruiter(recruiterId);
};

/**
 * Get Job By ID
 */
const getJobById = async (jobId, recruiterId) => {
  const job = await jobRepository.getJobById(jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  // Ownership Check
  if (job.recruiter_id !== recruiterId) {
    throw new Error("You are not authorized to perform this action.");
  }

  return job;
};

/**
 * Update Job
 */
const updateJob = async (jobId, recruiterId, updateData) => {
  const job = await jobRepository.getJobById(jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  // Ownership Check
  if (job.recruiter_id !== recruiterId) {
    throw new Error("You are not authorized to perform this action.");
  }

  return await jobRepository.updateJob(jobId, updateData);
};

/**
 * Close Job (Soft Delete)
 */
const closeJob = async (jobId, recruiterId) => {
  const job = await jobRepository.getJobById(jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  // Ownership Check
  if (job.recruiter_id !== recruiterId) {
    throw new Error("You are not authorized to perform this action.");
  }

  return await jobRepository.closeJob(jobId);
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  closeJob,
};