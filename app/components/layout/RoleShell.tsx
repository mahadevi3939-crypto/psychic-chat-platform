"use client"

import React from "react"
import BaseShell from "./BaseShell"

type RoleShellProps = {
  sidebar?: React.ReactNode
  headerRight?: React.ReactNode
  title?: string
  children: React.ReactNode
}

export default function RoleShell({
  sidebar,
  headerRight,
  title = "Dashboard",
  children,
}: RoleShellProps) {
  return (
    <BaseShell sidebar={sidebar} headerRight={headerRight}>
      <div className="role-shell">
        <div className="role-shell-header">
          <h1 className="role-shell-title">{title}</h1>
        </div>

        <div>{children}</div>
      </div>
    </BaseShell>
  )
}
