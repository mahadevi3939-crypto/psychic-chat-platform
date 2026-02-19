import MetricCard from "@/app/components/admin/MetricCard"
import GlassCard from "@/app/components/GlassCard"
import { createServerSupabaseClient } from "@/lib/supabase/server"
export const dynamic = "force-dynamic"

export default async function AdminOverviewPage() {
  const supabase = await createServerSupabaseClient()

  const { data: roleData } = await supabase
    .from("role_distribution_snapshots")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  const { data: slaData } = await supabase
    .from("sla_dashboard")
    .select("*")
    .limit(1)
    .single()

  const activeUsers = roleData?.total_users ?? 0
  const activeChats = roleData?.active_chats ?? 0
  const systemHealth = slaData?.system_health ?? 0
  const slaCompliance = slaData?.sla_percentage ?? 0

  return (
    <div className="container stack-lg">
      <div className="kpi-grid">
        <MetricCard label="Active Users" value={activeUsers} />

        <MetricCard label="Active Chats" value={activeChats} />

        <MetricCard
          label="System Health"
          value={systemHealth}
          suffix="%"
          tone={
            systemHealth >= 90
              ? "success"
              : systemHealth >= 60
              ? "warning"
              : "danger"
          }
        />

        <MetricCard
          label="SLA Compliance"
          value={slaCompliance}
          suffix="%"
          tone={
            slaCompliance >= 95
              ? "success"
              : slaCompliance >= 85
              ? "warning"
              : "danger"
          }
        />
      </div>

      <GlassCard>
        <div className="text-sm">
          System monitoring charts appear below.
        </div>
      </GlassCard>
    </div>
  )
}
