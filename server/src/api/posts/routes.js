import { Router } from "express";
import { handleGeneratePost } from "./controller.js";

const router = Router();

/**
 * POST /api/posts/generate
 * 
 * Body: { prompt: string }
 * Returns: { result: string }
 * 
 * Generates a LinkedIn post using the provided prompt.
 * The server securely handles the API key.
 */
router.post("/generate", handleGeneratePost);

export default router;
