const supabase = require("../config/supabase");

/**
 * Create Job
 */
const createJob = async (jobData) => {
  const { data, error } = await supabase
    .from("jobs")
    .insert(jobData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Get All Jobs By Recruiter
 */
const getAllJobsByRecruiter = async (recruiterId) => {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("recruiter_id", recruiterId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Get Job By ID
 */
const getJobById = async (jobId) => {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Update Job
 */
const updateJob = async (jobId, updateData) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Close Job (Soft Delete)
 */
const closeJob = async (jobId) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      status: "Closed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

module.exports = {
  createJob,
  getAllJobsByRecruiter,
  getJobById,
  updateJob,
  closeJob,
};