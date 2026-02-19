"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Props = {
  conversationId: string
  currentUserId: string
}

export default function ChatSendBox({
  conversationId,
  currentUserId,
}: Props) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim()) return

    setLoading(true)

    await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: currentUserId,
      content: message.trim(),
    })

    setMessage("")
    setLoading(false)
  }

  return (
    <div className="p-4 border-t flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded px-3 py-2 text-sm"
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded text-sm"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  )
}
