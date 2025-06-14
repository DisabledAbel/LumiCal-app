
import { supabase } from "@/integrations/supabase/client";

export async function resendConfirmationEmail(email: string) {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/`,
    },
  });
  if (error) throw error;
}
