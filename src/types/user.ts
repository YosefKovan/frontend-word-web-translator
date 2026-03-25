export type UserRole = 'admin' | 'user';

export interface User {
  user_id: string;
  name: string;
  email?: string;
  last_active: string;
  words_count: number;
  progress_score: number;
  role?: UserRole;
  status?: 'active' | 'inactive';
}
