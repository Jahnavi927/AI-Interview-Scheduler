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

/**
 * Remove markdown from Gemini response before parsing JSON
 */
const cleanJson = (text) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

/**
 * Analyze Resume
 */
const analyzeResume = async (userId) => {
  // Get candidate
  const candidate =
    await candidateRepository.getCandidateProfileByUserId(userId);

  if (!candidate) {
    throw new Error("Candidate profile not found.");
  }

  // Check resume
  if (!candidate.resume_url) {
    throw new Error("Resume not uploaded.");
  }

  // Download resume
  const resumeBuffer = await downloadResume(candidate.resume_url);

  // Extract PDF text
  const resumeText = await extractTextFromPDF(resumeBuffer);

  if (!resumeText?.trim()) {
    throw new Error("Unable to extract text from resume.");
  }

  // Build Gemini prompt
  const prompt = resumeAnalysisPrompt(resumeText);

  // Call Gemini
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  // Parse JSON
  const analysis = JSON.parse(cleanJson(response.text));

  // Save to database
  const savedAnalysis = await aiRepository.saveResumeAnalysis({
    candidate_id: candidate.id,

    summary: analysis.summary,

    technical_skills: analysis.technicalSkills,

    soft_skills: analysis.softSkills,

    experience: analysis.experience,

    education: analysis.education,

    projects: analysis.projects,

    certifications: analysis.certifications,

    resume_score: analysis.resumeScore,

    missing_skills: analysis.missingSkills,

    strengths: analysis.strengths,

    weaknesses: analysis.weaknesses,

    recommended_role: analysis.recommendedRole,

    interview_questions: analysis.interviewQuestions,
  });

  return savedAnalysis;
};

/**
 * Get Resume Analysis
 */
const getResumeAnalysis = async (userId) => {
  const candidate =
    await candidateRepository.getCandidateProfileByUserId(userId);

  if (!candidate) {
    throw new Error("Candidate profile not found.");
  }

  const analysis =
    await aiRepository.getResumeAnalysis(candidate.id);

  if (!analysis) {
    throw new Error("Resume analysis not found.");
  }

  return analysis;
};

module.exports = {
  analyzeResume,
  getResumeAnalysis,
};