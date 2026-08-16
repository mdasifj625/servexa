# Servexa - Vehicle Service Center Management System

Servexa is a comprehensive, cloud-ready full-stack Garage Management Software designed to streamline the day-to-day operations of an automotive repair shop. It bridges the gap between front-desk customer service and back-end inventory management by tightly integrating work orders with automated parts deduction.

## 🚀 Features

- **Role-Based Access Control (RBAC):** Distinct workflows for Admins, Service Advisors, and Mechanics.
- **Customer & Vehicle Tracking:** Centralized directory for owners and their registered vehicles.
- **Digital Job Cards (Work Orders):** Create, assign, and track the status of vehicle repairs.
- **Transaction-Safe Inventory:** Prisma `$transaction` logic guarantees that spare parts are only deducted when a job is marked "COMPLETED", preventing negative stock.
- **Automated Billing:** Automatically generates an unpaid Invoice the moment a job is completed.
- **Analytics Dashboard:** Real-time data visualization of revenue and operations.

## 🛠 Tech Stack

**Frontend (React SPA):**
- React 18 & Vite
- TypeScript
- Tailwind CSS & ShadCN-UI (Lucide Icons)
- React Router DOM v6
- Recharts (Data Visualization)

**Backend (REST API):**
- Node.js & NestJS
- TypeScript
- PostgreSQL (Relational Database)
- Prisma ORM
- Passport.js (JWT Authentication)
- Class Validator (DTO validation)

## 📂 Project Structure

This project is structured as a Monorepo:
```text
servexa/
 ├── apps/
 │    ├── backend/       # NestJS Application
 │    └── frontend/      # React + Vite Application
 ├── docs/               # Architecture, API, and Final Project Reports
 └── README.md
```

## ⚙️ Local Development Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/) (Package manager)
- [PostgreSQL](https://www.postgresql.org/) (Running locally or via Docker)

### 2. Environment Variables
Create a `.env` file in `apps/backend/` and provide your Postgres connection string:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/servexa?schema=public"
JWT_SECRET="your_super_secret_jwt_key_here"
```

### 3. Installation
Install dependencies for both frontend and backend:
```bash
yarn install
```

### 4. Database Setup & Seeding
Push the schema to your database and run the seed script to populate it with realistic dummy data:
```bash
cd apps/backend
yarn prisma db push
yarn prisma db seed
```
*Note: The seed script automatically generates an Admin account (`admin@servexa.com` / `admin123`).*

### 5. Running the Application
**Start the Backend (NestJS):**
```bash
cd apps/backend
yarn start:dev
```
*The API will run on `http://localhost:3000`.*

**Start the Frontend (React):**
```bash
cd apps/frontend
yarn dev
```
*The UI will run on `http://localhost:5173`.*

## 📖 Documentation
Detailed academic documentation can be found in the `/docs` folder, including:
- `Final_Project_Report.md`: The complete 16-chapter BCA final year project report.
- `Database.md`: Entity Relationship Diagrams and 3NF normalization notes.
- `Architecture.md`: System flow and NestJS architecture diagrams.
- `API.md`: Comprehensive REST endpoint references.

## 📄 License
This project was built for academic purposes. Feel free to fork and modify!
