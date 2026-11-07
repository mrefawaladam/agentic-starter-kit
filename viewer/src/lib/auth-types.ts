export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: 'ACTIVE' | 'PENDING_APPROVAL' | 'REJECTED';
  createdAt: string;
}

export const DEFAULT_USER_EMAIL = 'admin@kasirsakti.local';
export const DEFAULT_USER_PASSWORD = 'password123';
