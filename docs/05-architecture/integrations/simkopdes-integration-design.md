---
id: ARCH-INT-001
title: Desain Pola Integrasi SIMKOPDES (Transactional Outbox)
type: integration-design
status: APPROVED
owner: Solution Architect Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🌐 Desain Pola Integrasi SIMKOPDES (Transactional Outbox)

Dokumen ini menjelaskan pola arsitektur *Transactional Outbox* yang disiapkan untuk mengisolasi kegagalan sinkronisasi pihak ketiga ke platform SIMKOPDES.

---

## 1. Masalah yang Diselesaikan
Jika checkout kasir memanggil API eksternal SIMKOPDES secara langsung (*synchronous HTTP call*):
- Jika koneksi internet drop atau server SIMKOPDES down, pelanggan di kasir tidak bisa membayar.
- Latensi checkout menjadi lambat (&gt; 2 detik).

---

## 2. Solusi: Transactional Outbox Pattern
```mermaid
sequenceDiagram
    autonumber
    actor Kasir
    participant POS as Frontend POS
    participant BE as Backend Checkout UseCase
    participant DB as PostgreSQL
    participant Worker as Background Outbox Worker
    participant SIM as SIMKOPDES API

    Kasir->>POS: Selesaikan Transaksi
    POS->>BE: POST /api/v1/products/checkout
    activate BE
    Note over BE,DB: Satu Transaksi DB Atomik (ACID)
    BE->>DB: INSERT transactions
    BE->>DB: INSERT outbox_events (event: 'ORDER_COMPLETED', payload: JSON, status: 'PENDING')
    BE->>DB: COMMIT
    deactivate BE
    BE-->>POS: HTTP 200 OK & Invoice Struk (Instan < 50ms)

    loop Polling / CDC Asinkron
        Worker->>DB: SELECT * FROM outbox_events WHERE status = 'PENDING' FOR UPDATE SKIP LOCKED
        Worker->>SIM: POST /api/external/sync (Payload JSON)
        alt Pengiriman Sukses
            SIM-->>Worker: HTTP 200 OK
            Worker->>DB: UPDATE outbox_events SET status = 'DELIVERED', delivered_at = NOW()
        else Pengiriman Gagal / Jaringan Drop
            Worker->>DB: UPDATE outbox_events SET status = 'FAILED', retry_count = retry_count + 1, next_retry_at = NOW() + backoff
        end
    end
```

---

## 3. Status Teknis
Kontrak skema JSON dan URL endpoint SIMKOPDES menunggu rilis resmi: `[TODO: PENDING_OFFICIAL_API_DOCS]`.
Tabel `outbox_events` siap diimplementasikan tanpa mengubah layer domain POS.
