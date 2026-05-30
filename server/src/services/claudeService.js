import { validatePrompt } from "../../../shared/validators/postValidator.js";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";
const MODEL = "gemini-2.5-flash";

/**
 * Generates a LinkedIn post using Google Gemini API.
 * API key is securely handled server-side.
 * 
 * @param {string} prompt - The prompt for Gemini
 * @returns {Promise<string>} The generated post text
 * @throws {Error} If generation fails
 */
export async function generatePost(prompt) {
  if (!validatePrompt(prompt)) {
    throw new Error("Invalid prompt provided");
  }

  const apiKey = process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key not configured. Set VITE_GEMINI_API_KEY in .env");
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      throw new Error("AI service error. Please try again.");
    }

    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!result) {
      throw new Error("Empty response from AI service");
    }

    return result;
  } catch (error) {
    console.error("Gemini service error:", error);
    throw error;
  }
}
