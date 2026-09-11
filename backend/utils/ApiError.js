/**
 * Lightweight structured error so route handlers can `throw new ApiError(...)`
 * and have the central error-handling middleware return consistent JSON.
 */
class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace?.(this, ApiError);
  }
}

module.exports = { ApiError };
