# 📖 Glosarium Istilah Bisnis & Teknis KasirSakti (Glossary)

Glosarium ini menetapkan definisi baku untuk seluruh terminologi agar tercipta pemahaman yang seragam di antara AI Agent, Product Owner, Developer, dan QA.

---

## 🏛️ Terminologi Bisnis & Organisasi
| Istilah | Definisi Baku |
| :--- | :--- |
| **Merchant / Cooperative** | Entitas pemilik usaha tertinggi (penyewa multi-tenant) yang memayungi beberapa cabang outlet. Seluruh data keuangan, pengguna, dan produk terisolasi per `merchant_id`. |
| **Outlet / Cabang** | Lokasi fisik operasional usaha (toko, unit usaha koperasi, gudang) yang memiliki kasir dan stok lokal (`outlet_id`). |
| **Member (Anggota)** | Anggota resmi koperasi yang memiliki Nomor Induk Anggota (NIA), hak simpan pinjam, dan akses fasilitas kasbon tertentu. |
| **Customer (Pelanggan)** | Pelanggan umum pembeli di POS, baik yang terdaftar maupun pembeli anonim (*walk-in customer*). |
| **Kasbon (Deferred Payment)** | Pembelian barang atau jasa secara tempo di kasir dengan pelunasan di masa depan. |
| **Credit Limit** | Batas plafon maksimal akumulasi saldo piutang yang diperkenankan untuk seorang pelanggan/anggota. |
| **Agreement (Perjanjian)** | Dokumen hukum tertulis antara koperasi/merchant dan pelanggan yang memuat klausul pengakuan hutang, jadwal jatuh tempo, dan tanda tangan para pihak. |
| **SIMKOPDES** | Sistem Informasi Koperasi Desa binaan pemerintah/pihak ketiga untuk pelaporan terpusat data koperasi desa. |

---

## 💼 Terminologi Operasional POS & Kasir
| Istilah | Definisi Baku |
| :--- | :--- |
| **Opening Cash (Modal Awal)** | Uang fisik modal receh kasir yang diinput saat membuka laci kasir di awal shift. |
| **Blind Cash Shift Closing** | Prosedur penutupan shift di mana kasir wajib menghitung uang fisik tanpa diperlihatkan nominal ekspektasi sistem guna mencegah manipulasi. |
| **Expected Cash** | Total uang yang seharusnya ada di laci: $\text{Modal Awal} + \text{Penjualan Tunai} - \text{Pengeluaran Kas Operasional}$. |
| **Cash Difference (Selisih Kas)** | Deviasi selisih: $\text{Uang Fisik Kasir} - \text{Expected Cash}$. Bernilai positif jika kas lebih, negatif jika kas kurang. |
| **Petty Cash (Kas Kecil)** | Pengeluaran kas laci kasir untuk kebutuhan mendesak toko (misal: beli es batu, bensin kurir, gas). |
| **Post-Sale Void** | Pembatalan transaksi penjualan yang telah diselesaikan. Wajib menghasilkan reversal journal dan audit log. |

---

## 📦 Terminologi Inventori & Multi-Unit
| Istilah | Definisi Baku |
| :--- | :--- |
| **Base Unit (Unit Dasar)** | Satuan terkecil yang digunakan untuk penghitungan stok gudang (contoh: Pcs, Gram, Mililiter). |
| **Conversion Factor** | Angka pengali untuk mengonversi satuan penjualan/pembelian ke unit dasar (contoh: 1 Dus = 24 Pcs). |
| **Stock Opname** | Pemeriksaan fisik periodik terhadap stok riil gudang yang menghasilkan penyesuaian (*adjustment*) stok. |
| **Stock Transfer** | Pemindahan barang antar outlet dengan alur `PENDING` -> `IN_TRANSIT` -> `RECEIVED`. |
| **BOM (Bill of Materials)** | Formula/resep bahan baku yang otomatis memotong stok komponen saat produk komposit terjual. |

---

## 📊 Terminologi Finansial & Akuntansi
| Istilah | Definisi Baku |
| :--- | :--- |
| **Double-Entry Bookkeeping** | Sistem pencatatan akuntansi berpasangan di mana setiap transaksi menghasilkan debit dan kredit yang nilainya seimbang. |
| **Chart of Accounts (COA)** | Daftar bagan akun yang dikelompokkan menjadi Aset, Kewajiban, Ekuitas, Pendapatan, dan Beban. |
| **Journal Entry** | Catatan pembukuan tunggal yang terdiri atas beberapa baris jurnal (*journal lines*). Bersifat *immutable*. |
| **Reversal Journal** | Jurnal pembalik otomatis untuk menganulir transaksi yang dibatalkan tanpa menghapus jejak audit historis. |
| **HPP (Harga Pokok Penjualan)** | Biaya modal persediaan barang yang terjual pada suatu transaksi. |
