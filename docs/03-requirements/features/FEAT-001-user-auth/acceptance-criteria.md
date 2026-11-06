# ✅ Acceptance Criteria: Autentikasi Pengguna

### AC-AUTH-001: Registrasi Pengguna Baru Berhasil
- **Given** pengguna berada di halaman registrasi
- **When** pengguna menginput email valid yang belum terdaftar dan password sesuai syarat `BR-AUTH-001`
- **Then** sistem membuat data pengguna baru dengan status aktif
- **And** sistem mengembalikan respons HTTP `201 Created` beserta token sesi
- **And** pengguna diarahkan ke halaman dashboard

### AC-AUTH-002: Registrasi Gagal Karena Email Duplikat
- **Given** pengguna menginput email yang sudah pernah terdaftar sebelumnya
- **When** pengguna menekan tombol submit pendaftaran
- **Then** sistem menolak registrasi dan mengembalikan HTTP `409 Conflict`
- **And** sistem menampilkan pesan: "Email sudah terdaftar, silakan login"

### AC-AUTH-003: Login Berhasil dengan Kredensial Valid
- **Given** akun pengguna berstatus aktif
- **When** pengguna menginput email dan password yang sesuai
- **Then** sistem menerbitkan Access Token (15 menit) dan Refresh Token (7 hari)
- **And** sistem mengembalikan status HTTP `200 OK`

### AC-AUTH-004: Akun Terkunci Setelah 5 Kali Percobaan Gagal
- **Given** pengguna gagal menginput password sebanyak 5 kali berturut-turut dalam rentang 15 menit
- **When** pengguna mencoba login untuk ke-6 kalinya
- **Then** sistem menolak login dengan HTTP `429 Too Many Requests`
- **And** pesan menampilkan: "Terlalu banyak percobaan gagal. Silakan coba lagi dalam 15 menit."
