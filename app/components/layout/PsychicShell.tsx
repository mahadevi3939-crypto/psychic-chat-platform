"use client"

import React from "react"
import RoleShell from "./RoleShell"
import NotificationBell from "../NotificationBell"
import {ThemeToggle} from "../ThemeToggle"
import WalletBadge from "../WalletBadge"
import Link from "next/link"
import { usePathname } from "next/navigation"

function PsychicSidebar() {
  const pathname = usePathname()

  const items = [
    { label: "Overview", href: "/psychic" },
    { label: "Earnings", href: "/earnings" },
    { label: "Wallet", href: "/wallet" },
  ]

  return (
    <div className="sidebar-section">
      <div className="sidebar-title">Psychic Panel</div>

      <div className="sidebar-list">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/psychic" && pathname.startsWith(item.href))

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`sidebar-item ${
                  active ? "sidebar-item-active" : ""
                }`}
              >
                {item.label}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

type PsychicShellProps = {
  title?: string
  children: React.ReactNode
}

export default function PsychicShell({
  title = "Psychic Dashboard",
  children,
}: PsychicShellProps) {
  return (
    <RoleShell
      title={title}
      sidebar={<PsychicSidebar />}
      headerRight={
        <>
          <WalletBadge />
          <NotificationBell />
          <ThemeToggle />
        </>
      }
    >
      {children}
    </RoleShell>
  )
}
