const candidateRepository = require("../repositories/candidateRepository");
const { uploadResume } = require("../utils/supabaseStorage");

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
  const candidate = await candidateRepository.getCandidateProfileByUserId(userId);

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  return await candidateRepository.updateCandidateProfile(userId, profileData);
};

/**
 * Upload Candidate Resume
 */
const uploadCandidateResume = async (userId, file) => {
  // Check if candidate exists
  const candidate = await candidateRepository.getCandidateProfileByUserId(userId);

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  // Upload PDF to Supabase Storage
  const filePath = await uploadResume(file, userId);

  // Save file path in database
  const updatedCandidate = await candidateRepository.updateCandidateResume(
    userId,
    filePath
  );

  return updatedCandidate;
};

module.exports = {
  getCandidateProfile,
  updateCandidateProfile,
  uploadCandidateResume,
};