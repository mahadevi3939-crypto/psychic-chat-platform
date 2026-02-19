"use client"

import Button from "@/app/components/Button"

export default function AlertsError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="container stack-md">
      <h2 className="text-lg font-semibold">
        Failed to load alerts
      </h2>

      <p className="text-sm">
        {error.message}
      </p>

      <Button onClick={() => reset()}>
        Retry
      </Button>
    </div>
  )
}
