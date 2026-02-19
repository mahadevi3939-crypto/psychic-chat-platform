"use client"

import { useEffect, useRef } from "react"
import { AnimatedNumber } from "@/app/components/admin/AnimatedNumber"

export function HealthGauge({
  value,
  onUpdate,
  onAnomaly,
}: {
  value: number
  onUpdate?: (value: number) => void
  onAnomaly?: (triggered: boolean) => void
}) {
  const previous = useRef(value)

  useEffect(() => {
    if (onUpdate) {
      onUpdate(value)
    }

    const drop = previous.current - value

    if (drop >= 25 && onAnomaly) {
      onAnomaly(true)
    }

    previous.current = value
  }, [value, onUpdate, onAnomaly])

  const size = 80
  const strokeWidth = 7
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  const color =
    value >= 90
      ? "#4ade80"
      : value >= 60
      ? "#facc15"
      : "#ef4444"

  return (
    <div className="gauge-wrapper">
      <svg width={size} height={size}>
        <circle
          className="gauge-bg"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="gauge-progress"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      <div className="gauge-label">
        <AnimatedNumber value={value} />
      </div>
    </div>
  )
}
