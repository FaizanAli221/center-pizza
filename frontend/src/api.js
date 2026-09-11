/**
 * California Pizza API Client
 * Facilitates communication between frontend and Express backend.
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Handle API responses and uniform error handling
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: `Request failed with status ${response.status}` };
    }
    const err = new Error(errorData.message || errorData.error || 'API Request Failed');
    err.status = response.status;
    err.details = errorData.problems || errorData.details;
    throw err;
  }
  return response.json();
}

/**
 * Check backend health
 */
export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return handleResponse(res);
}

/**
 * Fetch all serviceable cities and branches
 */
export async function fetchCities() {
  const res = await fetch(`${API_BASE}/cities`);
  const data = await handleResponse(res);
  return data.cities || [];
}

/**
 * Fetch a single city by id
 */
export async function fetchCityById(cityId) {
  const res = await fetch(`${API_BASE}/cities/${encodeURIComponent(cityId)}`);
  const data = await handleResponse(res);
  return data.city;
}

/**
 * Fetch menu items with optional category, search, or popular filters
 */
export async function fetchMenu(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.popular !== undefined) params.append('popular', filters.popular);
  if (filters.search) params.append('search', filters.search);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${API_BASE}/menu${query}`);
  return handleResponse(res);
}

/**
 * Submit an order to the backend
 * @param {Object} orderPayload
 * {
 *   orderType: "delivery" | "pickup",
 *   city: string,
 *   customer: { name, phone, email?, address? },
 *   items: [{ id, quantity, price?, name? }],
 *   totalAmount: number,
 *   notes?: string
 * }
 */
export async function submitOrder(orderPayload) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderPayload),
  });
  return handleResponse(res);
}

/**
 * Track an order by order ID
 */
export async function fetchOrderById(orderId) {
  const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(orderId)}`);
  const data = await handleResponse(res);
  return data.order;
}
