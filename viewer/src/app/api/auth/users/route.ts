import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  getAllUsers,
  findUserById,
  saveUsers,
  verifySessionToken,
  toPublicUser,
  SESSION_COOKIE_NAME,
} from '@/lib/auth';

// GET: List all users for Administrator
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = verifySessionToken(token);
    if (!userId) {
      return NextResponse.json({ error: 'Sesi tidak valid' }, { status: 401 });
    }

    const currentUser = findUserById(userId);
    if (!currentUser) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan' }, { status: 401 });
    }

    const isAdmin =
      currentUser.role === 'ADMINISTRATOR' ||
      currentUser.role === 'LEAD_DEVELOPER' ||
      currentUser.id === 'usr_default_admin';

    if (!isAdmin) {
      return NextResponse.json({ error: 'Akses ditolak: Hanya Administrator' }, { status: 403 });
    }

    const users = getAllUsers().map(toPublicUser);
    return NextResponse.json({ users });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH: Approve / Reject user
export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = verifySessionToken(token);
    if (!userId) {
      return NextResponse.json({ error: 'Sesi tidak valid' }, { status: 401 });
    }

    const currentUser = findUserById(userId);
    const isAdmin =
      currentUser &&
      (currentUser.role === 'ADMINISTRATOR' ||
        currentUser.role === 'LEAD_DEVELOPER' ||
        currentUser.id === 'usr_default_admin');

    if (!isAdmin) {
      return NextResponse.json({ error: 'Akses ditolak: Hanya Administrator' }, { status: 403 });
    }

    const body = await req.json();
    const { targetUserId, action } = body; // action: 'APPROVE' | 'REJECT' | 'DELETE'

    if (!targetUserId || !action) {
      return NextResponse.json({ error: 'Parameter tidak lengkap' }, { status: 400 });
    }

    if (targetUserId === 'usr_default_admin') {
      return NextResponse.json({ error: 'Tidak dapat mengubah akun default admin' }, { status: 400 });
    }

    const users = getAllUsers();
    const targetIdx = users.findIndex((u) => u.id === targetUserId);
    if (targetIdx === -1) {
      return NextResponse.json({ error: 'Target user tidak ditemukan' }, { status: 404 });
    }

    if (action === 'APPROVE') {
      users[targetIdx].status = 'ACTIVE';
    } else if (action === 'REJECT') {
      users[targetIdx].status = 'REJECTED';
    } else if (action === 'DELETE') {
      users.splice(targetIdx, 1);
    } else {
      return NextResponse.json({ error: 'Aksi tidak valid' }, { status: 400 });
    }

    saveUsers(users);

    return NextResponse.json({
      success: true,
      message: `User berhasil di-${action.toLowerCase()}`,
      users: users.map(toPublicUser),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
