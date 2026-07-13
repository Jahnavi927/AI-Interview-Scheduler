const recruiterRepository = require("../repositories/recruiterRepository");

/**
 * Get All Candidates
 */
const getAllCandidates = async () => {
  const candidates = await recruiterRepository.getAllCandidates();

  return candidates.map((candidate) => ({
    id: candidate.id,
    full_name: candidate.full_name,
    college: candidate.college,
    degree: candidate.degree,
    branch: candidate.branch,
    graduation_year: candidate.graduation_year,
    skills: candidate.skills,
    status: candidate.status,
    email: candidate.users?.email || null,
    resume_score:
      candidate.resume_analysis?.[0]?.resume_score ?? null,
    recommended_role:
      candidate.resume_analysis?.[0]?.recommended_role ?? null,
  }));
};

/**
 * Get Candidate By ID
 */
const getCandidateById = async (candidateId) => {
  const candidate = await recruiterRepository.getCandidateById(candidateId);

  if (!candidate) {
    throw new Error("Candidate not found.");
  }

  return {
    id: candidate.id,
    full_name: candidate.full_name,
    phone: candidate.phone,
    college: candidate.college,
    degree: candidate.degree,
    branch: candidate.branch,
    graduation_year: candidate.graduation_year,
    experience: candidate.experience,
    skills: candidate.skills,
    status: candidate.status,

    user: {
      name: candidate.users?.name || null,
      email: candidate.users?.email || null,
    },

    analysis: candidate.resume_analysis?.[0] || null,
  };
};


module.exports = {
  getAllCandidates,
  getCandidateById,
};