"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export function SystemHeartbeat() {
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const channel = supabase.channel("admin-heartbeat")

    channel
      .on("presence", { event: "sync" }, () => {
        setConnected(true)
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setConnected(true)
        }
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          setConnected(false)
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2.5 h-2.5 rounded-full ${
          connected ? "bg-emerald-400 animate-pulse" : "bg-gray-500"
        }`}
      />
      <span className="text-xs text-white/50">
        {connected ? "LIVE" : "OFFLINE"}
      </span>
    </div>
  )
}
