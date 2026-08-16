# Servexa API Documentation

## Base URL
`/api/v1`

---

## 1. Work Orders
### `GET /work-orders`
- **Description:** Retrieve all active and completed work orders.
- **Response:** `200 OK` Array of Work Order objects with Customer and Vehicle relations.

### `POST /work-orders`
- **Description:** Create a new work order (Job Card).
- **Body:**
  ```json
  {
    "customerId": 1,
    "vehicleId": 1,
    "mechanicId": 2,
    "items": [
      { "partId": "uuid-here", "quantity": 2, "price": 50 }
    ]
  }
  ```
- **Response:** `201 Created`

### `PATCH /work-orders/:id/status`
- **Description:** Update work order status. Triggers inventory deduction when set to `COMPLETED`.
- **Body:** `{ "status": "COMPLETED" }`
- **Response:** `200 OK`

---

## 2. Inventory & Purchases
### `POST /purchases`
- **Description:** Record a part purchase from a supplier. Automatically increments inventory stock.
- **Body:**
  ```json
  {
    "supplierId": 1,
    "partId": "uuid-here",
    "quantity": 10,
    "cost": 25.5
  }
  ```
- **Response:** `201 Created`

---

## 3. Billing
### `GET /billing/invoices`
- **Description:** Fetch all generated invoices.
- **Response:** `200 OK`

### `POST /billing/invoices/:id/pay`
- **Description:** Mark an invoice as PAID and create a Payment record.
- **Body:** `{ "method": "CARD" }`
- **Response:** `201 Created`

---

## 4. Customers & Vehicles
- `GET /customers` - List all customers.
- `POST /customers` - Create a new customer.
- `GET /vehicles` - List all registered vehicles.
- `POST /vehicles` - Register a new vehicle.
