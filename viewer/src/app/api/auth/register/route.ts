import { NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  findUserByEmail,
  hashPassword,
  saveUser,
  validatePasswordStrength,
  UserRecord,
} from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Nama minimal 2 karakter' }, { status: 400 });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Format email tidak valid' }, { status: 400 });
    }

    // Validasi Kompleksitas Password (Anti-Brute Force)
    const passValidation = validatePasswordStrength(password);
    if (!passValidation.valid) {
      return NextResponse.json({ error: passValidation.reason }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = findUserByEmail(cleanEmail);
    if (existing) {
      return NextResponse.json(
        { error: 'Email ini sudah terdaftar. Silakan login atau tunggu persetujuan.' },
        { status: 409 }
      );
    }

    // Secure PBKDF2 100k rounds
    const { hash, salt } = hashPassword(password);
    const userId = `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    // Wajib Approval Administrator: Status awal PENDING_APPROVAL
    const newUser: UserRecord = {
      id: userId,
      name: name.trim(),
      email: cleanEmail,
      role: role || 'DEVELOPER',
      status: 'PENDING_APPROVAL',
      passwordHash: hash,
      passwordSalt: salt,
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);

    return NextResponse.json({
      success: true,
      pendingApproval: true,
      message:
        'Pendaftaran berhasil! Akun Anda sedang menunggu persetujuan (approval) dari Administrator sebelum dapat masuk.',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
