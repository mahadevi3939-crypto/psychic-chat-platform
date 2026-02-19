"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import Button from "../components/Button"
import GlassCard from "../components/GlassCard"

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/login")
  }

  return (
    <main className="auth-page">
      <GlassCard className="auth-card">
        <div className="stack-md">
          <h1 className="text-xl font-semibold">Sign Up</h1>

          <input
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="auth-error text-sm">
              {error}
            </p>
          )}

          <Button
            className="auth-button"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </div>
      </GlassCard>
    </main>
  )
}
