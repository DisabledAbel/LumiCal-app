
import { supabase } from "@/integrations/supabase/client";
// The `Tables` import is removed because `backgrounds` table is not in the generated types yet.
// Instead, we define a local `Background` type.

// Local type definition for the 'backgrounds' table.
export type Background = {
  id: string;
  user_id: string;
  image_url: string | null;
  curated_theme: string | null;
  created_at: string;
  updated_at: string;
};

/**
 * Fetch currently-selected background for user
 */
export async function getUserBackground(user_id: string): Promise<Background | null> {
  // Using `as any` to bypass a TypeScript error because the `backgrounds` table
  // type is not yet available in the auto-generated `types.ts`.
  const { data, error } = await (supabase as any)
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
  // Using `as any` to bypass a TypeScript error.
  const { error } = await (supabase as any)
    .from("backgrounds")
    .upsert(
      [
        {
          user_id,
          image_url: image_url || null,
          curated_theme: curated_theme || null,
          updated_at: new Date().toISOString(),
        },
      ],
      { onConflict: "user_id" }
    );

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
