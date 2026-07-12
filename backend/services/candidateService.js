const candidateRepository = require("../repositories/candidateRepository");

/**
 * Get Candidate Profile
 */
const getCandidateProfile = async (userId) => {
  const candidate = await candidateRepository.getCandidateProfileByUserId(userId);

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  return candidate;
};

module.exports = {
  getCandidateProfile,
};