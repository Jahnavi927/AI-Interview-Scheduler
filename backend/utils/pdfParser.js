const pdf = require("pdf-parse");

/**
 * Extract text from PDF Buffer
 * @param {Buffer} pdfBuffer
 * @returns {Promise<string>}
 */
const extractTextFromPDF = async (pdfBuffer) => {
  try {
    console.log("Buffer Length:", pdfBuffer.length);

    const data = await pdf(pdfBuffer);

    console.log("Pages:", data.numpages);
    console.log("Text Length:", data.text.length);

    return data.text.trim();
  } catch (error) {
    console.error("PDF Parse Error:");
    console.error(error);

    throw new Error("Failed to extract text from PDF.");
  }
};

module.exports = {
  extractTextFromPDF,
};