---
id: BP-TOBE-001
title: Proses Bisnis Masa Depan (TO-BE Process) — KasirSakti
type: business-process
status: APPROVED
owner: BA Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🚀 Proses Bisnis Masa Depan (TO-BE Process) — KasirSakti

Dokumen ini memetakan alur kerja operasional baru yang terintegrasi, aman, dan dapat diaudit menggunakan platform KasirSakti.

---

## 1. Alur Shift Kasir & Rekonsiliasi Blind Closing
```mermaid
sequenceDiagram
    autonumber
    actor Kasir
    participant POS as Frontend Kasir
    participant BE as Backend KasirSakti
    participant DB as Basis Data PostgreSQL

    Kasir->>POS: Buka Shift & Input Modal Awal (Opening Cash)
    POS->>BE: POST /api/v1/finance/shifts/open
    BE->>DB: Simpan cashier_shift_logs (status: OPEN)
    BE-->>POS: Shift Terbuka

    Note over Kasir,BE: Transaksi Berjalan (Checkout, Kasbon, Petty Cash)

    Kasir->>POS: Input Pengeluaran Toko (Petty Cash)
    POS->>BE: POST /api/v1/finance/expenses (outlet_id, amount, note)
    BE->>DB: Catat expense & update shift_log

    Kasir->>POS: Tutup Shift & Input Uang Fisik Riil (Blind Count)
    Note over Kasir,POS: Kasir TIDAK DAPAT melihat nominal ekspektasi sistem
    POS->>BE: POST /api/v1/finance/shifts/close (closing_cash)
    BE->>BE: expected_cash = opening_cash + cash_sales - cash_expenses
    BE->>BE: cash_difference = closing_cash - expected_cash
    BE->>DB: UPDATE cashier_shift_logs (status: CLOSED, cash_difference)
    BE-->>POS: Ringkasan Rekap Shift & Z-Report
```

---

## 2. Alur Transaksi Kasbon & Penegakan Perjanjian
```mermaid
flowchart TD
    Start(["Kasir Memilih Pelanggan & Barang"]) --> Limit{"Cek Credit Limit & Status Pelanggan"}
    Limit -- "Tidak Lolos / Overlimit" --> Reject["Tolak Transaksi Kasbon / Minta Pelunasan Dulu"]
    Limit -- "Lolos" --> Value{"Total Nilai Kasbon > Rp100.000?"}
    
    Value -- "Tidak (Level 1)" --> Finalize1["Finalisasi Transaksi POS"]
    Value -- "Ya (Level 2)" --> GenDoc["Generate Dokumen Perjanjian (FEAT-LEGAL-001)"]
    
    GenDoc --> Sign["Tanda Tangan Pelanggan & Otorisasi Manajer"]
    Sign --> Finalize2["Finalisasi Transaksi POS"]
    
    Finalize1 --> Journal["Otomatis Terbitkan Jurnal: Debit Piutang, Kredit Penjualan"]
    Finalize2 --> Journal
    Journal --> End(["Cetak Struk Belanja & Kartu Kasbon"])
```
