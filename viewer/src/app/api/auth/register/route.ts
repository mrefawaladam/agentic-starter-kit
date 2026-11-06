import { NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  findUserByEmail,
  hashPassword,
  saveUser,
  createSessionToken,
  toPublicUser,
  SESSION_COOKIE_NAME,
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

    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password minimal 6 karakter' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = findUserByEmail(cleanEmail);
    if (existing) {
      return NextResponse.json(
        { error: 'Email ini sudah terdaftar. Silakan login atau gunakan email lain.' },
        { status: 409 }
      );
    }

    const { hash, salt } = hashPassword(password);
    const userId = `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    const newUser: UserRecord = {
      id: userId,
      name: name.trim(),
      email: cleanEmail,
      role: role || 'DEVELOPER',
      passwordHash: hash,
      passwordSalt: salt,
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);

    const token = createSessionToken(userId);
    const response = NextResponse.json({
      success: true,
      user: toPublicUser(newUser),
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 14 * 24 * 60 * 60,
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
