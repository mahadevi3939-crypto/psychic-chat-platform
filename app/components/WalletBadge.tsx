"use client"

import { useEffect, useState } from "react"

export default function WalletBadge() {
  const [balance, setBalance] = useState<number | null>(null)

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/wallet/balance")
      const data = await res.json()
      setBalance(data.balance)
    }

    load()
  }, [])

  return (
    <div className="wallet-badge glass">
      {balance === null ? (
        <span className="text-sm">Loading...</span>
      ) : (
        <span className="text-sm font-medium">
          ₹{balance}
        </span>
      )}
    </div>
  )
}
