"use client"

import Button from "@/app/components/Button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="container stack-md">
      <h2 className="text-lg font-semibold">
        Something went wrong
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
