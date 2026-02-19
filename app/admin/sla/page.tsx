"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import GlassCard from "@/app/components/GlassCard"

type SlaMetric = {
  id: string
  metric_name: string
  metric_value: number
  threshold_value: number
  status: string
  created_at: string
}

export default function AdminSlaPage() {
  const [slaMetrics, setSlaMetrics] = useState<SlaMetric[]>([])

  useEffect(() => {
    supabase
      .from("sla_dashboard")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => data && setSlaMetrics(data))

    const channel = supabase
      .channel("admin-sla-page")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sla_dashboard" },
        (payload) => {
          setSlaMetrics(prev => [payload.new as SlaMetric, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
<GlassCard>
  <div className="text-lg font-semibold mb-4">
    SLA Compliance Monitor
  </div>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {slaMetrics.map(sla => (
          <div
            key={sla.id}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm"
          >
            <div className="flex justify-between">
              <span className="text-fuchsia-400 font-medium">
                {sla.metric_name}
              </span>
              <span className={sla.status === "healthy" ? "text-green-400 text-xs" : "text-red-400 text-xs"}>
                {sla.status}
              </span>
            </div>
            <div className="flex justify-between mt-1 text-white/70 text-xs">
              <span>Value: {sla.metric_value}</span>
              <span>Threshold: {sla.threshold_value}</span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
