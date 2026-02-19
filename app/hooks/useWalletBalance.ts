"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export function useWalletBalance(userId: string | null) {
  const [balance, setBalance] = useState<number | null>(null)

  useEffect(() => {
    if (!userId) return

    let subscription: any

    async function fetchBalance() {
      const { data } = await supabase
        .from("wallet_balances")
        .select("balance")
        .eq("user_id", userId)
        .single()

      if (data) {
        setBalance(data.balance)
      }
    }

    fetchBalance()

    subscription = supabase
      .channel(`wallet-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "wallet_balances",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setBalance(payload.new.balance)
        }
      )
      .subscribe()

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription)
      }
    }
  }, [userId])

  return balance
}
