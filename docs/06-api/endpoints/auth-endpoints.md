# 🔐 API Endpoints: Autentikasi & Pengguna

Kumpulan endpoint pengelolaan akun, otentikasi login, profil, dan token.

---

## 1. POST `/api/v1/auth/login`
- **Deskripsi**: Login pengguna dan memperoleh JWT token.
- **Autentikasi**: Publik (Tanpa token).
- **Request Body**:
  ```json
  {
    "email": "kasir@koperasi.id",
    "password": "Password123!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "login berhasil",
    "data": {
      "token": "eyJhbGciOi...",
      "user": {
        "id": 42,
        "name": "Siti Aminah",
        "email": "kasir@koperasi.id",
        "role": "cashier",
        "merchant_id": 7
      }
    }
  }
  ```

---

## 2. GET `/api/v1/auth/profile`
- **Deskripsi**: Mengambil profil pengguna yang sedang login.
- **Autentikasi**: Wajib (`auth.MyAuth("*")`).
