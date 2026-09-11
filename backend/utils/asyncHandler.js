/**
 * Wraps an async Express route handler and forwards any thrown error
 * to next(), so a single centralized error-handling middleware can
 * turn it into a clean JSON response.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { asyncHandler };
