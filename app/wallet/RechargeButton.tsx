"use client"

import { useTransition, useState } from "react"
import { useRouter } from "next/navigation"
import Button from "@/app/components/Button"
import { rechargeWallet } from "./actions"

export default function RechargeButton() {
  const [pending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        if (pending) return

        const formData = new FormData()
        formData.append("amount", "100")

        startTransition(async () => {
          await rechargeWallet(formData)
          setSuccess(true)
          router.refresh()
        })
      }}
    >
      <Button type="submit" disabled={pending}>
        {pending ? "Processing..." : "Recharge ₹100"}
      </Button>

      {success && !pending && (
        <div className="text-sm text-green-500 mt-2">
          Recharge successful ✔
        </div>
      )}
    </form>
  )
}