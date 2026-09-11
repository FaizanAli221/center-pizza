# California Pizza API

A lightweight, production-ready serverless REST API built with **Node.js + Express**,
designed to deploy on **Vercel** with zero database setup. Powers a food-ordering
frontend (menu browsing, city/branch selection, order placement).

## Project structure

```
california-pizza-api/
├── api/
│   └── index.js          # Express app + Vercel serverless entry point
├── routes/
│   ├── health.js          # GET  /api/health
│   ├── menu.js             # GET  /api/menu, /api/menu/:id
│   ├── cities.js           # GET  /api/cities, /api/cities/:id
│   └── orders.js           # POST /api/orders
├── middleware/
│   └── errorHandler.js    # 404 + centralized JSON error handling
├── utils/
│   ├── ApiError.js         # Structured error class
│   ├── asyncHandler.js     # async/await wrapper for routes
│   └── generateOrderId.js  # Order ID generator
├── data/
│   └── menu.json           # Mock menu, categories, and city data
├── package.json
├── vercel.json
├── .env.example
└── .gitignore
```

## Getting started (local)

```bash
npm install
cp .env.example .env
npm run dev      # nodemon, auto-restarts on changes
# or
npm start        # plain node
```

The API listens on `http://localhost:3000` by default (`PORT` in `.env`).

## Deploying to Vercel

```bash
npm i -g vercel   # if you don't already have the CLI
vercel             # first deploy, follow the prompts
vercel --prod       # promote to production
```

`vercel.json` routes every request through `api/index.js`, so a single
`vercel deploy` is all that's needed — no extra configuration, no database.

Set `FRONTEND_ORIGIN` (comma-separated list of allowed origins) as an
environment variable in your Vercel project settings for production CORS
lock-down; it defaults to `*` if unset.

## Endpoints

### `GET /api/health`
Liveness check.

```json
{
  "status": "ok",
  "service": "california-pizza-api",
  "timestamp": "2026-09-11T10:00:00.000Z",
  "environment": "production",
  "uptimeSeconds": 12.4
}
```

### `GET /api/menu`
Returns categories + items. Supports optional filters:

| Query param | Example                     | Description                          |
|-------------|------------------------------|---------------------------------------|
| `category`  | `?category=Flavours`         | Case-insensitive exact category match |
| `popular`   | `?popular=true`               | Only items flagged `isPopular`        |
| `search`    | `?search=tikka`               | Matches name or description           |
| `minPrice`  | `?minPrice=500`               | Price lower bound                      |
| `maxPrice`  | `?maxPrice=2000`              | Price upper bound                      |

### `GET /api/menu/:id`
Single item lookup, e.g. `GET /api/menu/fl-001`. `404` if not found.

### `GET /api/cities`
Returns all serviceable cities with their branches and delivery ETAs.

### `GET /api/cities/:id`
Single city lookup by id, e.g. `GET /api/cities/khi`. `404` if not found.

### `POST /api/orders`
Creates a mock order and returns a confirmation.

**Request body:**

```json
{
  "items": [
    { "id": "fl-001", "quantity": 2 },
    { "id": "dr-001", "quantity": 1 }
  ],
  "customer": {
    "name": "Ayesha Khan",
    "phone": "+92 300 1234567",
    "email": "ayesha@example.com",
    "address": "House 12, Street 4, DHA Phase 5, Karachi"
  },
  "orderType": "delivery",
  "city": "Karachi",
  "totalAmount": 3048,
  "notes": "Ring the bell twice."
}
```

- `items[].id` must reference a `data/menu.json` item id; `quantity` must be a positive integer.
- `customer.name` and `customer.phone` are always required.
- `customer.address` is required when `orderType` is `"delivery"`.
- `orderType` must be `"delivery"` or `"pickup"`.
- `city` and a positive numeric `totalAmount` are required.

**Success — `201 Created`:**

```json
{
  "message": "Order placed successfully.",
  "order": {
    "orderId": "CP-M1F2G3H4-7K2Q",
    "status": "confirmed",
    "orderType": "delivery",
    "city": "Karachi",
    "customer": { "name": "Ayesha Khan", "phone": "+92 300 1234567", "email": "ayesha@example.com", "address": "House 12, Street 4, DHA Phase 5, Karachi" },
    "items": [
      { "id": "fl-001", "name": "Sindhi Achari", "price": 1399, "quantity": 2, "lineTotal": 2798 },
      { "id": "dr-001", "name": "Coca-Cola 1.5L", "price": 250, "quantity": 1, "lineTotal": 250 }
    ],
    "totalAmount": 3048,
    "notes": "Ring the bell twice.",
    "estimated": { "deliveryEtaMinutes": 30, "estimatedDeliveryAt": "2026-09-11T10:30:00.000Z" },
    "createdAt": "2026-09-11T10:00:00.000Z"
  }
}
```

**Validation failure — `400 Bad Request`:**

```json
{
  "error": "Order validation failed.",
  "details": [
    "\"customer.address\" is required when \"orderType\" is \"delivery\"."
  ]
}
```

### Any unknown route
`404 Not Found`:

```json
{ "error": "Not Found", "message": "Route GET /api/nope does not exist." }
```

## Notes

- Menu/city data is static JSON — swap `data/menu.json` for a real database
  later without touching route logic (routes only depend on the shape of
  the exported object).
- Orders are not persisted; this mirrors "zero complex database setup" as
  requested. Wire `routes/orders.js` up to a DB or queue when you're ready.
