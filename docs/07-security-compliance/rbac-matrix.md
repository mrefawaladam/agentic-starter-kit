---
id: SEC-RBAC-001
title: Matriks Hak Akses Berbasis Peran (RBAC Matrix)
type: rbac-matrix
status: APPROVED
owner: Security Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🔐 Matriks Hak Akses Berbasis Peran (RBAC Matrix)

Matriks otorisasi hak akses endpoint dan fitur KasirSakti berdasarkan role pengguna yang didefinisikan pada `internal/domain/model/user.go`.

---

## Tabel Matriks RBAC

| Modul / Kemampuan Operasional | `owner` | `admin` | `cashier` | `finance` | `hr` |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Manajemen Tenant & Outlet** | ✓ | – | – | – | – |
| **Buka / Tutup Shift Kasir Sendiri** | ✓ | ✓ | ✓ | – | – |
| **Transaksi Checkout POS** | ✓ | ✓ | ✓ | – | – |
| **Void Nota Penjualan** | ✓ | ✓ | – | – | – |
| **Input Petty Cash Laci** | ✓ | ✓ | ✓ | ✓ | – |
| **Manajemen Master Produk & Varian** | ✓ | ✓ | – | – | – |
| **Penyesuaian Stok Opname Manual** | ✓ | ✓ | – | – | – |
| **Pengajuan Kasbon Anggota** | ✓ | ✓ | ✓ | ✓ | – |
| **Approval Kasbon > Rp100.000** | ✓ | ✓ | – | Kebijakan | – |
| **Rekam Pembayaran Cicilan Kasbon** | ✓ | ✓ | ✓ | ✓ | – |
| **Akses Jurnal Umum & Buku Besar** | ✓ | – | – | ✓ | – |
| **Manajemen Karyawan & Absensi** | ✓ | ✓ | – | – | ✓ |
| **Kalkulasi & Otorisasi Payroll** | ✓ | – | – | ✓ | ✓ |
| **Lihat Jejak Rekam `audit_logs`** | ✓ | ✓ | – | ✓ | – |
