export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const DEFAULT_USER_EMAIL = 'admin@kasirsakti.local';
export const DEFAULT_USER_PASSWORD = 'password123';
