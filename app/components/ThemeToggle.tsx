"use client"

import { useState, useEffect } from "react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "light" | "dark") || "dark"
    setTheme(saved)
  }, [])

  const toggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark"

    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-8 rounded-full bg-purple-300 transition-all duration-300 shadow-inner"
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center ${
          theme === "dark" ? "translate-x-7" : "translate-x-1"
        }`}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </div>
    </button>
  )
}
