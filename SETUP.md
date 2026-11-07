# 🚀 Panduan Setup & Menjalankan Agentic Starter Kit (SpecOS Board)

Panduan ini berisi langkah-langkah instalasi, konfigurasi kredensial, dan cara menjalankan web viewer (Kanban & Document Hub) untuk project **Agentic Starter Kit / Sakti-Agent**.

---

## 📋 Prasyarat Sistem

Pastikan tools berikut sudah terinstall di perangkat Anda:
- **Node.js**: Versi `>= 18.x` (Direkomendasikan v20+)
- **pnpm**: Versi `>= 8.x` (Install via `npm install -g pnpm`)

---

## 🛠️ Langkah Instalasi

1. **Masuk ke direktori project:**
   ```bash
   cd agentic-starter-kit
   ```

2. **Install dependensi di root dan viewer:**
   ```bash
   # Masuk ke folder viewer dan pasang dependensi
   cd viewer && pnpm install
   cd ..
   ```

---

## 🏃 Cara Menjalankan Board Viewer

Jalankan perintah berikut dari root direktori `agentic-starter-kit`:

```bash
pnpm board
```

Server Next.js akan berjalan di:
- **URL Lokal**: `http://localhost:3000` *(atau port alternatif otomatis seperti `http://localhost:3003` jika port 3000 terpakai)*.

---

## 🔐 Kredensial Login Default

Akun default untuk mengakses Board Viewer:

| Keterangan | Nilai |
| :--- | :--- |
| **Email** | `admin@kasirsakti.local` |
| **Password** | `password123` |
| **Role** | `LEAD_DEVELOPER` |

---

## 📂 Struktur Data Lokal

Data user dan backlog kanban disimpan secara lokal pada direktori `data/`:
- `data/users.json` — Database kredensial user lokal.
- `data/backlog.json` — Status task, kanban board, dan acceptance criteria.
- `data/knowledge-graph.json` — Graph dependensi antar modul dan dokumen.

---

## ⚙️ CLI Scripts Bawaan

Selain melalui antarmuka web, Anda dapat mengelola task melalui terminal:

```bash
# Melihat daftar task backlog
node scripts/task.js list

# Menambah task baru
node scripts/task.js add --title "Fitur Contoh" --priority HIGH

# Update status task
node scripts/task.js move <TASK_ID> in_progress
```
