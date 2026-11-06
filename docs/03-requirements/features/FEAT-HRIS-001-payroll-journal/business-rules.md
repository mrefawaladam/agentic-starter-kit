# 📏 Business Rules: FEAT-HRIS-001 (Payroll to General Ledger)

### `BR-HRIS-001`: Pemicu Pembuatan Jurnal Gaji
Jurnal akuntansi penggajian hanya diterbitkan ketika status penggajian (*payroll run* atau *payslip batch*) ditransisikan ke status `PAID` atau `DISBURSED`. Status `DRAFT` atau `SUBMITTED` tidak boleh menghasilkan mutasi moneter di buku besar.

### `BR-HRIS-002`: Struktur Akun Pembebanan Jurnal Gaji
Setiap pembayaran penggajian wajib menghasilkan jurnal berpasangan seimbang (`Total Debit == Total Credit`) dengan bagan akun:
1. **Debit**: Akun `5201` (Beban Gaji & Upah Karyawan) sebesar **Total Gaji Bruto** (Gaji Pokok + Tunjangan + Lembur).
2. **Kredit**: Akun `1101` (Kas) atau `1102` (Bank Transfer) sebesar **Total Gaji Bersih yang Dibayarkan (Take-Home Pay)**.
3. **Kredit**: Akun `1104` (Piutang Karyawan / Kasbon Staf) sebesar total angsuran pinjaman yang dipotong pada periode berjalan (jika ada).
4. **Kredit**: Akun `2103` (Hutang Pajak / BPJS / Iuran Pihak Ketiga) sebesar potongan premi karyawan (jika ada).

### `BR-HRIS-003`: Atomisitas Eksekusi Payroll
Proses pencairan gaji staf dan posting jurnal buku besar wajib berada dalam satu blok transaksi database ACID (`TransactionManager`). Apabila posting jurnal akuntansi gagal, proses pencairan status gaji harus dibatalkan (*rollback*).

### `BR-HRIS-004`: Jejak Audit Penggajian
Setiap eksekusi pembayaran payroll wajib dicatat di tabel `audit_logs` dengan modul `HRIS_PAYROLL`, aksi `DISBURSE`, memuat jumlah nominal bruto, total potongan, dan user/owner yang mengeksekusi.
