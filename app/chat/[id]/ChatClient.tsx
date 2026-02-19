"use client"

import { useEffect, useRef, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import ChatMessages from "./ChatMessages"
import ChatSendBox from "./ChatSendBox"

type Message = {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  created_at: string
}

type Props = {
  conversationId: string
  currentUserId: string
  initialMessages: Message[]
}

export default function ChatClient({
  conversationId,
  currentUserId,
  initialMessages,
}: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const channelRef = useRef<any>(null)

  useEffect(() => {
    const channel = supabase
      .channel(`chat-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    channelRef.current = channel

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
      }
    }
  }, [conversationId])

  return (
    <div className="flex flex-col h-full">
      <ChatMessages
        messages={messages}
        currentUserId={currentUserId}
      />
      <ChatSendBox
        conversationId={conversationId}
        currentUserId={currentUserId}
      />
    </div>
  )
}
