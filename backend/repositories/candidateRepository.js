const supabase = require("../config/supabase");

/**
 * Get Candidate Profile
 */
const getCandidateProfileByUserId = async (userId) => {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Update Candidate Profile
 */
const updateCandidateProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from("candidates")
    .update({
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

module.exports = {
  getCandidateProfileByUserId,
  updateCandidateProfile,
};