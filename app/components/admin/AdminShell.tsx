"use client"

import { ReactNode } from "react"
import AdminSidebar from "./AdminSidebar"
import NotificationBell from "../NotificationBell"
import { ThemeToggle } from "../ThemeToggle"

type AdminShellProps = {
  children: ReactNode
  title?: string
  healthScore?: number
  emergencyMode?: boolean
}

export default function AdminShell({
  children,
  title,
  healthScore,
  emergencyMode,
}: AdminShellProps) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            {title && (
              <h1 className="text-xl font-semibold">{title}</h1>
            )}

            {healthScore !== undefined && (
              <div className="text-sm text-muted-foreground">
                System Health: {healthScore}%
              </div>
            )}

            {emergencyMode && (
              <div className="text-sm text-red-500 font-semibold">
                Emergency Mode Active
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <NotificationBell />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
