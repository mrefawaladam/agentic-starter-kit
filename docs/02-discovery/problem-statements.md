# Discovery: Problem Statements & Assumptions

## 1. Problem Statements
1. **Unconstrained AI Coding**: Developer sering meminta AI menulis kode tanpa batasan requirement, menghasilkan kode yang tidak konsisten dan sulit dirawat.
2. **Context Drift**: Model AI melupakan aturan bisnis antar percakapan chat.
3. **Heavy Tooling Overhead**: Kebanyakan issue tracker (Jira/Linear) terpisah dari repository file lokal, sehingga sinkronisasi dokumen menjadi membosankan.

## 2. Core Assumptions
- Developer menginginkan antarmuka yang cepat di localhost tanpa perlu registrasi cloud atau setup Docker berat.
- AI Agent bekerja jauh lebih akurat jika diberikan file spesifikasi terstruktur sebelum menulis kode.
