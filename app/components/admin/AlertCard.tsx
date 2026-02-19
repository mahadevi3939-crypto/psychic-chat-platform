"use client"

import React from "react"
import GlassCard from "@/app/components/GlassCard"
import Badge from "@/app/components/Badge"

type AlertTone = "success" | "warning" | "danger"

type AlertCardProps = {
  title: string
  message: string
  createdAt: string
  tone: AlertTone
}

export default function AlertCard({
  title,
  message,
  createdAt,
  tone,
}: AlertCardProps) {
  return (
    <GlassCard className="alert-card">
      <div className="alert-header">
        <div className="alert-title">{title}</div>
        <Badge variant={tone}>{tone.toUpperCase()}</Badge>
      </div>

      <div className="alert-message text-sm">
        {message}
      </div>

      <div className="alert-time text-xs">
        {new Date(createdAt).toLocaleString()}
      </div>
    </GlassCard>
  )
}
