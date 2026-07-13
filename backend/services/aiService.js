const ai = require("../utils/gemini");

const {
  downloadResume,
} = require("../utils/supabaseStorage");

const {
  extractTextFromPDF,
} = require("../utils/pdfParser");

const candidateRepository = require("../repositories/candidateRepository");

const aiRepository = require("../repositories/aiRepository");

const {
  resumeAnalysisPrompt,
} = require("../ai/prompts");

const cleanJson = (text) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};
/**
 * Analyze Resume - Phase 1
 * Get Candidate -> Download Resume -> Extract PDF Text
 */
const analyzeResume = async (userId) => {
  // Get candidate profile
  const candidate = await candidateRepository.getCandidateProfileByUserId(userId);

  if (!candidate) {
    throw new Error("Candidate profile not found.");
  }

  // Check resume exists
  if (!candidate.resume_url) {
    throw new Error("Resume not uploaded.");
  }

  // Download resume from Supabase Storage
  const resumeBuffer = await downloadResume(candidate.resume_url);

  // Extract text from PDF
  const resumeText = await extractTextFromPDF(resumeBuffer);

  if (!resumeText?.trim()) {
     throw new Error("Unable to extract text from resume.");
}
  // Phase 1: Return extracted text only
  return {
    candidateId: candidate.id,
    resumePath: candidate.resume_url,
    extractedText: resumeText,
  };
};

module.exports = {
  analyzeResume,
};