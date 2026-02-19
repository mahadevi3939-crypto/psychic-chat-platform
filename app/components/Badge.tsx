"use client"

import React from "react"

type BadgeVariant = "success" | "warning" | "danger" | "neutral"

type BadgeProps = {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export default function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  const baseClass = "badge"

  const variantClass =
    variant === "success"
      ? "badge-success"
      : variant === "warning"
      ? "badge-warning"
      : variant === "danger"
      ? "badge-danger"
      : ""

  return (
    <span className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </span>
  )
}
