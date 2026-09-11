const express = require("express");
const router = express.Router();
const menuData = require("../data/menu.json");
const { generateOrderId } = require("../utils/generateOrderId");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");

const VALID_ORDER_TYPES = ["delivery", "pickup"];

/**
 * Validates the incoming order payload and returns a list of human-readable
 * problems. An empty array means the payload is valid.
 */
function validateOrderPayload(body) {
  const problems = [];

  if (!body || typeof body !== "object") {
    return ["Request body must be a JSON object."];
  }

  const { items, customer, orderType, city, totalAmount } = body;

  // --- items -------------------------------------------------------------
  if (!Array.isArray(items) || items.length === 0) {
    problems.push('"items" must be a non-empty array.');
  } else {
    items.forEach((line, idx) => {
      if (!line || typeof line !== "object") {
        problems.push(`items[${idx}] must be an object.`);
        return;
      }
      if (!line.id && !line.itemId) {
        problems.push(`items[${idx}] is missing "id" (menu item id).`);
      }
      if (
        line.quantity === undefined ||
        !Number.isInteger(line.quantity) ||
        line.quantity < 1
      ) {
        problems.push(`items[${idx}] must include a positive integer "quantity".`);
      }
    });
  }

  // --- customer ------------------------------------------------------------
  if (!customer || typeof customer !== "object") {
    problems.push('"customer" object is required.');
  } else {
    if (!customer.name || typeof customer.name !== "string" || !customer.name.trim()) {
      problems.push('"customer.name" is required.');
    }
    if (!customer.phone || typeof customer.phone !== "string" || !customer.phone.trim()) {
      problems.push('"customer.phone" is required.');
    }
  }

  // --- orderType -----------------------------------------------------------
  if (!orderType || !VALID_ORDER_TYPES.includes(String(orderType).toLowerCase())) {
    problems.push(`"orderType" is required and must be one of: ${VALID_ORDER_TYPES.join(", ")}.`);
  }

  // Delivery orders need an address.
  if (
    orderType &&
    String(orderType).toLowerCase() === "delivery" &&
    (!customer || !customer.address || !String(customer.address).trim())
  ) {
    problems.push('"customer.address" is required when "orderType" is "delivery".');
  }

  // --- city ------------------------------------------------------------------
  if (!city || typeof city !== "string" || !city.trim()) {
    problems.push('"city" is required.');
  }

  // --- totalAmount -------------------------------------------------------------
  if (totalAmount === undefined || typeof totalAmount !== "number" || totalAmount <= 0) {
    problems.push('"totalAmount" is required and must be a positive number.');
  }

  return problems;
}

/**
 * Cross-checks submitted items/city against known menu + city data.
 * Returns { resolvedItems, resolvedCity, warnings }.
 */
function resolveOrderReferences(body) {
  const warnings = [];

  const resolvedItems = body.items.map((line) => {
    const id = line.id || line.itemId;
    const menuItem = menuData.items.find((m) => m.id === id);
    if (!menuItem) {
      warnings.push(`Item id "${id}" was not found in the menu catalog; included as-is.`);
      return { id, name: line.name || "Unknown item", price: line.price || 0, quantity: line.quantity };
    }
    return {
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: line.quantity,
      lineTotal: menuItem.price * line.quantity,
    };
  });

  const resolvedCity = menuData.cities.find(
    (c) => c.name.toLowerCase() === String(body.city).toLowerCase()
  );
  if (!resolvedCity) {
    warnings.push(`City "${body.city}" is not in the list of serviceable cities.`);
  }

  return { resolvedItems, resolvedCity, warnings };
}

/**
 * Estimates a delivery/pickup window based on city branch data,
 * falling back to sensible defaults when a city isn't recognized.
 */
function estimateReadyTime({ orderType, resolvedCity }) {
  const type = String(orderType).toLowerCase();
  const baseMinutes =
    type === "pickup"
      ? 15
      : resolvedCity?.branches?.length
      ? Math.min(...resolvedCity.branches.map((b) => b.deliveryEtaMinutes))
      : 45;

  const now = new Date();
  const readyBy = new Date(now.getTime() + baseMinutes * 60 * 1000);

  return {
    estimatedMinutes: baseMinutes,
    estimatedReadyAt: readyBy.toISOString(),
  };
}

/**
 * POST /api/orders
 * Accepts: { items: [{ id, quantity }], customer: { name, phone, email?, address? },
 *            orderType: "delivery" | "pickup", city, totalAmount, notes? }
 * Validates required fields and returns a 201 with an order confirmation.
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const problems = validateOrderPayload(req.body);
    if (problems.length > 0) {
      throw new ApiError(400, "Order validation failed.", problems);
    }

    const { resolvedItems, resolvedCity, warnings } = resolveOrderReferences(req.body);
    const { estimatedMinutes, estimatedReadyAt } = estimateReadyTime({
      orderType: req.body.orderType,
      resolvedCity,
    });

    const order = {
      orderId: generateOrderId(),
      status: "confirmed",
      orderType: String(req.body.orderType).toLowerCase(),
      city: req.body.city,
      customer: {
        name: req.body.customer.name,
        phone: req.body.customer.phone,
        email: req.body.customer.email || null,
        address:
          String(req.body.orderType).toLowerCase() === "delivery"
            ? req.body.customer.address
            : null,
      },
      items: resolvedItems,
      totalAmount: req.body.totalAmount,
      notes: req.body.notes || null,
      estimated:
        String(req.body.orderType).toLowerCase() === "delivery"
          ? { deliveryEtaMinutes: estimatedMinutes, estimatedDeliveryAt: estimatedReadyAt }
          : { pickupEtaMinutes: estimatedMinutes, estimatedPickupAt: estimatedReadyAt },
      createdAt: new Date().toISOString(),
      warnings: warnings.length ? warnings : undefined,
    };

    res.status(201).json({ message: "Order placed successfully.", order });
  })
);

module.exports = router;
