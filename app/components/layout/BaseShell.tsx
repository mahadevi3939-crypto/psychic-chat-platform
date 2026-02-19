"use client"

import React from "react"
import Starfield from "./Starfield"

type BaseShellProps = {
  sidebar?: React.ReactNode
  headerRight?: React.ReactNode
  children: React.ReactNode
}

export default function BaseShell({
  sidebar,
  headerRight,
  children,
}: BaseShellProps) {
  return (
    <div className="base-shell">
      <Starfield />

      {sidebar && (
        <aside className="base-sidebar">
          {sidebar}
        </aside>
      )}

      <div className="base-main">
        <header className="base-header">
          <div className="base-header-title">
            Dashboard
          </div>

          <div className="row">
            {headerRight}
          </div>

          <div className="base-header-gradient" />
        </header>

        <main className="base-content">
          {children}
        </main>
      </div>
    </div>
  )
}
