# 🎨 Katalog UI Skills (Referensi https://www.ui-skills.com/)

Dokumen ini mendokumentasikan seluruh aturan dan paket skill dari ekosistem **[UI Skills](https://www.ui-skills.com/)** (`ibelick/ui-skills`) yang diadopsi sebagai standar desain rekayasa antarmuka di proyek ini.

---

## 📋 Ringkasan 6 Paket Skill

| Nama Skill | Fokus Utama | Aturan Kunci |
| :--- | :--- | :--- |
| **`baseline-ui`** | Batasan Tailwind & Interaksi Dasar | Mikro-interaksi < 200ms, compositor-only props, `text-balance`, `tabular-nums`, spasi 8pt, touch target 44px. |
| **`improve-ui`** | Visual Audit & Craft Polish | Visual restraint, bayangan berlapis halus (*layered elevation*), kontras tajam WCAG AA/AAA. |
| **`fixing-accessibility`** | Aksesibilitas Web (a11y) | Semantic HTML, accessible name (`aria-label`), keyboard navigation, modal focus trap, form error linking. |
| **`fixing-motion-performance`** | Performa Animasi 60 FPS | Zero layout thrashing, hindari animasi width/height, spring physics, support `prefers-reduced-motion`. |
| **`fixing-metadata`** | SEO & Social Sharing | Open Graph tags, Twitter card, favicon manifest, canonical URL, JSON-LD structured data. |
| **`ui-skills-root`** | Routing Konteks AI | Prinsip "Less is More" (1-2 skill fokus per prompt), spesifisitas tinggi tanpa generic advice. |

---

## 🛠️ Checklist Kepatuhan Komponen UI

Setiap komponen yang dibuat oleh tim atau AI harus lolos checklist berikut:

- [ ] **Interaksi Mikro Cepat**: Transisi klik/hover menggunakan `duration-150` atau `duration-200`.
- [ ] **GPU Compositor**: Animasi hanya mengubah `transform` dan `opacity`.
- [ ] **Tipografi Seimbang**: Heading menggunakan `text-balance`, angka menggunakan `tabular-nums` atau `font-mono`.
- [ ] **Focus Ring Nyata**: Elemen interaktif memiliki ring fokus saat ditekan tombol `Tab` (`focus-visible:ring-2`).
- [ ] **Aksesibilitas Ikon**: Tombol tanpa teks selalu memiliki `aria-label` atau `title`.
- [ ] **Touch Target Mobile**: Ukuran tombol mobile minimal 44x44px.
- [ ] **Elevation Halus**: Bayangan kartu menggunakan warna multi-layer transparan, bukan hitam pekat.
