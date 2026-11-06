# 🧪 Test Case: TC-001 - Autentikasi Pengguna

| Metadata | Nilai |
| :--- | :--- |
| **Fitur Terkait** | [`FEAT-AUTH-001`](../../03-requirements/features/FEAT-001-user-auth/README.md) |
| **Penulis** | QA Engineer AI |
| **Status** | READY |

---

### Skenario Pengujian

| Test ID | Tipe | Deskripsi Skenario | Langkah Pengujian | Hasil yang Diharapkan | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TC-AUTH-001` | Positif | Login dengan email dan password benar | 1. Input email valid<br>2. Input password benar<br>3. Klik Login | HTTP 200, JWT token kembali, redirect ke dashboard | PASS |
| `TC-AUTH-002` | Negatif | Login dengan password salah | 1. Input email terdaftar<br>2. Input password salah<br>3. Klik Login | HTTP 401, error message muncul | PASS |
| `TC-AUTH-003` | Edge | Brute-force protection | 1. Coba login gagal 5 kali berturut-turut | HTTP 429 Too Many Requests pada percobaan ke-6 | PASS |
| `TC-AUTH-004` | Validasi | Format password tidak sesuai `BR-AUTH-001` | 1. Input password 6 karakter tanpa simbol | Form validation error di sisi client & HTTP 422 di API | PASS |
