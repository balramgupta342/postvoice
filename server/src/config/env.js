/**
 * Environment configuration
 * Loads .env from project root and validates required variables
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from project root (3 levels up from src/config/)
const rootEnvPath = path.resolve(__dirname, "../../../.env");
if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}

export function validateEnv() {
  const required = ["VITE_GEMINI_API_KEY"];
  const missing = required.filter((env) => !process.env[env]);

  if (missing.length > 0) {
    console.warn(`⚠️  Missing environment variables: ${missing.join(", ")}`);
  }

  return {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || "development",
    apiKey: process.env.VITE_GEMINI_API_KEY,
    clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  };
}
