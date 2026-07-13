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

const getResumeAnalysis = async (req, res) => {
  try {
    const analysis = await aiService.getResumeAnalysis(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Resume analysis fetched successfully.",
      data: analysis,
    });
  } catch (error) {
    console.error("Get Resume Analysis Error:", error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
  getResumeAnalysis,
};