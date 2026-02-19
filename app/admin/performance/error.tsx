"use client"

import Button from "@/app/components/Button"

export default function PerformanceError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="container stack-md">
      <h2 className="text-lg font-semibold">
        Performance metrics failed to load
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
