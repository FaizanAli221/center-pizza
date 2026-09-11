const express = require("express");
const router = express.Router();

/**
 * GET /api/health
 * Simple liveness/readiness probe. Useful for uptime monitors and
 * for confirming the Vercel deployment is serving the latest build.
 */
router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "california-pizza-api",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    uptimeSeconds: process.uptime(),
  });
});

module.exports = router;
