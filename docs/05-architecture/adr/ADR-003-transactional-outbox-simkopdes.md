---
id: ADR-003
title: "ADR-003: Pola Transactional Outbox untuk Sinkronisasi SIMKOPDES"
type: adr
status: ACCEPTED
deciders:
  - Solution Architect Agent
  - Backend Lead
date: 2026-11-05
---

# 🏛️ ADR-003: Pola Transactional Outbox untuk Sinkronisasi SIMKOPDES

## 1. Context (Konteks Masalah)
Koperasi desa diwajibkan menyinkronkan data operasional ke platform eksternal SIMKOPDES. Namun, jaringan internet di desa kerap tidak stabil dan server pihak ketiga berpotensi mengalami latency tinggi atau downtime yang dapat melumpuhkan antrean kasir jika dihubungi secara sinkron pada saat checkout.

## 2. Decision (Keputusan)
Mengadopsi pola **Transactional Outbox**:
- Checkout kasir menyimpan data transaksi dan event outbox (`outbox_events`) secara atomik dalam satu transaksi database lokal.
- Pengiriman data ke API eksternal SIMKOPDES didelegasikan ke worker background yang berjalan secara asinkron dengan mekanisme *exponential backoff retry*.

## 3. Consequences
- **Positif (+)**: Kasir tetap dapat menyelesaikan transaksi belanja dalam waktu &lt; 50ms tanpa terpengaruh kondisi koneksi atau server eksternal SIMKOPDES.
- **Negatif / Trade-off (-)**: Menambah satu tabel antrean (`outbox_events`) dan worker proses background yang memerlukan pemantauan status antrean.
