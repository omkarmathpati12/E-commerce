# 🛍️ ShopVerse - Modern E-Commerce Platform

A full-stack, responsive E-Commerce application built using **Spring Boot 3**, **React 18**, **Tailwind CSS**, and **MySQL**.

![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Spring%20Boot%20%7C%20MySQL-blue?style=for-the-badge)

---

## 🚀 Tech Stack

### Frontend
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS, Custom Utility Classes
- **Routing:** React Router v6
- **HTTP Client:** Axios (Basic Auth & Interceptors)

### Backend
- **Framework:** Spring Boot 3.2.0 (Java 17)
- **ORM / Persistence:** Spring Data JPA / Hibernate
- **Database:** MySQL
- **Security:** Session & Basic Authentication with Role-Based Access Control (`ADMIN`, `USER`)
- **Tools:** Lombok, Maven

---

## ✨ Features Breakdown

### 🏠 Public Storefront & Landing Page
- **Hero Section:** High-impact banner with gradient design, store statistics, and quick call-to-action buttons.
- **Value Propositions:** Express delivery, 100% secure payment, verified quality, and easy returns badges.
- **Real-time Search & Filtering:** Dynamic product search bar and single-click category filters (*All, Electronics, Audio, Wearables, Accessories*).
- **Public Product Catalog:** Unauthenticated visitors can freely browse all listed products.

### 🛍️ Interactive Product Cards & Modal Detail View
- **Product Card Display:** Shows image/icon, category tag, rating score, stock availability, and price.
- **Detail Modal Popup:** Clicking on any product card opens an interactive modal displaying complete product details, full description, stock status, and add-to-cart actions.
- **Unauthenticated Redirect:** Clicking "Add to Cart" while logged out seamlessly directs visitors to the Sign In page.

### 🛒 Shopping Cart & Orders
- **Cart Management:** Add products, view items, remove items, and see live order summaries.
- **Checkout & Order Placement:** One-click order creation for logged-in users.
- **Order History:** Personal order tracking tab showing past purchase statuses and timestamps.

### 👑 Admin Dashboard
- **Product CRUD Operations:** Create new products, update existing listings (name, price, stock, description, image URL), and delete items.
- **Store-wide Order Monitoring:** View all orders placed across all customer accounts.

---

## 🔑 Default Credentials

| Role | Username | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `admin123` | Full access (Product Management & Admin Dashboard) |
| **User** | Self-registered | Self-created | Customer access (Cart, Checkout, Order History) |

---

## ⚙️ Project Setup & Installation

### 1. Database Configuration
Make sure **MySQL** is running locally and create a database (or let Spring Boot create it):

```sql
CREATE DATABASE IF NOT EXISTS ecommerce_db;
```

Update your database credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_password
```

### 2. Backend Setup (Spring Boot)
Navigate to the `backend` folder and start the server:

```bash
cd backend
mvnw spring-boot:run
```
> The Spring Boot backend server will run on `http://localhost:8080` and automatically seed default products on initial run.

### 3. Frontend Setup (React + Vite)
Open a new terminal, navigate to the `frontend` folder, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```
> The Vite frontend app will run on `http://localhost:5173`.

---

## 📡 REST API Endpoints

### Authentication
- `POST /api/auth/register` — Register a new user account
- `POST /api/auth/login` — Authenticate credentials
- `GET /api/auth/current` — Get current logged-in user details

### Products
- `GET /api/products` — List all products
- `GET /api/products/{id}` — Get single product details
- `POST /api/products` — Create new product (*Admin only*)
- `PUT /api/products/{id}` — Update product (*Admin only*)
- `DELETE /api/products/{id}` — Delete product (*Admin only*)

### Shopping Cart
- `GET /api/cart` — Fetch user shopping cart
- `POST /api/cart?productId={id}&quantity={qty}` — Add item to cart
- `DELETE /api/cart/{id}` — Remove item from cart

### Orders
- `GET /api/orders` — Get user order history (or all orders for Admin)
- `POST /api/orders` — Place order from current cart

---

## 📂 Directory Structure

```text
E-commerce/
├── backend/
│   ├── src/main/java/com/ecommerce/
│   │   ├── config/          # Security & CORS configuration
│   │   ├── controller/      # Auth, Product, Cart & Order controllers
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entity/          # JPA Entities (User, Product, Cart, Order)
│   │   ├── repository/      # JPA Data Repositories
│   │   └── service/         # Business logic services
│   └── src/main/resources/
│       └── application.properties
└── frontend/
    ├── public/
    └── src/
        ├── components/      # Home, Layout, Login, Register, AdminDashboard
        │   └── reusable/    # ProductCard, CartItem, OrderCard
        ├── context/         # AuthContext state management
        ├── services/        # Axios API service instance
        ├── App.jsx          # Route definitions & protection
        └── main.jsx         # App entry point
```
