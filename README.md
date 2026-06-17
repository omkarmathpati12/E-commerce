# 🛒 E-Commerce Website

A full-stack E-Commerce application built using **Spring Boot**, **React**, and **MySQL**.

## 🚀 Tech Stack

- **Backend:** Spring Boot 3.2.0
- **Frontend:** React 18.2.0
- **Database:** MySQL

---

## ✨ Features

- User Registration & Login
- Product Management (Admin)
- Shopping Cart
- Order Placement
- Admin Dashboard (View All Orders)
- Session-based Authentication
- Role-based Access Control (`ADMIN`, `USER`)

---

## ⚙️ Backend Setup

1. Make sure MySQL is running.
2. Update database credentials in:

```text
backend/src/main/resources/application.properties
```

3. Start the backend:

```bash
cd backend
mvnw spring-boot:run
```

Or run `EcommerceApplication` from your IDE.

---

## 🎨 Frontend Setup

Install dependencies and start the React app:

```bash
cd frontend
npm install
npm start
```

---

## 🔑 Default Admin Credentials

| Username | Password |
|----------|----------|
| admin | admin123 |

---

## 📂 Project Structure

### Backend
- Controller → Service → Repository architecture
- DTO-based communication
- Session-based authentication

### Frontend
- React components
- React Router

---

## 👥 Roles

- **ADMIN**
- **USER**