const candidateRepository = require("../repositories/candidateRepository");
const {
  uploadResume,
  getSignedResumeUrl,
} = require("../utils/supabaseStorage");

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

/**
 * Get Candidate Resume
 */
const getCandidateResume = async (userId) => {
  const candidate =
    await candidateRepository.getCandidateProfileByUserId(userId);

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  if (!candidate.resume_url) {
    throw new Error("Resume not found");
  }

  const signedUrl = await getSignedResumeUrl(candidate.resume_url);

  return {
    resumeUrl: signedUrl,
  };
};

module.exports = {
  getCandidateProfile,
  updateCandidateProfile,
  uploadCandidateResume,
  getCandidateResume,
};