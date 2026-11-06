# 🌐 API Specification: Authentication Endpoints

Base URL: `/api/v1/auth`

---

### 1. Register User
- **Method**: `POST`
- **Path**: `/register`
- **Headers**: `Content-Type: application/json`

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user_id": "usr_998124",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. Login User
- **Method**: `POST`
- **Path**: `/login`
- **Headers**: `Content-Type: application/json`

#### Request Body
```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1Ni...",
    "refresh_token": "def50200...",
    "expires_in": 900
  }
}
```
