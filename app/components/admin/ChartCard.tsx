"use client"

import React from "react"
import GlassCard from "@/app/components/GlassCard"

type ChartCardProps = {
  title: string
  children: React.ReactNode
  right?: React.ReactNode
}

export default function ChartCard({
  title,
  children,
  right,
}: ChartCardProps) {
  return (
    <GlassCard className="chart-card">
      <div className="chart-header">
        <div className="chart-title">
          {title}
        </div>

        {right && (
          <div className="chart-header-right">
            {right}
          </div>
        )}
      </div>

      <div className="chart-body">
        {children}
      </div>
    </GlassCard>
  )
}
