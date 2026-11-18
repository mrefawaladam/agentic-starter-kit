.PHONY: help board board-build board-start sakti-status sakti-inspect sakti-impact sakti-context sakti-handoff sakti-map task-list task-get task-status task-check task-report git-status git-branch git-log

# Default target
help:
	@echo "🤖 Sakti-Agent AI-SEOS 2.0 — Makefile Commands"
	@echo "==============================================="
	@echo "1. Dashboard & Viewer:"
	@echo "   make board                  Jalankan Dashboard Viewer dev server (http://localhost:3000)"
	@echo "   make board-build            Build production Next.js viewer"
	@echo "   make board-start            Jalankan Next.js viewer mode production"
	@echo ""
	@echo "2. Repository Intelligence & Token Economy:"
	@echo "   make sakti-status           Cek status kesehatan AI-SEOS, backlog & agents"
	@echo "   make sakti-inspect SYMBOL=x Cari definisi simbol/fungsi (Symbol-First Protocol)"
	@echo "   make sakti-impact FILE=x    Analisis modul terdampak & estimasi risiko perubahan"
	@echo "   make sakti-context FILES=x  Hitung estimasi token budget (16k token limit)"
	@echo "   make sakti-handoff ROLE=x SUMMARY=\"...\"  Buat artefak serah terima di .context/"
	@echo "   make sakti-map [DEPTH=2]    Tampilkan struktur repository tanpa folder sampah"
	@echo ""
	@echo "3. Task Lifecycle & Readiness Gates 2.0:"
	@echo "   make task-list [STATUS=x]   Daftar semua task kanban (opsional filter status)"
	@echo "   make task-get ID=x          Baca rincian spesifikasi lengkap sebuah task"
	@echo "   make task-status ID=x GATE=x Perbarui status task ke gate berikutnya"
	@echo "   make task-check ID=x AC=x   Centang kriteria penerimaan (Acceptance Criteria)"
	@echo "   make task-report ID=x RES=x SUM=\"...\" [BY=x] Simpan laporan QA & bukti pengujian"
	@echo ""
	@echo "4. Git & Branch Control:"
	@echo "   make git-status             Cek status working directory git"
	@echo "   make git-branch             Tampilkan daftar branch aktif"
	@echo "   make git-log                Lihat riwayat commit terbaru"
	@echo "==============================================="

# 1. Dashboard & Viewer
board:
	cd viewer && pnpm dev

board-build:
	cd viewer && pnpm build

board-start:
	cd viewer && pnpm start

# 2. Sakti CLI Commands
sakti-status:
	node scripts/sakti.js status

sakti-inspect:
	@if [ -z "$(SYMBOL)" ]; then echo "❌ Error: Harap sertakan SYMBOL. Contoh: make sakti-inspect SYMBOL=calculateContextBudget"; exit 1; fi
	node scripts/sakti.js inspect $(SYMBOL)

sakti-impact:
	@if [ -z "$(FILE)" ]; then echo "❌ Error: Harap sertakan FILE. Contoh: make sakti-impact FILE=viewer/src/lib/storage.ts"; exit 1; fi
	node scripts/sakti.js impact $(FILE)

sakti-context:
	node scripts/sakti.js context $(FILES)

sakti-handoff:
	@if [ -z "$(ROLE)" ]; then echo "❌ Error: Harap sertakan ROLE. Contoh: make sakti-handoff ROLE=solution-architect SUMMARY=\"Review routing\""; exit 1; fi
	node scripts/sakti.js handoff $(ROLE) "$(SUMMARY)"

sakti-map:
	node scripts/sakti.js repo-map $(or $(DEPTH),2)

# 3. Task Lifecycle Management
task-list:
	node scripts/task.js list $(STATUS)

task-get:
	@if [ -z "$(ID)" ]; then echo "❌ Error: Harap sertakan ID. Contoh: make task-get ID=TASK-POS-001"; exit 1; fi
	node scripts/task.js get $(ID)

task-status:
	@if [ -z "$(ID)" ] || [ -z "$(GATE)" ]; then echo "❌ Error: Format: make task-status ID=TASK-001 GATE=ready_for_dev"; exit 1; fi
	node scripts/task.js set-status $(ID) $(GATE)

task-check:
	@if [ -z "$(ID)" ] || [ -z "$(AC)" ]; then echo "❌ Error: Format: make task-check ID=TASK-001 AC=AC-1"; exit 1; fi
	node scripts/task.js check-ac $(ID) $(AC)

task-report:
	@if [ -z "$(ID)" ] || [ -z "$(RES)" ] || [ -z "$(SUM)" ]; then echo "❌ Error: Format: make task-report ID=TASK-001 RES=passed SUM=\"Semua AC lolos\" [BY=\"QA Specialist\"]"; exit 1; fi
	node scripts/task.js report $(ID) $(RES) "$(SUM)" "$(or $(BY),QA Specialist)"

# 4. Git & Branch Management
git-status:
	git status

git-branch:
	git branch -vv

git-log:
	git log --oneline -n 10
