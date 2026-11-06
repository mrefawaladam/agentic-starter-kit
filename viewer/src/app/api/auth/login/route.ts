import { NextResponse } from 'next/server';
import {
  findUserByEmail,
  verifyPassword,
  createSessionToken,
  toPublicUser,
  SESSION_COOKIE_NAME,
} from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 });
    }

    const user = findUserByEmail(email.trim());
    if (!user) {
      return NextResponse.json({ error: 'Akun dengan email ini tidak ditemukan' }, { status: 401 });
    }

    const isValid = verifyPassword(password, user.passwordHash, user.passwordSalt);
    if (!isValid) {
      return NextResponse.json({ error: 'Password yang Anda masukkan salah' }, { status: 401 });
    }

    // Cek status persetujuan akun oleh Administrator
    if (user.status === 'PENDING_APPROVAL') {
      return NextResponse.json(
        {
          error:
            'Akun Anda masih menunggu persetujuan (approval) dari Administrator. Silakan hubungi admin untuk aktivasi.',
        },
        { status: 403 }
      );
    }

    if (user.status === 'REJECTED') {
      return NextResponse.json(
        {
          error:
            'Pendaftaran akun Anda ditolak oleh Administrator. Hubungi administrator sistem.',
        },
        { status: 403 }
      );
    }

    const token = createSessionToken(user.id);
    const response = NextResponse.json({
      success: true,
      user: toPublicUser(user),
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 14 * 24 * 60 * 60, // 14 days
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
