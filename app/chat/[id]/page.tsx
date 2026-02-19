import { notFound } from "next/navigation"
import { getCurrentUser } from "@/lib/supabase/getCurrentUser"
import { canAccessChatByConversation } from "@/lib/supabase/canAccessChatByConversation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import ChatClient from "./ChatClient"

export const dynamic = "force-dynamic"

type Props = {
  params: { id: string }
}

export default async function ChatPage({ params }: Props) {
  const data = await getCurrentUser()
  if (!data) return notFound()

  const { user } = data

  const allowed = await canAccessChatByConversation(params.id)
  if (!allowed) return notFound()

  const supabase = await createServerSupabaseClient()

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", params.id)
    .order("created_at", { ascending: true })

  return (
    <main className="container mx-auto py-6">
      <ChatClient
        conversationId={params.id}
        currentUserId={user.id}
        initialMessages={messages ?? []}
      />
    </main>
  )
}
