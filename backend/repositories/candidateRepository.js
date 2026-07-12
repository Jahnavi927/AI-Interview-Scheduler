const supabase = require("../config/supabase");

/**
 * Get candidate profile using authenticated user's ID
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

module.exports = {
  getCandidateProfileByUserId,
};