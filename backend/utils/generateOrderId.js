/**
 * Generates a short, human-friendly, reasonably-unique order ID.
 * Format: CP-<base36 timestamp>-<4 random base36 chars>
 * e.g. CP-M1F2G3H4-7K2Q
 *
 * Not a substitute for a DB-generated primary key in a real system,
 * but collision-safe enough for a stateless demo/mock API.
 */
function generateOrderId() {
  const timestampPart = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CP-${timestampPart}-${randomPart}`;
}

module.exports = { generateOrderId };
