import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getProjectRoot } from './storage';
import { PublicUser, DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from './auth-types';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
}

export type { PublicUser };

const SESSION_SECRET = process.env.SESSION_SECRET || 'kasirsakti-specos-local-auth-secret-key-2026';
const SESSION_COOKIE_NAME = 'specos_session';

function getUsersFilePath(): string {
  const root = getProjectRoot();
  return path.join(root, 'data', 'users.json');
}

export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, actualSalt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt: actualSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const computed = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(hash));
  } catch {
    return false;
  }
}

export function getAllUsers(): UserRecord[] {
  const filePath = getUsersFilePath();
  if (!fs.existsSync(filePath)) {
    // Initialize with default admin user
    const defaultSalt = crypto.randomBytes(16).toString('hex');
    const { hash } = hashPassword(DEFAULT_USER_PASSWORD, defaultSalt);

    const defaultUser: UserRecord = {
      id: 'usr_default_admin',
      name: 'Lead Developer',
      email: DEFAULT_USER_EMAIL,
      role: 'LEAD_DEVELOPER',
      passwordHash: hash,
      passwordSalt: defaultSalt,
      createdAt: new Date().toISOString(),
    };

    const initialData = [defaultUser];
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const users: UserRecord[] = JSON.parse(raw);
    return users;
  } catch (err) {
    console.error('Error reading users.json:', err);
    return [];
  }
}

export function saveUser(user: UserRecord): void {
  const users = getAllUsers();
  const existingIdx = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());

  if (existingIdx >= 0) {
    users[existingIdx] = user;
  } else {
    users.push(user);
  }

  const filePath = getUsersFilePath();
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
}

export function findUserByEmail(email: string): UserRecord | null {
  const users = getAllUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function findUserById(id: string): UserRecord | null {
  const users = getAllUsers();
  return users.find((u) => u.id === id) || null;
}

export function toPublicUser(user: UserRecord): PublicUser {
  const { passwordHash, passwordSalt, ...pub } = user;
  return pub;
}

// Session token utilities (Stateless HMAC-signed token)
export function createSessionToken(userId: string): string {
  const timestamp = Date.now();
  const payload = `${userId}:${timestamp}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return `${payload}:${signature}`;
}

export function verifySessionToken(token: string): string | null {
  if (!token) return null;
  const parts = token.split(':');
  if (parts.length !== 3) return null;

  const [userId, timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return null;

  // Max age: 14 days
  const maxAgeMs = 14 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > maxAgeMs) return null;

  const payload = `${userId}:${timestampStr}`;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  return userId;
}

export { SESSION_COOKIE_NAME, DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD };
