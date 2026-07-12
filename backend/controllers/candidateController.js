const candidateService = require("../services/candidateService");

/**
 * @desc    Get Candidate Profile
 * @route   GET /api/candidate/profile
 * @access  Private (Candidate)
 */
const getCandidateProfile = async (req, res) => {
  try {
    // req.user is added by authMiddleware after verifying JWT
    const userId = req.user.id;

    const candidate = await candidateService.getCandidateProfile(userId);

    return res.status(200).json({
      success: true,
      message: "Candidate profile fetched successfully.",
      data: candidate,
    });
  } catch (error) {
    if (error.message === "Candidate profile not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Get Candidate Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
/**
 * @desc    Update Candidate Profile
 * @route   PUT /api/candidate/profile
 * @access  Private (Candidate)
 */
const updateCandidateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedCandidate =
      await candidateService.updateCandidateProfile(userId, req.body);

    return res.status(200).json({
      success: true,
      message: "Candidate profile updated successfully.",
      data: updatedCandidate,
    });
  } catch (error) {
    if (error.message === "Candidate profile not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Update Candidate Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
/**
 * @desc    Upload Candidate Resume
 * @route   POST /api/candidate/resume
 * @access  Private (Candidate)
 */
const uploadCandidateResume = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    const updatedCandidate =
      await candidateService.uploadCandidateResume(userId, req.file);

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully.",
      data: updatedCandidate,
    });
  } catch (error) {
    console.error("Upload Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getCandidateProfile,
  updateCandidateProfile,
  uploadCandidateResume,
};