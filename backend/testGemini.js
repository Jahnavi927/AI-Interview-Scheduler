require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

async function test() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: "Say hello to Jahnavi in exactly one sentence.",
    });

    console.log(response.text);
  } catch (err) {
    console.error(err);
  }
}

test();