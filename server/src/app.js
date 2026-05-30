import express from "express";
import cors from "cors";
import "dotenv/config";

import { validateEnv } from "./config/env.js";
import { rateLimit } from "./middleware/rateLimit.js";
import { errorHandler, notFoundHandler } from "./utils/errorHandler.js";
import postsRoutes from "./api/posts/routes.js";

const env = validateEnv();
const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: env.clientOrigin }));
app.use(express.json({ limit: "10mb" }));
app.use(rateLimit);

// ── Health Check ──────────────────────────────────────────────
app.get("/api/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Routes ────────────────────────────────────────────────────
app.use("/api/posts", postsRoutes);

// ── Legacy Route Support ──────────────────────────────────────
// Alias: /api/generate → /api/posts/generate for backward compatibility
app.use("/api", postsRoutes);

// ── Error Handling ────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
