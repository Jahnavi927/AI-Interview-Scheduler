const { extractTextFromPDF } = require("./utils/pdfParser");

(async () => {
  try {
    const text = await extractTextFromPDF("./uploads/resume.pdf");

    console.log(text);
  } catch (err) {
    console.error(err);
  }
})();