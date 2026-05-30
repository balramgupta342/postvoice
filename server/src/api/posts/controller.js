import { generatePost } from "../../services/claudeService.js";
import { validatePrompt } from "../../../../shared/validators/postValidator.js";

/**
 * Handles the POST /api/generate request
 * Validates input and calls the Claude service
 * 
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
export async function handleGeneratePost(req, res) {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "A valid prompt is required" });
    }

    if (!validatePrompt(prompt)) {
      return res.status(400).json({ error: "Prompt is too short or invalid" });
    }

    // Call Claude service
    const result = await generatePost(prompt);

    return res.json({ result });
  } catch (error) {
    console.error("Generate controller error:", error);

    // Handle specific error types
    if (error.message.includes("API key")) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    if (error.message.includes("AI service")) {
      return res.status(502).json({ error: "AI service error. Please try again." });
    }

    return res.status(500).json({
      error: error.message || "Something went wrong. Please try again.",
    });
  }
}
