#!/usr/bin/env node

/**
 * Sakti-Agent CLI — Autonomous AI Software Engineering OS Control Plane
 */

const fs = require('fs');
const path = require('path');
const { buildRepoMap, searchSymbols } = require('../intelligence/repository-indexer/indexer');
const { analyzeImpact } = require('../intelligence/impact-analyzer/impact');
const { calculateContextBudget } = require('../engine/context-engine/budget');

const rootDir = path.resolve(__dirname, '..');

function printHelp() {
  console.log(`
🤖 Sakti-Agent CLI — Autonomous AI Software Engineering OS (v2.0)
================================================================
Penggunaan:
  node scripts/sakti.js <command> [arguments...]

Command Tersedia:
  status                     Tampilkan status keseluruhan proyek, active agent & backlog
  inspect <symbol>           Cari deklarasi simbol/fungsi (Symbol-First Protocol)
  impact <file/module>       Analisis dampak perubahan dependensi & estimasi risiko
  context [file1,file2...]   Hitung estimasi token budget dan penggunaan konteks aktif
  handoff <target-role>      Buat artefak serah terima tugas terstruktur di .context/
  repo-map [depth]           Tampilkan struktur direktori tanpa folder sampah (ignored)
  tasks [status]             Shortcut daftar task (delegasi ke scripts/task.js list)

Contoh:
  node scripts/sakti.js inspect NotificationDrawer
  node scripts/sakti.js impact src/lib/storage.ts
  node scripts/sakti.js context AGENTS.md viewer/src/lib/storage.ts
  node scripts/sakti.js handoff solution-architect "Hasil audit notifikasi siap ditindaklanjuti"
  node scripts/sakti.js repo-map 2
`);
}

function handleStatus() {
  const backlogPath = path.join(rootDir, 'data', 'backlog.json');
  let taskCounts = { total: 0, byStatus: {} };

  if (fs.existsSync(backlogPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(backlogPath, 'utf-8'));
      taskCounts.total = (data.tasks || []).length;
      for (const t of data.tasks || []) {
        taskCounts.byStatus[t.status] = (taskCounts.byStatus[t.status] || 0) + 1;
      }
    } catch {
      // ignore
    }
  }

  console.log('\n================================================================');
  console.log('🚀 SAKTI-AGENT: ENGINEERING COMMAND CENTER STATUS');
  console.log('================================================================');
  console.log(`• Project Name     : Sakti-Agent (KasirSakti AI-SEOS)`);
  console.log(`• Operating System : Local-first AI Software Engineering OS`);
  console.log(`• Total Backlog    : ${taskCounts.total} tasks`);
  console.log('• Status Breakdown :');
  for (const [st, count] of Object.entries(taskCounts.byStatus)) {
    console.log(`    - ${st.padEnd(16)}: ${count}`);
  }
  console.log('• Canonical Agents : 12 active specialists (/orc, /pm, /ba, /dev, /qa, etc.)');
  console.log('• Token Policy     : Default Budget 16k tokens, 7-Level Progressive Disclosure');
  console.log('================================================================\n');
}

function handleInspect(query) {
  if (!query) {
    console.error('[ERROR] Harap berikan nama simbol yang ingin dicari.');
    console.error('Contoh: node scripts/sakti.js inspect NotificationDrawer');
    process.exit(1);
  }

  console.log(`\n🔍 Mencari simbol "${query}" (Symbol-First Protocol)...`);
  const matches = searchSymbols(rootDir, query, 15);

  if (matches.length === 0) {
    console.log(`[INFO] Tidak ditemukan deklarasi yang cocok untuk "${query}".`);
    return;
  }

  console.log(`[OK] Ditemukan ${matches.length} referensi relevan:\n`);
  for (const m of matches) {
    console.log(`  📄 ${m.file}:${m.line}`);
    console.log(`     └─ ${m.snippet}`);
  }
  console.log('\n💡 Rekomendasi: Gunakan Region Read untuk membaca baris spesifik di atas (hemat token).\n');
}

