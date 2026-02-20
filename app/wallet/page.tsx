import GlassCard from "@/app/components/GlassCard"
import { getCurrentUser } from "@/lib/supabase/getCurrentUser"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import RechargeButton from "./RechargeButton"

export const dynamic = "force-dynamic"

export default async function WalletPage() {
  const current = await getCurrentUser()

  if (!current) {
    throw new Error("Unauthorized")
  }

  const supabase = await createServerSupabaseClient()

  const { data: balanceRow } = await supabase
    .from("profiles")
    .select("wallet_balance")
    .eq("id", current.user.id)
    .maybeSingle()

  const balance = balanceRow?.wallet_balance ?? 0

  const { data: transactions } = await supabase
    .from("wallet_transactions")
    .select("*")
    .eq("user_id", current.user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  return (
    <div className="container stack-lg">
      <h1 className="text-2xl font-semibold">Wallet</h1>

      <GlassCard>
        <div className="row-between">
          <div className="text-sm">Current Balance</div>
          <div className="text-lg font-semibold">
            ₹{balance}
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="stack-md">
          <h2 className="text-lg font-semibold">Recharge</h2>
          <RechargeButton />
        </div>
      </GlassCard>

      <GlassCard>
        <div className="stack-md">
          <h2 className="text-lg font-semibold">Transaction History</h2>

          {!transactions || transactions.length === 0 ? (
            <div className="text-sm">No transactions found.</div>
          ) : (
            <ul className="stack-sm">
              {transactions.map((tx) => (
                <li key={tx.id}>
                  <div className="row-between">
                    <div className="text-sm">{tx.type}</div>
                    <div className="text-sm font-medium">
                      ₹{tx.amount}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </GlassCard>
    </div>
  )
}