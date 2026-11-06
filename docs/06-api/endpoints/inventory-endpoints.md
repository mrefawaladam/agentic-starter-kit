# 📦 API Endpoints: Katalog & Inventori

Kumpulan endpoint pengelolaan produk, stok outlet, dan mutasi barang.

---

## 1. GET `/api/v1/products`
- **Deskripsi**: Mengambil daftar produk berdasarkan outlet dengan paginasi.
- **Query Params**: `outlet_id`, `category_id`, `search`, `page`, `limit`.

---

## 2. POST `/api/v1/products/stocks/adjustment`
- **Deskripsi**: Melakukan penyesuaian stok fisik hasil stock opname.
- **Request Body**:
  ```json
  {
    "outlet_id": 1,
    "variant_id": 12,
    "actual_quantity": 48,
    "reason": "Stock opname bulanan - 2 pcs rusak kena tikus"
  }
  ```
