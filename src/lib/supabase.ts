import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Appointment = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  status?: string;
  created_at?: string;
};

export type Contact = {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
};
