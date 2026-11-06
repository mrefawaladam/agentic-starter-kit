---
id: SCR-SHIFT-001
title: Spesifikasi Layar — Modal Buka & Tutup Shift Kasir (Blind Cash Closing)
type: screen-spec
status: APPROVED
owner: UI/UX Agent
related_features:
  - FEAT-POS-001
related_use_cases:
  - UC-POS-002
---

# 🖥️ SCR-SHIFT-001: Modal Buka & Tutup Shift Kasir (Blind Cash Closing)

## 1. Tujuan Layar
Menyediakan antarmuka pembukaan shift (input modal awal) dan penutupan shift kasir berprinsip *Blind Cash Closing* (kasir menginput fisik uang tanpa mengetahui nominal ekspektasi sistem).

---

## 2. Pemetaan Komponen Frontend (`kasirsakti-fe/`)
- **Komponen Modal**: `src/components/modals/ShiftModal.tsx` (`rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl p-6`)
- **State Store**: `src/store/useShiftStore.ts`
- **Service API**: `src/services/shiftService.ts` (`POST /api/v1/finance/shifts/open`, `POST /api/v1/finance/shifts/close`)

---

## 3. Komponen Antarmuka Tutup Shift (Blind Count)
1. **Input Uang Fisik Laci**:
   - Kolom `closing_cash`: Input angka besar dengan font Tourney.
   - Papan rincian pecahan uang (opsional: lembaran 100k, 50k, 20k, dst).
2. **Catatan Kasir**:
   - Textarea keterangan kondisi pergantian shift.
3. **Pemberitahuan Tegas**:
   - Banner informasi: *"Harap hitung seluruh fisik uang kertas dan koin di laci kasir sebelum menekan tombol konfirmasi. Angka penjualan sistem akan dihitung secara otomatis setelah submit."*
4. **Tombol Konfirmasi**:
   - `button className="w-full py-3 bg-[#0052FF] text-white font-bold rounded-full shadow-md shadow-[#0052FF]/25"`
