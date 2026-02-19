import { supabase } from "@/lib/supabase/client";

export async function canAccessChat(
  customerId: string,
  psychicId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("bookings")
    .select("id")
    .eq("customer_id", customerId)
    .eq("psychic_id", psychicId)
    .eq("status", "active")
    .maybeSingle();

  if (error || !data) return false;
  return true;
}
