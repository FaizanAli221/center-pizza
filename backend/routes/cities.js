const express = require("express");
const router = express.Router();
const menuData = require("../data/menu.json");

/**
 * GET /api/cities
 * Returns every city (with its branches) available for delivery/pickup.
 *
 * GET /api/cities/:id
 * Returns a single city by id (e.g. "khi"), or 404 if not found.
 */
router.get("/:id", (req, res) => {
  const city = menuData.cities.find(
    (c) => c.id.toLowerCase() === req.params.id.toLowerCase()
  );
  if (!city) {
    return res.status(404).json({
      error: "Not Found",
      message: `No city found with id "${req.params.id}"`,
    });
  }
  res.status(200).json({ city });
});

router.get("/", (req, res) => {
  res.status(200).json({
    count: menuData.cities.length,
    cities: menuData.cities,
  });
});

module.exports = router;
