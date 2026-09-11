require("dotenv").config();

const express = require("express");
const cors = require("cors");

const healthRouter = require("../routes/health");
const menuRouter = require("../routes/menu");
const citiesRouter = require("../routes/cities");
const ordersRouter = require("../routes/orders");
const { notFoundHandler, errorHandler } = require("../middleware/errorHandler");

const app = express();

/* ------------------------------------------------------------------ */
/*  Core middleware                                                    */
/* ------------------------------------------------------------------ */

// Allow the configured frontend origin(s), or "*" for local/demo use.
// Set FRONTEND_ORIGIN in your environment/Vercel project settings to a
// comma-separated list of allowed origins for production, e.g.
//   FRONTEND_ORIGIN=https://californiapizza.com.pk,https://staging.californiapizza.com.pk
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.includes("*") ? true : allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

/* ------------------------------------------------------------------ */
/*  Routes                                                             */
/* ------------------------------------------------------------------ */

app.get("/", (req, res) => {
  res.status(200).json({
    service: "california-pizza-api",
    message: "API is running. See /api/health for status.",
    endpoints: [
      "GET  /api/health",
      "GET  /api/menu",
      "GET  /api/menu/:id",
      "GET  /api/cities",
      "GET  /api/cities/:id",
      "POST /api/orders",
    ],
  });
});

app.use("/api/health", healthRouter);
app.use("/api/menu", menuRouter);
app.use("/api/cities", citiesRouter);
app.use("/api/orders", ordersRouter);

/* ------------------------------------------------------------------ */
/*  404 + error handling (must be registered last)                     */
/* ------------------------------------------------------------------ */
app.use(notFoundHandler);
app.use(errorHandler);

/* ------------------------------------------------------------------ */
/*  Local development server                                           */
/*  Vercel imports `app` directly and handles the HTTP server itself,  */
/*  so this only runs when the file is executed directly (npm start/dev)*/
/* ------------------------------------------------------------------ */
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`California Pizza API listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
