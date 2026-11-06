# ✅ Acceptance Criteria: FEAT-HRIS-001 (Payroll to General Ledger)

## `AC-HRIS-001`: Pembayaran Payroll Menerbitkan Jurnal Beban Gaji Seimbang
```gherkin
Given Periode penggajian bulan November memuat slip gaji Staf A dengan rincian:
      | Komponen | Nominal |
      | Gaji Pokok + Tunjangan | Rp3.500.000 |
      | Upah Lembur | Rp500.000 |
      | Potongan Angsuran Kasbon Staf | Rp300.000 |
      | Potongan BPJS Ketenagakerjaan | Rp100.000 |
      | Gaji Bersih Ditransfer (Bank) | Rp3.600.000 |
  And Status payroll saat ini adalah APPROVED
 When Owner melakukan pembayaran payroll (menyetujui pencairan dana via Bank)
 Then Status payroll berubah menjadi PAID
  And Sistem menerbitkan entri jurnal umum seimbang:
      | Akun | Posisi | Nominal |
      | 5201 (Beban Gaji Karyawan) | Debit | Rp4.000.000 |
      | 1102 (Bank Operasional) | Kredit | Rp3.600.000 |
      | 1104 (Piutang Kasbon Staf) | Kredit | Rp300.000 |
      | 2103 (Hutang BPJS) | Kredit | Rp100.000 |
  And Total Debit (Rp4.000.000) sama dengan Total Kredit (Rp4.000.000)
  And Saldo piutang kasbon staf A berkurang Rp300.000
  And Aksi pembayaran tercatat di audit_logs
```

## `AC-HRIS-002`: Penolakan Pembayaran Tanpa Hak Akses Finance/Owner
```gherkin
Given Pengguna login dengan role CASHIER atau KITCHEN
 When Pengguna mencoba menembus endpoint pembayaran payroll POST /api/v1/hris/payrolls/:id/pay
 Then Sistem menolak dengan kode HTTP 403 Forbidden
  And Tidak ada jurnal akuntansi maupun perubahan status payroll yang terjadi
```
