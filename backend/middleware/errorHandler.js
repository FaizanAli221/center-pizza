const { ApiError } = require("../utils/ApiError");

/**
 * 404 handler — reached when no route matched.
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.originalUrl} does not exist.`,
  });
}

/**
 * Centralized error handler. Any route using asyncHandler (or any
 * synchronous throw) that raises an ApiError — or any other Error —
 * ends up here with a consistent JSON shape.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details || undefined,
    });
  }

  // Malformed JSON body from express.json()
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "Invalid JSON",
      message: "The request body could not be parsed as JSON.",
    });
  }

  console.error("Unhandled API error:", err);
  return res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong while processing your request.",
  });
}

module.exports = { notFoundHandler, errorHandler };
