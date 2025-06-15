
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pouxehyvczyzbkwapghd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvdXhlaHl2Y3p5emJrd2FwZ2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDE0ODIsImV4cCI6MjA2NDQxNzQ4Mn0.i9z3Diarw1rhWlgeURCGyti2YdCaUtO0opNdLgkRXdU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
