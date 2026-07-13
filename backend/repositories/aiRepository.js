const supabase = require("../config/supabase");

/**
 * Save Resume Analysis
 */
const saveResumeAnalysis = async (analysisData) => {
  const { data, error } = await supabase
    .from("resume_analysis")
    .insert([analysisData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Get Resume Analysis by Candidate ID
 */
const getResumeAnalysisByCandidateId = async (candidateId) => {
  const { data, error } = await supabase
    .from("resume_analysis")
    .select("*")
    .eq("candidate_id", candidateId)
    .order("created_at", { ascending: false })
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

module.exports = {
  saveResumeAnalysis,
  getResumeAnalysisByCandidateId,
};