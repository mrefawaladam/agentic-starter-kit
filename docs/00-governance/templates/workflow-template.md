# Alur Kerja & Diagram Proses (Workflows): [Nama Fitur]

Dokumen ini memvisualisasikan alur kerja interaksi antar aktor, sistem frontend, backend, dan database.

---

## 1. Diagram Alur Proses (Process Flowchart)
```mermaid
flowchart TD
    Start(["Mulai"]) --> Step1["Langkah 1: Input Data"]
    Step1 --> Decision{"Validasi Memenuhi Syarat?"}
    Decision -- "Ya" --> Process["Langkah 2: Proses Transaksi ACID"]
    Decision -- "Tidak" --> Error["Kembalikan Error & Rollback"]
    Process --> End(["Selesai"])
```

## 2. Diagram Urutan (Sequence Diagram)
```mermaid
sequenceDiagram
    autonumber
    actor User as Pengguna
    participant FE as Frontend / POS
    participant BE as Backend Handler & UseCase
    participant DB as PostgreSQL Database

    User->>FE: Mengajukan Aksi
    FE->>BE: POST /api/v1/... (Payload)
    BE->>DB: Validasi & Simpan Transaksi
    DB-->>BE: Konfirmasi Commit
    BE-->>FE: Respons Sukses JSON
    FE-->>User: Tampilkan Notifikasi & Bukti
```
