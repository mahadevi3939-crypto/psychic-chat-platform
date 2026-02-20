"use server"

import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/supabase/getCurrentUser"

export async function rechargeWallet(formData: FormData) {
  const amountRaw = formData.get("amount")

  if (!amountRaw) return

  const amount = Number(amountRaw)

  if (!amount || amount <= 0) return

  const current = await getCurrentUser()
  if (!current) return

  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.rpc("credit_wallet", {
    p_user_id: current.user.id,
    p_amount: amount,
    p_description: `Wallet recharge ₹${amount}`
  })

  if (error) {
    console.error(error)
    return
  }

  revalidatePath("/wallet")
}