"use client"

type Message = {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  created_at: string
}

type Props = {
  messages: Message[]
  currentUserId: string
}

export default function ChatMessages({
  messages,
  currentUserId,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => {
        const isMine = msg.sender_id === currentUserId

        return (
          <div
            key={msg.id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                isMine
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
