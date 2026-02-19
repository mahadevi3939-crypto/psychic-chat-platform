import ChartCard from "@/app/components/admin/ChartCard"
import BillingTrendChart from "@/app/components/admin/BillingTrendChart"
import HealthTrendChart from "@/app/components/admin/HealthTrendChart"
import { createServerSupabaseClient } from "@/lib/supabase/server"
export const dynamic = "force-dynamic"

export default async function AdminPerformancePage() {
  const supabase = await createServerSupabaseClient()

  const { data: billingData } = await supabase
    .from("billing_processor_performance")
    .select("*")
    .order("created_at", { ascending: true })

  const { data: healthData } = await supabase
    .from("db_activity_snapshots")
    .select("*")
    .order("created_at", { ascending: true })

  const billing =
    billingData?.map((item) => ({
      label: item.created_at,
      value: item.processed_events,
    })) ?? []

  const health =
    healthData?.map((item) => ({
      label: item.created_at,
      value: item.health_score,
    })) ?? []

  return (
    <div className="container stack-lg">
      <ChartCard title="Billing Trend">
        <BillingTrendChart data={billing} />
      </ChartCard>

      <ChartCard title="System Health Trend">
        <HealthTrendChart data={health} />
      </ChartCard>
    </div>
  )
}
