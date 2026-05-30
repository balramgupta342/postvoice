/**
 * Simple in-memory rate limiter.
 * Allows MAX_REQUESTS per IP within WINDOW_MS.
 * No external dependencies needed.
 */

const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 1000; // 1 minute

const requestLog = new Map(); // ip -> [timestamps]

export function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || "unknown";
  const now = Date.now();

  const timestamps = (requestLog.get(ip) || []).filter(
    (t) => now - t < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too many requests. Please wait a minute before trying again.",
    });
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  next();
}
