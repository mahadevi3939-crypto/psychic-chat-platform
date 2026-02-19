import GlassCard from "@/app/components/GlassCard"
import { createServerSupabaseClient } from "@/lib/supabase/server"
export const dynamic = "force-dynamic"

export default async function EarningsPage() {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("id, billed_minutes, price_per_minute")
    .eq("psychic_id", user.id)
    .eq("status", "completed")

  if (error) {
    throw new Error(error.message)
  }

  return (
    <div className="container stack-lg">
      <h1 className="text-2xl font-semibold">
        Earnings
      </h1>

      <GlassCard>
        <ul className="stack-md">
          {!bookings || bookings.length === 0 ? (
            <li className="text-sm">
              No completed bookings.
            </li>
          ) : (
            bookings.map((b) => (
              <li key={b.id}>
                <div className="row-between">
                  <div>
                    <div className="text-sm">
                      Minutes: {b.billed_minutes}
                    </div>
                    <div className="text-xs">
                      Rate: ₹{b.price_per_minute}/min
                    </div>
                  </div>

                  <div className="text-sm font-semibold">
                    ₹{b.billed_minutes * b.price_per_minute}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </GlassCard>
    </div>
  )
}
