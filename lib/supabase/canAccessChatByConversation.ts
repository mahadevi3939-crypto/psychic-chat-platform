import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function canAccessChatByConversation(
  conversationId: string
): Promise<boolean> {
  const supabase = await createServerSupabaseClient()

  const { data: convo, error: convoError } = await supabase
    .from("conversations")
    .select("customer_id, psychic_id")
    .eq("id", conversationId)
    .single()

  if (convoError || !convo) return false

  const { data: booking } = await supabase
    .from("bookings")
    .select("id")
    .eq("customer_id", convo.customer_id)
    .eq("psychic_id", convo.psychic_id)
    .eq("status", "active")
    .maybeSingle()

  return !!booking
}
