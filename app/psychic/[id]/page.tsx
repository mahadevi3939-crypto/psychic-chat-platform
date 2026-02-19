import GlassCard from "@/app/components/GlassCard"
import Button from "@/app/components/Button"
import { createServerSupabaseClient } from "@/lib/supabase/server"
export const dynamic = "force-dynamic"

export default async function PsychicProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createServerSupabaseClient()

  const { data: psychic, error } = await supabase
    .from("psychics")
    .select("id, name, price_per_minute, is_available")
    .eq("id", params.id)
    .single()

  if (error || !psychic) {
    throw new Error("Profile not found")
  }

  return (
    <div className="container stack-lg">
      <h1 className="text-2xl font-semibold">
        {psychic.name}
      </h1>

      <GlassCard>
        <div className="stack-md">
          <div className="text-sm">
            Price: ₹{psychic.price_per_minute} / minute
          </div>

          {!psychic.is_available && (
            <div className="status-warning text-sm">
              Currently unavailable
            </div>
          )}

          <Button disabled={!psychic.is_available}>
            Start Chat
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}
