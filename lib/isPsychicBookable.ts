import { supabase } from "@/lib/supabase/client";

export async function isPsychicBookable(psychicId: string): Promise<boolean> {
  // 1️⃣ Check psychic availability flag
  const { data: psychic, error } = await supabase
    .from("profiles")
    .select("is_available")
    .eq("id", psychicId)
    .single();

  if (error || !psychic || !psychic.is_available) {
    return false;
  }

  // 2️⃣ Check active booking conflict
  const { data: activeBooking } = await supabase
    .from("bookings")
    .select("id")
    .eq("psychic_id", psychicId)
    .eq("status", "active")
    .maybeSingle();

  if (activeBooking) {
    return false;
  }

  return true;
}