function handleImpact(target) {
  if (!target) {
    console.error('[ERROR] Harap masukkan file/modul target untuk dianalisis.');
    console.error('Contoh: node scripts/sakti.js impact viewer/src/lib/storage.ts');
    process.exit(1);
  }

  console.log(`\n⚡ Menganalisis dampak perubahan pada "${target}"...`);
  const analysis = analyzeImpact(rootDir, target);

  console.log('================================================================');
  console.log(`🎯 TARGET           : ${analysis.target}`);
  console.log(`⚠️  RISK LEVEL      : [${analysis.risk}]`);
  console.log('================================================================');

  if (analysis.directDependencies.length > 0) {
    console.log('\n🔗 Modul/File Terdampak Langsung:');
    analysis.directDependencies.forEach((dep) => console.log(`   - ${dep}`));
  } else {
    console.log('\n🔗 Tidak ada dependensi langsung yang terdeteksi.');
  }

  if (analysis.affectedTests.length > 0) {
    console.log('\n🧪 Test Suites yang Wajib Dijalankan (Regression Guard):');
    analysis.affectedTests.forEach((t) => console.log(`   - ${t}`));
  }

  if (analysis.affectedDocs.length > 0) {
    console.log('\n📚 Dokumen Spesifikasi yang Terkait:');
    analysis.affectedDocs.forEach((d) => console.log(`   - ${d}`));
  }

  console.log('\n================================================================\n');
}

function handleContext(files = []) {
  console.log('\n📊 Menghitung Estimasi Alokasi Token Konteks...');
  const activeFiles = files.length > 0 ? files : ['AGENTS.md', 'package.json'];
  const res = calculateContextBudget(rootDir, activeFiles);

  console.log('================================================================');
  console.log(`• Total Estimasi Token : ${res.totalTokens.toLocaleString()} tokens`);
  console.log(`• Default Budget       : ${res.defaultBudget.toLocaleString()} tokens`);
  console.log(`• Utilisasi Konteks    : ${res.utilizationPercent}%`);
  console.log(`• Status Tekanan       : ${res.isUnderPressure ? '⚠️ HIGH PRESSURE' : '✅ AMAN (SAFE)'}`);
  console.log(`• Catatan/Saran        : ${res.recommendation}`);
  console.log('================================================================');

  if (res.breakdown.length > 0) {
    console.log('\nRincian Token per File:');
    res.breakdown.forEach((b) => {
      console.log(`  - ${b.file.padEnd(35)} : ~${b.tokens.toLocaleString()} tokens`);
    });
  }
  console.log('\n');
}

function handleHandoff(targetRole, summary = '') {
  if (!targetRole) {
    console.error('[ERROR] Format: node scripts/sakti.js handoff <TARGET_ROLE> [RINGKASAN]');
    console.error('Contoh: node scripts/sakti.js handoff solution-architect "Review routing notifikasi"');
    process.exit(1);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const artifactName = `handoff-${targetRole}-${timestamp}.json`;
  const contextDir = path.join(rootDir, '.context');

  if (!fs.existsSync(contextDir)) {
    fs.mkdirSync(contextDir, { recursive: true });
  }

  const payload = {
    target_role: targetRole,
    created_at: new Date().toISOString(),
    summary: summary || 'Delegasi task lanjutan tanpa scan ulang repository',
    status: 'READY_FOR_NEXT_AGENT',
    protocol: 'Context Reuse (Token Economy)',
  };

  const artifactPath = path.join(contextDir, artifactName);
  fs.writeFileSync(artifactPath, JSON.stringify(payload, null, 2), 'utf-8');

  console.log(`\n✅ Artefak Handoff berhasil dibuat di:`);
  console.log(`   ${path.relative(rootDir, artifactPath)}`);
  console.log(`\n💡 Agen downstream (@${targetRole}) dapat langsung membaca file ini tanpa rescan repo.\n`);
}

function handleRepoMap(depthStr = '3') {
  const depth = parseInt(depthStr, 10) || 3;
  console.log(`\n🗺️  Membuat Repository Map (Maks. Depth: ${depth})...\n`);
  const map = buildRepoMap(rootDir, depth);

  function printTree(node, indent = '') {
    if (!node) return;
    if (node.type === 'directory') {
      console.log(`${indent}📁 ${node.name}/`);
      for (const child of node.children || []) {
        printTree(child, indent + '  ');
      }
    } else {
      console.log(`${indent}📄 ${node.name} (${Math.round(node.size / 1024)} KB)`);
    }
  }

  printTree(map);
  console.log('\n');
}

// Router
const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase() : null;

if (!command || command === 'help' || command === '--help' || command === '-h') {
  printHelp();
} else if (command === 'status') {
  handleStatus();
} else if (command === 'inspect' || command === 'search') {
  handleInspect(args[1]);
} else if (command === 'impact') {
  handleImpact(args[1]);
} else if (command === 'context' || command === 'budget') {
  handleContext(args.slice(1));
} else if (command === 'handoff') {
  handleHandoff(args[1], args.slice(2).join(' '));
} else if (command === 'repo-map' || command === 'map') {
  handleRepoMap(args[1]);
} else if (command === 'tasks' || command === 'task') {
  require('./task.js');
} else {
  console.error(`[ERROR] Perintah tidak dikenal: "${command}"`);
  printHelp();
  process.exit(1);
}
