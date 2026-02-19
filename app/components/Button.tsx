"use client"

import React from "react"

type ButtonVariant = "primary" | "outline" | "ghost"

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "outline"
      ? "btn-outline"
      : ""

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variantClass} ${className}`}
    >
      {children}
    </button>
  )
}
