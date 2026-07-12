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
/**
 * Update Candidate Profile
 */
const updateCandidateProfile = async (userId, profileData) => {
  // Check if profile exists
  const candidate = await candidateRepository.getCandidateProfileByUserId(userId);

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  const updatedCandidate =
    await candidateRepository.updateCandidateProfile(userId, profileData);

  return updatedCandidate;
};
module.exports = {
  getCandidateProfile,
  updateCandidateProfile,
};