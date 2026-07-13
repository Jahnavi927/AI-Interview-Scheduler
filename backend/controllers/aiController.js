const aiService = require("../services/aiService");

/**
 * @desc Analyze Resume (Phase 1)
 * @route POST /api/ai/analyze-resume
 * @access Private (Candidate)
 */
const analyzeResume = async (req, res) => {
  try {
    const result = await aiService.analyzeResume(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Resume text extracted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Analyze Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};