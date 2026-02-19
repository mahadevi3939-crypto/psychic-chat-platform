"use client"

import React, { memo } from "react"
import GlassCard from "@/app/components/GlassCard"
import { AnimatedNumber } from "@/app/components/admin/AnimatedNumber"

type MetricCardProps = {
  label: string
  value: number
  suffix?: string
  tone?: "default" | "success" | "warning" | "danger"
}

function MetricCardComponent({
  label,
  value,
  suffix = "",
  tone = "default",
}: MetricCardProps) {
  const toneClass =
    tone === "success"
      ? "metric-success"
      : tone === "warning"
      ? "metric-warning"
      : tone === "danger"
      ? "metric-danger"
      : ""

  return (
    <GlassCard className="metric-card glow-edge">
      <div className="metric-label text-sm">
        {label}
      </div>

      <div className={`metric-value ${toneClass}`}>
        <AnimatedNumber value={value} />
        {suffix && <span className="metric-suffix">{suffix}</span>}
      </div>
    </GlassCard>
  )
}

export default memo(MetricCardComponent)
