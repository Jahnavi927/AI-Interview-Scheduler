const supabase = require("../config/supabase");

/**
 * Save Resume Analysis
 */
const saveResumeAnalysis = async (analysisData) => {
  const { data, error } = await supabase
    .from("resume_analysis")
    .upsert(
      {
        ...analysisData,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "candidate_id",
      }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Get Resume Analysis
 */
const getResumeAnalysis = async (candidateId) => {
  const { data, error } = await supabase
    .from("resume_analysis")
    .select("*")
    .eq("candidate_id", candidateId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

module.exports = {
  saveResumeAnalysis,
  getResumeAnalysis,
};