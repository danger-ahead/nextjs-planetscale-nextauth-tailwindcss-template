import { User } from '@supabase/supabase-js';

export type UserState = {
  user: User | null;
  loading: boolean;
  error?: string | null;
};
