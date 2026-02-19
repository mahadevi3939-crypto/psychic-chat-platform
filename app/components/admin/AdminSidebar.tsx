"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { label: "Overview", href: "/admin" },
  { label: "Alerts", href: "/admin/alerts" },
  { label: "SLA", href: "/admin/sla" },
  { label: "Performance", href: "/admin/performance" },
  { label: "Cron", href: "/admin/cron" },
  { label: "Security", href: "/admin/security" },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="sidebar-section">
      <div className="sidebar-title">Administration</div>

      <div className="sidebar-list">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href))

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
