const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log("Gemini API Key Loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");
const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes"); // NEW
const aiRoutes = require("./routes/aiRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes); // NEW
app.use("/api/ai", aiRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 AI Interview Scheduler API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});