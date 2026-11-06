---
id: API-AUTH-001
title: Otentikasi & Otorisasi JWT (Authentication Pipeline)
type: api-authentication
status: APPROVED
owner: Solution Architect Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🔐 Otentikasi & Otorisasi JWT — KasirSakti

Dokumen ini mendefinisikan pipeline otentikasi Bearer JWT, struktur claims, dan penyuntikan context pengguna.

---

## 1. Header Permintaan HTTP (Authorization Header)
Setiap permintaan ke endpoint terlindungi wajib menyertakan header:
```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 2. Struktur Payload JWT Claims
Token JWT ditandatangani menggunakan algoritma HMAC-SHA256 dengan secret key dari environment `JWT_SECRET`:
```json
{
  "user_id": 42,
  "merchant_id": 7,
  "role": "cashier",
  "email": "kasir@koperasi.id",
  "exp": 1730894400,
  "iat": 1730808000
}
```

---

## 3. Ekstraksi Context pada Handler
Middleware `auth.MyAuth(...)` bertugas memvalidasi tanda tangan token, memeriksa waktu kedaluwarsa, dan menyuntikkan struct `model.User` ke dalam `gin.Context`:
```go
userVal, exists := c.Get("user")
if !exists {
    helper.NewErrorResponse(c, http.StatusUnauthorized, "unauthorized")
    return
}
user := userVal.(*model.User)

// Teruskan user.MerchantID ke UseCase
res, err := h.uc.GetOrders(c.Request.Context(), user.MerchantID, filter)
```
