const supabase = require("../config/supabase");

// Find user by email
const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data;
};

// Create new user
const createUser = async (userData) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
// Create candidate profile
const createCandidateProfile = async (userId) => {
  const { data, error } = await supabase
    .from("candidates")
    .insert([
      {
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
module.exports = {
  findUserByEmail,
  createUser,
  createCandidateProfile,
};