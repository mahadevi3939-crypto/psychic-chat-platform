import AlertCard from "@/app/components/admin/AlertCard"
import { createServerSupabaseClient } from "@/lib/supabase/server"
export const dynamic = "force-dynamic"

type SystemAlert = {
  id: string
  title: string
  message: string
  created_at: string
  severity: "success" | "warning" | "danger"
}

export default async function AdminAlertsPage() {
const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from("system_alerts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) {
    throw new Error(error.message)
  }

  const alerts: SystemAlert[] = data ?? []

  return (
    <div className="container stack-lg">
      {alerts.length === 0 ? (
        <div className="text-sm">No active alerts.</div>
      ) : (
        alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            title={alert.title}
            message={alert.message}
            createdAt={alert.created_at}
            tone={alert.severity}
          />
        ))
      )}
    </div>
  )
}
