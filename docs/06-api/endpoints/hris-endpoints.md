# 👥 API Endpoints: HRIS & Payroll

Kumpulan endpoint pengelolaan staf karyawan, jadwal shift kerja, presensi absensi, dan kalkulasi slip gaji.

---

## 1. GET `/api/v1/hris/employees`
- **Deskripsi**: Daftar karyawan terdaftar per cabang outlet.

---

## 2. POST `/api/v1/hris/attendances/clock-in`
- **Deskripsi**: Rekam kehadiran masuk kerja karyawan.

---

## 3. POST `/api/v1/hris/payrolls/generate`
- **Deskripsi**: Kalkulasi otomatis slip gaji karyawan bulanan dan pemostingan jurnal beban gaji.
