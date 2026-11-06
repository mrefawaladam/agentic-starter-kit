# ⚠️ Dependencies & Risks: FEAT-CREDIT-001

## Ketergantungan (Dependencies)
- **`FEAT-POS-001`**: Modul transaksi POS untuk inisiasi metode pembayaran kasbon.
- **`FEAT-LEGAL-001`**: Modul generator dokumen perjanjian untuk transaksi Level 2.
- **`FEAT-MEMBER-001`**: Master data identitas anggota dan verifikasi KTP.
- **`EPIC-FINANCE`**: Akun piutang usaha pada bagan akun (`Chart of Accounts`).

## Risiko & Mitigasi
- **Risiko Gagal Bayar (Default Risk)**:
  - *Mitigasi*: Penegakan batas credit limit ketat, penagihan terjadwal, dan syarat dokumen perjanjian tertulis.
- **Risiko Sengketa Hukum**:
  - *Mitigasi*: Klausul pengakuan hutang standar yang ditinjau penasihat hukum dan diarsipkan secara aman.
