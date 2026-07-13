const supabase = require("../config/supabase");

/**
 * Create Application
 */
const createApplication = async (applicationData) => {
  const { data, error } = await supabase
    .from("applications")
    .insert([applicationData])
    .select()
    .single();

  if (error) throw error;

  return data;
};

/**
 * Get Application By ID
 */
const getApplicationById = async (applicationId) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", applicationId)
    .single();

  if (error && error.code !== "PGRST116") throw error;

  return data;
};

/**
 * Check Existing Application
 */
const getApplicationByCandidateAndJob = async (candidateId, jobId) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("candidate_id", candidateId)
    .eq("job_id", jobId)
    .maybeSingle();

  if (error) throw error;

  return data;
};

/**
 * Get Applications By Candidate
 */
const getApplicationsByCandidate = async (candidateId) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("candidate_id", candidateId)
    .order("applied_at", { ascending: false });

  if (error) throw error;

  return data;
};

/**
 * Get Applications By Job
 */
const getApplicationsByJob = async (jobId) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("job_id", jobId)
    .order("applied_at", { ascending: false });

  if (error) throw error;

  return data;
};

/**
 * Update Application
 */
const updateApplication = async (applicationId, updateData) => {
  const { data, error } = await supabase
    .from("applications")
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

/**
 * Update Application Status
 */
const updateApplicationStatus = async (applicationId, status) => {
  const { data, error } = await supabase
    .from("applications")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

/**
 * Delete Application
 */
const deleteApplication = async (applicationId) => {
  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", applicationId);

  if (error) throw error;

  return true;
};

module.exports = {
  createApplication,
  getApplicationById,
  getApplicationByCandidateAndJob,
  getApplicationsByCandidate,
  getApplicationsByJob,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
};