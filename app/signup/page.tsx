"use client"

import { useState } from "react"
import Button from "../components/Button"
import GlassCard from "../components/GlassCard"

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)

  return (
    <main className="auth-page">
      <GlassCard className="auth-card">
        <div className="stack-md">
          <h1 className="text-xl font-semibold">Sign Up</h1>

          <input className="auth-input" placeholder="Email" />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
          />

          {error && (
            <p className="auth-error text-sm">
              {error}
            </p>
          )}

          <Button className="auth-button">
            Create Account
          </Button>
        </div>
      </GlassCard>
    </main>
  )
}
