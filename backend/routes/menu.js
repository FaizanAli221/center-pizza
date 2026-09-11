const express = require("express");
const router = express.Router();
const menuData = require("../data/menu.json");

/**
 * Case-insensitive, whitespace-tolerant string comparison helper.
 */
const normalize = (str) => String(str || "").trim().toLowerCase();

/**
 * GET /api/menu
 * Returns the full menu (categories + items), with optional filtering:
 *   ?category=Pizza Deals   -> only items in that category (case-insensitive)
 *   ?popular=true           -> only items where isPopular === true
 *   ?search=tikka           -> items whose name or description contains the term
 *   ?minPrice=500&maxPrice=2000 -> price range filter
 *
 * GET /api/menu/:id
 * Returns a single item by id, or 404 if not found.
 */
router.get("/:id", (req, res) => {
  const item = menuData.items.find((i) => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({
      error: "Not Found",
      message: `No menu item found with id "${req.params.id}"`,
    });
  }
  res.status(200).json({ item });
});

router.get("/", (req, res) => {
  const { category, popular, search, minPrice, maxPrice } = req.query;
  let items = [...menuData.items];

  if (category) {
    const target = normalize(category);
    items = items.filter((item) => normalize(item.category) === target);
  }

  if (popular !== undefined) {
    const wantPopular = normalize(popular) === "true";
    items = items.filter((item) => item.isPopular === wantPopular);
  }

  if (search) {
    const term = normalize(search);
    items = items.filter(
      (item) =>
        normalize(item.name).includes(term) || normalize(item.description).includes(term)
    );
  }

  if (minPrice !== undefined) {
    const min = Number(minPrice);
    if (!Number.isNaN(min)) items = items.filter((item) => item.price >= min);
  }

  if (maxPrice !== undefined) {
    const max = Number(maxPrice);
    if (!Number.isNaN(max)) items = items.filter((item) => item.price <= max);
  }

  res.status(200).json({
    categories: menuData.categories,
    count: items.length,
    items,
  });
});

module.exports = router;
