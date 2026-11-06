# ️ Threat Model & STRIDE Analysis

## 1. Metodologi STRIDE
| Kategori Ancaman | Risiko Potensial | Mitigasi yang Diterapkan |
| :--- | :--- | :--- |
| **Spoofing** | Pemalsuan identitas pengguna / sesi | JWT bertanda tangan HMAC-SHA256 dengan masa aktif singkat (15 menit) |
| **Tampering** | Modifikasi parameter API atau data tersimpan | Sanitasi input ketat (Zod schema) dan validasi ORM parameter |
| **Repudiation** | Penyangkalan aksi transaksi | Audit trail log untuk seluruh operasi Create, Update, Delete |
| **Information Disclosure** | Kebocoran data sensitif | Password hashing Argon2id, masking PII pada respons API |
| **Denial of Service** | Serangan brute-force / flood | IP-based rate limiting (5 percobaan per 15 menit) |
