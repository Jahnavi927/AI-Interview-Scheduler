const supabase = require("../config/supabase");

/**
 * Get All Candidates
 */
const getAllCandidates = async () => {
  // Fetch candidates
  const { data: candidates, error: candidateError } = await supabase
    .from("candidates")
    .select(`
      id,
      full_name,
      college,
      degree,
      branch,
      graduation_year,
      skills,
      status,
      user_id,
      users (
        email
      )
    `)
    .order("created_at", { ascending: false });

  if (candidateError) {
    throw candidateError;
  }

  // Fetch all resume analyses
  const { data: analyses, error: analysisError } = await supabase
    .from("resume_analysis")
    .select(`
      candidate_id,
      resume_score,
      recommended_role
    `);

  if (analysisError) {
    throw analysisError;
  }

  // Create a lookup map
  const analysisMap = {};

  analyses.forEach((analysis) => {
    analysisMap[analysis.candidate_id] = analysis;
  });

  // Merge candidates with analysis
  return candidates.map((candidate) => ({
    ...candidate,
    resume_analysis: analysisMap[candidate.id]
      ? [analysisMap[candidate.id]]
      : [],
  }));
};

/**
 * Get Candidate By ID
 */
const getCandidateById = async (candidateId) => {
  // Candidate Details
  const { data: candidate, error: candidateError } = await supabase
    .from("candidates")
    .select(`
      *,
      users (
        name,
        email
      )
    `)
    .eq("id", candidateId)
    .maybeSingle();

  if (candidateError) {
    throw candidateError;
  }

  if (!candidate) {
    return null;
  }

  // Resume Analysis
  const { data: analysis, error: analysisError } = await supabase
    .from("resume_analysis")
    .select("*")
    .eq("candidate_id", candidate.id)
    .maybeSingle();

  if (analysisError) {
    throw analysisError;
  }

  return {
    ...candidate,
    resume_analysis: analysis ? [analysis] : [],
  };
};

module.exports = {
  getAllCandidates,
  getCandidateById,
};