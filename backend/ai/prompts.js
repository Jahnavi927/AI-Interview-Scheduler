const resumeAnalysisPrompt = (resumeText) => `
You are an expert ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT explain anything.

Return EXACTLY this schema:

{
  "summary":"",
  "technicalSkills":[],
  "softSkills":[],
  "experience":[],
  "education":[],
  "projects":[],
  "certifications":[],
  "resumeScore":0,
  "missingSkills":[],
  "strengths":[],
  "weaknesses":[],
  "recommendedRole":"",
  "interviewQuestions":{
      "technical":[],
      "behavioral":[],
      "project":[],
      "hr":[]
  }
}

Resume:

${resumeText}
`;

module.exports = {
  resumeAnalysisPrompt,
};