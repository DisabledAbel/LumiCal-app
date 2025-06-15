import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

/**
 * Fetch currently-selected background for user
 */
export async function getUserBackground(user_id: string): Promise<Tables<"backgrounds"> | null> {
  const { data, error } = await supabase
    .from("backgrounds")
    .select("*")
    .eq("user_id", user_id)
    .order("updated_at", { ascending: false })
    .maybeSingle();

  if (error) {
    console.error("Error fetching user background:", error);
    return null;
  }
  return data;
}

/**
 * Save uploaded or curated background selection
 */
export async function setUserBackground({
  user_id,
  image_url,
  curated_theme,
}: {
  user_id: string;
  image_url?: string | null;
  curated_theme?: string | null;
}): Promise<boolean> {
  // Upsert to keep only one background per user
  const { error } = await supabase
    .from("backgrounds")
    .upsert([
      {
        user_id,
        image_url: image_url || null,
        curated_theme: curated_theme || null,
        updated_at: new Date().toISOString(),
      }
    ], { onConflict: "user_id" });

  if (error) {
    console.error("Error setting user background:", error);
    return false;
  }
  return true;
}

/**
 * Upload image to user-backgrounds bucket
 */
export async function uploadBackgroundImage(user_id: string, file: File): Promise<string | null> {
  const path = `${user_id}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("user-backgrounds")
    .upload(path, file, { upsert: true });

  if (error) {
    console.error("Storage upload error:", error);
    return null;
  }
  // Get public URL
  const { data: urlData } = supabase.storage.from("user-backgrounds").getPublicUrl(path);
  return urlData?.publicUrl || null;
}
