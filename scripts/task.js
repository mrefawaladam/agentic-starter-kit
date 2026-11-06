#!/usr/bin/env node

/**
 * Task Management & Spec Reader CLI Utility
 * 
 * Digunakan oleh Human Developer dan AI Agents (seperti Antigravity, Claude, Cursor)
 * untuk membaca spesifikasi task, memeriksa kriteria penerimaan, dan memperbarui status
 * secara hemat token tanpa perlu memindai seluruh repository.
 * 
 * Penggunaan:
 *   node scripts/task.js list [status]
 *   node scripts/task.js get <TASK-ID>
 *   node scripts/task.js set-status <TASK-ID> <new-status>
 *   node scripts/task.js check-ac <TASK-ID> <AC-ID>
 */

const fs = require('fs');
const path = require('path');

const BACKLOG_PATH = path.join(__dirname, '..', 'data', 'backlog.json');

function loadBacklog() {
  if (!fs.existsSync(BACKLOG_PATH)) {
    console.error(`[ERROR] File backlog.json tidak ditemukan di: ${BACKLOG_PATH}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(BACKLOG_PATH, 'utf-8'));
}

function saveBacklog(data) {
  fs.writeFileSync(BACKLOG_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function printUsage() {
  console.log(`
KasirSakti / Agentic Starter Kit — Task Management Utility
==========================================================
Perintah yang tersedia:
  node scripts/task.js list [status]             Daftar semua task (opsional filter status)
  node scripts/task.js get <TASK-ID>             Baca spesifikasi lengkap sebuah task
  node scripts/task.js set-status <ID> <STATUS>  Perbarui status task (misal: in_progress, in_qa, done)
  node scripts/task.js check-ac <ID> <AC-ID>     Tandai acceptance criteria sebagai selesai

Contoh:
  node scripts/task.js get TASK-POS-002
  node scripts/task.js set-status TASK-POS-002 in_progress
  node scripts/task.js check-ac TASK-POS-002 AC-POS-005
`);
}

function listTasks(statusFilter) {
  const data = loadBacklog();
  const filter = statusFilter ? statusFilter.toLowerCase() : null;

  console.log(`\n📋 Daftar Task Kanban (${data.project_name}):`);
  console.log('--------------------------------------------------------------------------------');

  const filtered = filter
    ? data.tasks.filter((t) => t.status.toLowerCase() === filter)
    : data.tasks;

  if (filtered.length === 0) {
    console.log(`Tidak ada task dengan filter status '${statusFilter}'.`);
    return;
  }

  filtered.forEach((t) => {
    const acTotal = t.acceptance_criteria ? t.acceptance_criteria.length : 0;
    const acDone = t.acceptance_criteria ? t.acceptance_criteria.filter((a) => a.checked).length : 0;
    const acStr = acTotal > 0 ? `[AC: ${acDone}/${acTotal}]` : '';

    console.log(
      `• [${t.id}] (${t.priority}) [${t.status.toUpperCase()}] ${t.title}`
    );
    console.log(
      `   Kode: ${t.code} | Assignee: ${t.assignee || 'Unassigned'} | SP: ${t.story_points ?? '-'} ${acStr}`
    );
  });
  console.log('--------------------------------------------------------------------------------\n');
}

function getTask(taskId) {
  if (!taskId) {
    console.error('[ERROR] Mohon masukkan ID task. Contoh: node scripts/task.js get TASK-POS-001');
    process.exit(1);
  }

  const data = loadBacklog();
  const task = data.tasks.find(
    (t) => t.id.toLowerCase() === taskId.toLowerCase() || t.code.toLowerCase() === taskId.toLowerCase()
  );

  if (!task) {
    console.error(`[ERROR] Task dengan ID atau Kode '${taskId}' tidak ditemukan di backlog.`);
    process.exit(1);
  }

  console.log(`\n================================================================================`);
  console.log(`🎯 TASK SPESIFIKASI: [${task.id}] ${task.title}`);
  console.log(`================================================================================`);
  console.log(`• Task ID        : ${task.id}`);
  console.log(`• Feature Code   : ${task.code}`);
  console.log(`• Status         : ${task.status.toUpperCase()}`);
  console.log(`• Priority       : ${task.priority}`);
  console.log(`• Type           : ${task.type}`);
  console.log(`• Assignee       : ${task.assignee || 'Unassigned'}`);
  console.log(`• Story Points   : ${task.story_points ?? '-'}`);
  console.log(`• Tags           : ${task.tags ? task.tags.join(', ') : '-'}`);
  console.log(`• Spec File Path : ${task.spec_file || '-'}`);

  if (task.document_references && task.document_references.length > 0) {
    console.log(`\n📚 Dokumen Referensi Terkait:`);
    task.document_references.forEach((ref) => {
      console.log(`  - [${(ref.type || 'DOC').toUpperCase()}] ${ref.title}: ${ref.path}`);
    });
  }

  if (task.acceptance_criteria && task.acceptance_criteria.length > 0) {
    console.log(`\n✅ Acceptance Criteria (BDD):`);
    task.acceptance_criteria.forEach((ac) => {
      const box = ac.checked ? '[x]' : '[ ]';
      console.log(`  ${box} ${ac.id}: ${ac.text}`);
    });
  }

  // Tampilkan isi file spesifikasi jika ada
  if (task.spec_file) {
    const fullSpecPath = path.join(__dirname, '..', task.spec_file);
    if (fs.existsSync(fullSpecPath)) {
      console.log(`\n📄 Isi Dokumen Spesifikasi (${task.spec_file}):`);
      console.log('--------------------------------------------------------------------------------');
      const content = fs.readFileSync(fullSpecPath, 'utf-8');
      console.log(content);
      console.log('--------------------------------------------------------------------------------');
    } else {
      console.log(`\n[WARN] File spesifikasi fisik di '${task.spec_file}' belum ditemukan.`);
    }
  }

  console.log(`================================================================================\n`);
}

function setTaskStatus(taskId, newStatus) {
  if (!taskId || !newStatus) {
    console.error('[ERROR] Parameter tidak lengkap. Format: node scripts/task.js set-status <TASK-ID> <NEW-STATUS>');
    process.exit(1);
  }

  const validStatuses = ['backlog', 'spec_drafting', 'in_review', 'ready_for_dev', 'in_progress', 'in_qa', 'done'];
  const normStatus = newStatus.toLowerCase();
  if (!validStatuses.includes(normStatus)) {
    console.error(`[ERROR] Status '${newStatus}' tidak valid. Pilihan status: ${validStatuses.join(', ')}`);
    process.exit(1);
  }

  const data = loadBacklog();
  const task = data.tasks.find((t) => t.id.toLowerCase() === taskId.toLowerCase());
  if (!task) {
    console.error(`[ERROR] Task '${taskId}' tidak ditemukan.`);
    process.exit(1);
  }

  const oldStatus = task.status;
  task.status = normStatus;
  task.updated_at = new Date().toISOString();
  saveBacklog(data);

  console.log(`[OK] Status task '${task.id}' berhasil diubah dari '${oldStatus}' ➔ '${normStatus}'.`);
}

function checkAC(taskId, acId) {
  if (!taskId || !acId) {
    console.error('[ERROR] Format: node scripts/task.js check-ac <TASK-ID> <AC-ID>');
    process.exit(1);
  }

  const data = loadBacklog();
  const task = data.tasks.find((t) => t.id.toLowerCase() === taskId.toLowerCase());
  if (!task) {
    console.error(`[ERROR] Task '${taskId}' tidak ditemukan.`);
    process.exit(1);
  }

  if (!task.acceptance_criteria) {
    console.error(`[ERROR] Task '${taskId}' tidak memiliki Acceptance Criteria.`);
    process.exit(1);
  }

  const ac = task.acceptance_criteria.find((a) => a.id.toLowerCase() === acId.toLowerCase());
  if (!ac) {
    console.error(`[ERROR] Acceptance criterion '${acId}' tidak ditemukan di task '${taskId}'.`);
    process.exit(1);
  }

  ac.checked = !ac.checked;
  task.updated_at = new Date().toISOString();
  saveBacklog(data);

  console.log(`[OK] Kriteria '${ac.id}' pada task '${task.id}' sekarang berstatus: ${ac.checked ? 'SELESAI [x]' : 'BELUM [ ]'}.`);
}

// Router CLI
const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase() : null;

if (!command || command === 'help' || command === '--help' || command === '-h') {
  printUsage();
} else if (command === 'list') {
  listTasks(args[1]);
} else if (command === 'get' || command === 'read') {
  getTask(args[1]);
} else if (command === 'set-status') {
  setTaskStatus(args[1], args[2]);
} else if (command === 'check-ac') {
  checkAC(args[1], args[2]);
} else {
  // Jika argumen langsung berupa TASK-ID, anggap sebagai 'get'
  if (command.toUpperCase().startsWith('TASK-') || command.toUpperCase().startsWith('FEAT-')) {
    getTask(args[0]);
  } else {
    console.error(`[ERROR] Perintah '${command}' tidak dikenali.`);
    printUsage();
  }
}
