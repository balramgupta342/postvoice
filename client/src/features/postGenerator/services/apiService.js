const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

/**
 * Sends a prompt to the server to generate a LinkedIn post using Claude.
 * The server handles the API key securely.
 * 
 * @param {string} prompt - The prompt built from user inputs
 * @returns {Promise<string>} The generated post text
 * @throws {Error} If the API call fails
 */
export async function generateWithClaude(prompt) {
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Invalid prompt provided");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `API error: ${response.status}`);
    }

    const data = await response.json();
    const result = data.result?.trim();

    if (!result) {
      throw new Error("Empty response from API. Please try again.");
    }

    return result;
  } catch (error) {
    console.error("Generate error:", error);
    throw new Error(
      error.message || "Failed to generate post. Please check your connection and try again."
    );
  }
}
