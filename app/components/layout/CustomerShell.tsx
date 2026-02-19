"use client"

import React from "react"
import RoleShell from "./RoleShell"
import NotificationBell from "../NotificationBell"
import { ThemeToggle } from "../ThemeToggle"
import WalletBadge from "../WalletBadge"
import Link from "next/link"
import { usePathname } from "next/navigation"

function CustomerSidebar() {
  const pathname = usePathname()

  const items = [
    { label: "Browse Psychics", href: "/" },
    { label: "My Wallet", href: "/wallet" },
  ]

  return (
    <div className="sidebar-section">
      <div className="sidebar-title">Customer</div>

      <div className="sidebar-list">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href))

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

type CustomerShellProps = {
  title?: string
  children: React.ReactNode
}

export default function CustomerShell({
  title = "Customer Dashboard",
  children,
}: CustomerShellProps) {
  return (
    <RoleShell
      title={title}
      sidebar={<CustomerSidebar />}
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
