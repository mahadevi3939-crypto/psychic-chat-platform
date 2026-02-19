export const dynamic = "force-dynamic"

import ChartCard from "@/app/components/admin/ChartCard"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export default async function AdminSecurityPage() {
  const supabase = await createServerSupabaseClient()

  const { data: schema } = await supabase
    .from("schema_fingerprints")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  const { data: constraints } = await supabase
    .from("constraint_fingerprints")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  const { data: cron } = await supabase
    .from("cron_execution_metrics")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="container stack-lg">
      <ChartCard title="Schema Integrity">
        <div className="text-sm">
          Latest Fingerprint: {schema?.fingerprint ?? "N/A"}
        </div>
      </ChartCard>

      <ChartCard title="Constraint Integrity">
        <div className="text-sm">
          Latest Fingerprint: {constraints?.fingerprint ?? "N/A"}
        </div>
      </ChartCard>

      <ChartCard title="Recent Cron Activity">
        <div className="stack-sm">
          {!cron || cron.length === 0 ? (
            <div className="text-sm">
              No cron data available.
            </div>
          ) : (
           cron.map((job) => (
  <div key={job.id} className="row-between">
    <div className="text-sm">{job.job_name}</div>

    <div
      className={`text-sm ${
        job.status === "success"
          ? "status-ok"
          : "status-failed"
      }`}
    >
      {job.status}
    </div>
  </div>
))

          )}
        </div>
      </ChartCard>
    </div>
  )
}
