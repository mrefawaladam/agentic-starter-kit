# 🌐 API Conventions & Standards

## 1. Format Respons Standar
Seluruh endpoint API mengembalikan format JSON standar:

```json
{
  "success": true,
  "data": {},
  "message": "Deskripsi opsional",
  "meta": {
    "page": 1,
    "total": 100
  }
}
```

## 2. Standar Error Codes
- `400 Bad Request`: Payload JSON tidak valid atau format data salah.
- `401 Unauthorized`: Token JWT tidak valid atau sudah kedaluwarsa.
- `403 Forbidden`: Pengguna tidak memiliki permission RBAC yang sesuai.
- `404 Not Found`: Entitas tidak ditemukan.
- `422 Unprocessable Entity`: Validasi logika bisnis gagal.
