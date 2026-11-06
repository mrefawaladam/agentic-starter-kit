# 📏 Aturan Bisnis (Business Rules): [Nama Fitur]

Katalog aturan bisnis yang wajib ditegakkan oleh sistem tanpa kompromi.

---

## Format Definisi Aturan Bisnis

### `BR-MODUL-001`: [Nama Singkat Aturan]
- **Deskripsi**: Penjelasan spesifik dan terukur mengenai batasan aturan bisnis.
- **Rasional Bisnis**: Mengapa aturan ini ada dan risiko apa yang dimitigasi.
- **Kondisi Penerapan**: Kapan aturan ini dievaluasi oleh sistem (contoh: Saat checkout, saat tutup shift).
- **Aksi Jika Terlanggar**: Respons sistem jika aturan dilanggar (contoh: Penolakan request dengan HTTP 400 dan pesan error spesifik).
- **Otoritas Perubahan / Pengecualian**: Siapa yang berhak memberikan approval khusus jika ada toleransi (contoh: `RoleOwner` atau `RoleAdmin`).
- **Use Case Terkait**: `UC-MODUL-001`
