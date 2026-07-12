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

module.exports = {
  getCandidateProfile,
};