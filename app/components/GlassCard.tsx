"use client"

import React from "react"

type PaddingSize = "sm" | "md" | "lg"

type GlassCardProps = {
  children: React.ReactNode
  padding?: PaddingSize
  className?: string
  hover?: boolean
}

export default function GlassCard({
  children,
  padding = "md",
  className = "",
  hover = false,
}: GlassCardProps) {
  const paddingClass =
    padding === "sm"
      ? "glass-pad-sm"
      : padding === "lg"
      ? "glass-pad-lg"
      : "glass-pad-md"

  return (
    <div
      className={`glass ${paddingClass} ${
        hover ? "glass-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}
