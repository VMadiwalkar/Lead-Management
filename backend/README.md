# Lead Management Backend

A Node.js Express backend API for the Lead Management CRM system.

## Features

- User authentication (signup/login)
- JWT token-based authentication
- MySQL database integration
- Protected routes
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the database credentials in `.env`

4. Make sure MySQL is running and create the database:
   ```sql
   CREATE DATABASE loginApp;
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User login
- `GET /dashboard` - Protected dashboard route

### Request/Response Examples

#### Signup
```bash
POST /signup
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

#### Login
```bash
POST /login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Dashboard (Protected)
```bash
GET /dashboard
Authorization: Bearer <your-jwt-token>
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MYSQL_HOST | MySQL host | 127.0.0.1 |
| MYSQL_USER | MySQL username | root |
| MYSQL_PASSWORD | MySQL password | password |
| MYSQL_DATABASE | MySQL database name | loginApp |
| JWT_SECRET | JWT secret key | mysecretkey |
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

## Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md          # This file
```


