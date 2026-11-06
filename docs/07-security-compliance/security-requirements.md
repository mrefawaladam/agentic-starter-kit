---
id: SEC-REQ-001
title: Persyaratan Keamanan Sistem (Security Requirements)
type: security-requirements
status: APPROVED
owner: Security Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🛡️ Persyaratan Keamanan Sistem — KasirSakti

Dokumen ini mendefinisikan persyaratan keamanan teknis yang wajib dipenuhi oleh seluruh endpoint dan layer aplikasi.

---

## 1. Otentikasi & Keamanan Sesi
- Menggunakan JSON Web Tokens (JWT) dengan signature HMAC-SHA256 berumur maksimal 24 jam untuk shift kasir.
- Password pengguna wajib di-hash menggunakan algoritma `bcrypt` dengan cost minimal 10.
- Endpoint sensitif login dan reset password dilindungi oleh middleware *Rate Limiting* (maksimal 5 percobaan gagal per menit).

---

## 2. Isolasi Multi-Tenant Mutlak (Multi-Tenancy Isolation)
- Data antar tenant merchant terpisah secara logis pada tingkat baris database (*row-level tenant partitioning*).
- Dilarang mempercayai `merchant_id` yang dikirim dari query parameter URL atau JSON payload klien; `merchant_id` wajib diekstrak langsung dari token JWT yang telah diverifikasi oleh middleware.

---

## 3. Perlindungan Terhadap Serangan Umum
- **SQL Injection**: Seluruh query basis data wajib menggunakan parameterized queries / ORM GORM yang tersanitasi.
- **CORS Protection**: Header Access-Control-Allow-Origin dibatasi secara ketat pada domain frontend terdaftar jika menyertakan kredensial sesi.
- **XSS & Content Type**: Response payload wajib menyertakan header `Content-Type: application/json; charset=utf-8` dan `X-Content-Type-Options: nosniff`.
