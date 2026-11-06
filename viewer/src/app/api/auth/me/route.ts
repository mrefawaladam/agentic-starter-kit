import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, findUserById, toPublicUser, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const userId = verifySessionToken(token);
    if (!userId) {
      return NextResponse.json({ user: null });
    }

    const user = findUserById(userId);
    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: toPublicUser(user) });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
