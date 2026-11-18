# QA Evidence & Test Artifacts Repository

Direktori ini digunakan untuk menyimpan seluruh bukti pengujian QA, termasuk:
1. **Screenshots** (`.png`, `.jpg`, `.webp`) dari hasil pengetesan visual UI / Playwright E2E.
2. **Execution Logs** (`.log`, `.txt`) dari unit test, integration test, atau k6 load testing.
3. **Report HTML/JSON** dari Playwright HTML report, Pact verification, atau test coverage.

## Standar Penamaan File Bukti Pengujian
Format:
- `evidence-[TASK-ID]-[timestamp].[ext]`
Contoh:
- `evidence-TASK-POS-001-login-success.png`
- `evidence-TASK-POS-001-e2e-run.log`
