/**
 * Custom error handler for Express
 */
export function errorHandler(err, req, res, next) {
  console.error("Unhandled error:", err);

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { details: err.stack }),
  });
}

/**
 * 404 handler
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: `Route not found: ${req.method} ${req.path}`,
  });
}
