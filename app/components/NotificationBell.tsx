"use client"

import { useEffect, useState } from "react"

type Notification = {
  id: string
  message: string
  created_at: string
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/notifications")
      const data = await res.json()
      setNotifications(data || [])
    }

    load()
  }, [])

  return (
    <div className="notification-wrapper">
      <button
        className="notification-button"
        onClick={() => setOpen(!open)}
      >
        🔔
        {notifications.length > 0 && (
          <span className="notification-badge">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown glass">
          {notifications.length === 0 ? (
            <div className="text-sm">No notifications</div>
          ) : (
            <ul className="stack-sm">
              {notifications.map((n) => (
                <li key={n.id} className="text-sm">
                  {n.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
