const recruiterService = require("../services/recruiterService");

/**
 * @desc    Get All Candidates
 * @route   GET /api/recruiter/candidates
 * @access  Private (Recruiter)
 */
const getAllCandidates = async (req, res) => {
  try {
    const candidates = await recruiterService.getAllCandidates();

    return res.status(200).json({
      success: true,
      message: "Candidates fetched successfully.",
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    console.error("Get Candidates Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc Get Candidate Details
 * @route GET /api/recruiter/candidate/:id
 * @access Recruiter
 */
const getCandidateById = async (req, res) => {
  try {
    const candidate = await recruiterService.getCandidateById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Candidate fetched successfully.",
      data: candidate,
    });
  } catch (error) {
    console.error("Get Candidate Error:", error);

    if (error.message === "Candidate not found.") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllCandidates,
  getCandidateById,
};