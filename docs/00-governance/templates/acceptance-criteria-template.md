# ✅ Acceptance Criteria (Kriteria Penerimaan): [Nama Fitur]

Kriteria penerimaan diformulasikan menggunakan format Behavior-Driven Development (Given-When-Then) untuk menjadi acuan langsung bagi implementasi dan pembuatan automated tests QA.

---

## `AC-MODUL-001`: [Skenario Positif Utama]
```gherkin
Given [kondisi prasyarat awal pengguna dan sistem]
  And [kondisi data pendukung]
 When [tindakan pemicu dilakukan oleh aktor]
 Then [sistem memvalidasi dan memproses transaksi]
  And [data di basis data berubah sesuai ekspektasi]
  And [respons sukses dikembalikan ke antarmuka pengguna]
```

## `AC-MODUL-002`: [Skenario Kegagalan / Validasi Batas]
```gherkin
Given [kondisi awal]
 When [pengguna memasukkan nilai di luar batas yang diizinkan]
 Then [sistem menolak pemrosesan transaksi]
  And [sistem tidak mengubah status data apapun (rollback)]
  And [pesan kesalahan yang informatif dikembalikan dengan kode status yang tepat]
```
