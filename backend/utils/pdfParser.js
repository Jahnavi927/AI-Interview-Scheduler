const fs = require("fs");
const pdf = require("pdf-parse");

/**
 * Extract text from a PDF file.
 * @param {string} filePath - Absolute or relative path to the PDF file.
 * @returns {Promise<string>} Extracted text
 */
const extractTextFromPDF = async (filePath) => {
  try {
    // Read PDF file
    const dataBuffer = fs.readFileSync(filePath);

    // Parse PDF
    const data = await pdf(dataBuffer);

    // Return extracted text
    return data.text.trim();
  } catch (error) {
    console.error("PDF Parsing Error:", error.message);
    throw new Error("Failed to extract text from PDF.");
  }
};

module.exports = {
  extractTextFromPDF,
};