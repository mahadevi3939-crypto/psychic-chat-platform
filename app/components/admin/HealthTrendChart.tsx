"use client"

import React, { memo } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type Props = {
  data: any[]
}

function HealthTrendChartComponent({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip contentStyle={{ borderRadius: 12 }} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-success)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default memo(HealthTrendChartComponent)
