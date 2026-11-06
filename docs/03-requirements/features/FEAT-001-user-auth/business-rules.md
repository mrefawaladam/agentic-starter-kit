# Business Rules: Autentikasi Pengguna

| Rule ID | Nama Aturan | Deskripsi & Validasi |
| :--- | :--- | :--- |
| **`BR-AUTH-001`** | Format Password | Password minimal 8 karakter, wajib memiliki minimal 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 simbol spesial. |
| **`BR-AUTH-002`** | Keunikan Email | Alamat email bersifat *case-insensitive* dan wajib unik di seluruh sistem. |
| **`BR-AUTH-003`** | Rate Limiting Login | Maksimal 5 kali percobaan login gagal berturut-turut dalam 15 menit per IP. Setelah itu akun di-*freeze* selama 15 menit. |
| **`BR-AUTH-004`** | Masa Berlaku Token | Access Token berlaku selama 15 menit. Refresh Token berlaku selama 7 hari dengan mekanisme rotasi (*token rotation*). |
| **`BR-AUTH-005`** | Hashing Keamanan | Password wajib di-hash menggunakan algoritma **Argon2id** atau **Bcrypt** dengan work factor minimal 12. Dilarang menyimpan password plain-text. |
