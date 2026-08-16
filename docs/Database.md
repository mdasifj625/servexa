# Servexa Database Schema

## Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    CUSTOMER ||--o{ VEHICLE : owns
    CUSTOMER ||--o{ APPOINTMENT : books
    CUSTOMER ||--o{ WORK_ORDER : has
    VEHICLE ||--o{ APPOINTMENT : schedules
    VEHICLE ||--o{ WORK_ORDER : serviced_in
    USER ||--o{ WORK_ORDER : assigned_to
    WORK_ORDER ||--|{ WORK_ORDER_ITEM : contains
    WORK_ORDER ||--o| INVOICE : generates
    SERVICE ||--o{ WORK_ORDER_ITEM : included_in
    PART ||--o{ WORK_ORDER_ITEM : used_in
    PART ||--o{ PURCHASE : bought_via
    SUPPLIER ||--o{ PURCHASE : supplies
    INVOICE ||--o| PAYMENT : paid_by

    CUSTOMER {
        int id PK
        string firstName
        string phone
    }
    VEHICLE {
        int id PK
        string licensePlate
        int customerId FK
    }
    WORK_ORDER {
        int id PK
        string status
        int vehicleId FK
    }
    INVOICE {
        int id PK
        float totalAmount
        string status
    }
```

## Normalization Details
The schema strictly adheres to 3rd Normal Form (3NF):
1. **1NF:** All attributes contain atomic values (no arrays in columns).
2. **2NF:** All non-key attributes are fully functionally dependent on the primary key. E.g., Vehicle attributes depend on `Vehicle.id`, not `Customer.id`.
3. **3NF:** No transitive dependencies. `Invoice` relies on `WorkOrder` for the subtotal calculation logic, separating billing state from service state.

## Primary & Foreign Keys
- **Primary Keys:** Every table utilizes an auto-incrementing integer `id` (or UUID for `Part`) to uniquely identify rows.
- **Foreign Keys:** Prisma manages referential integrity through foreign key constraints, preventing orphaned records (e.g., a Vehicle cannot exist without a valid Customer).
