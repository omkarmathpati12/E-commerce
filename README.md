# E-Commerce Website

## Tech Stack
- Backend: Spring Boot 3.2.0
- Frontend: React 18.2.0
- Database: MySQL

## Backend Setup
1. Make sure MySQL is running on your machine
2. Update database credentials in `backend/src/main/resources/application.properties`
3. Navigate to the backend folder and run:
   ```bash
   cd backend
   mvnw spring-boot:run
   ```
   (or use your favorite IDE to run the EcommerceApplication class)

## Frontend Setup
1. Navigate to the frontend folder
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

## Default Credentials
- Admin: admin / admin123

## Features
- User Registration & Login
- Product Management (Admin)
- Shopping Cart
- Order Placement
- Admin Dashboard (View All Orders)

## Project Structure
- Backend: Controller -> Service -> Repository architecture with DTOs
- Frontend: Simple components using React Router
- Authentication: Session-based, no JWT
- Roles: ADMIN and USER
