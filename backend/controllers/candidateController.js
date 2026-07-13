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

/**
 * @desc    Get Candidate Resume
 * @route   GET /api/candidate/resume
 * @access  Private (Candidate)
 */
const getCandidateResume = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await candidateService.getCandidateResume(userId);

    return res.status(200).json({
      success: true,
      message: "Resume URL generated successfully.",
      data,
    });
  } catch (error) {
    console.error("Get Resume Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const ai = require("../utils/gemini");

/**
 * @desc Test Gemini
 * @route POST /api/candidate/test-ai
 */
const testGemini = async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: "Say hello to Jahnavi in one sentence.",
});

console.log(response.text);

    return res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCandidateProfile,
  updateCandidateProfile,
  uploadCandidateResume,
  getCandidateResume,
  testGemini,
};