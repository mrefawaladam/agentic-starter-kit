# ✅ Acceptance Criteria: FEAT-POS-003 (Bill of Materials & Resep)

## `AC-BOM-001`: Penjualan Menu Ber-Resep Memotong Bahan Baku Sesuai Porsi
```gherkin
Given Produk "Kopi Susu Aren" memiliki formula resep BOM:
      | Bahan Baku | Varian | Kebutuhan per Porsi | Satuan |
      | Biji Kopi Robusta | Espresso Blend | 15 | Gram |
      | Susu Segar UHT | Full Cream | 100 | Mililiter |
      | Gula Aren Cair | Organik | 20 | Mililiter |
      | Cup Dingin 12oz | Polos | 1 | Pcs |
  And Saldo stok Biji Kopi di Outlet adalah 1.000 Gram dan Susu Segar adalah 2.000 Mililiter
 When Kasir memproses checkout 2 cup "Kopi Susu Aren"
 Then Sistem memotong stok Biji Kopi sebanyak 30 Gram (sisa: 970 Gram)
  And Sistem memotong stok Susu Segar sebanyak 200 Mililiter (sisa: 1.800 Mililiter)
  And Sistem memotong stok Gula Aren sebanyak 40 Mililiter
  And Sistem memotong stok Cup Dingin sebanyak 2 Pcs
  And Setiap pemotongan tercatat di stock_movements dengan tipe OUT_RECIPE_BOM
```

## `AC-BOM-002`: Penjualan dengan Peringatan Stok Minus Saat Bahan Baku Habis
```gherkin
Given Saldo stok Cup Dingin 12oz di Outlet tersisa 0 Pcs
 When Kasir memproses checkout 2 cup "Kopi Susu Aren"
 Then Transaksi kasir tetap berhasil dengan status COMPLETED
  And Saldo stok Cup Dingin 12oz berkurang menjadi -2 Pcs di outlet_inventory
  And Respons transaksi menyertakan field warning "INSUFFICIENT_STOCK: Cup Dingin 12oz tersisa minus (-2)"
  And Sistem mencatat log audit peringatan inventori untuk kebutuhan restock
```

## `AC-BOM-003`: Pemulihan Stok Bahan Baku Saat Void Transaksi
```gherkin
Given Transaksi TRX-202 memuat 2 cup "Kopi Susu Aren" yang telah memotong 30 Gram Biji Kopi dan 200 Mililiter Susu
 When Supervisor melakukan void pada transaksi TRX-202 dengan alasan valid
 Then Saldo Biji Kopi di outlet bertambah kembali sebesar 30 Gram
  And Saldo Susu Segar di outlet bertambah kembali sebesar 200 Mililiter
  And Kartu stok mencatat mutasi IN_RECIPE_RESTORE
```
