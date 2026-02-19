"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import GlassCard from "@/app/components/GlassCard"

type CronMetric = {
  id: string
  job_name: string
  status: string
  duration_ms: number
  executed_at: string
}

export default function AdminCronPage() {
  const [cronMetrics, setCronMetrics] = useState<CronMetric[]>([])

  useEffect(() => {
    supabase
      .from("cron_execution_metrics")
      .select("*")
      .order("executed_at", { ascending: false })
      .limit(50)
      .then(({ data }) => data && setCronMetrics(data))

    const channel = supabase
      .channel("admin-cron-page")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "cron_execution_metrics" },
        (payload) => {
          setCronMetrics(prev => [payload.new as CronMetric, ...prev])
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
    Cron Execution Monitor
  </div>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {cronMetrics.map(cron => (
          <div
            key={cron.id}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm"
          >
            <div className="flex justify-between">
              <span className="text-purple-400 font-medium">
                {cron.job_name}
              </span>
              <span className={cron.status === "success" ? "text-green-400 text-xs" : "text-red-400 text-xs"}>
                {cron.status}
              </span>
            </div>
            <div className="flex justify-between mt-1 text-white/70 text-xs">
              <span>{cron.duration_ms} ms</span>
              <span>{new Date(cron.executed_at).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
