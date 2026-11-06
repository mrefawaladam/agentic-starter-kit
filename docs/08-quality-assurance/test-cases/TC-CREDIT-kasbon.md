---
id: TC-CREDIT-001
title: Test Case — Validasi Limit Kasbon & Penegakan Perjanjian
type: test-case
status: APPROVED
owner: QA Agent
related_features:
  - FEAT-CREDIT-001
  - FEAT-LEGAL-001
related_use_cases:
  - UC-CREDIT-001
---

# 🧪 TC-CREDIT-001: Validasi Limit Kasbon & Penegakan Perjanjian

## 1. Skenario Uji 1: Kasbon Melebihi Threshold (> Rp100.000)
- **Preconditions**: Pelanggan aktif, credit limit = Rp1.000.000, saldo hutang = Rp0.
- **Steps**:
  1. POST checkout kasbon senilai Rp150.000.
- **Expected Result**:
  - Sistem mengklasifikasikan transaksi sebagai Level 2.
  - Record perjanjian (`agreement_id`) dibuat otomatis.
  - Transaksi tidak dapat difinalisasi sebelum approval manajer dan tanda tangan selesai.
- **Status**: `NOT_TESTED`

---

## 2. Skenario Uji 2: Penolakan Kasbon Overlimit
- **Preconditions**: Credit limit = Rp500.000, saldo hutang berjalan = Rp450.000.
- **Steps**:
  1. POST checkout kasbon baru senilai Rp100.000.
- **Expected Result**:
  - HTTP 400 Bad Request.
  - Pesan error penolakan overlimit.
  - Tidak ada record piutang baru.
- **Status**: `NOT_TESTED`
