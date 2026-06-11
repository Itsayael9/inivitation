import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type RsvpPayload = {
  full_name: string;
  guests: number;
  attending: boolean;
  message: string | null;
};

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!client) client = createClient(url, key);
  return client;
}

/**
 * Inserts an RSVP into the `rsvps` table. When Supabase env vars are not
 * configured (e.g. local preview), resolves successfully so the demo flow
 * still works.
 */
export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  const supabase = getClient();
  if (!supabase) {
    console.warn("[rsvp] Supabase env vars missing — RSVP not persisted:", payload);
    await new Promise((r) => setTimeout(r, 600));
    return;
  }
  const { error } = await supabase.from("rsvps").insert(payload);
  if (error) throw new Error(error.message);
}
