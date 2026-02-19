import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/supabase/getCurrentUser"
import AdminShell from "@/app/components/admin/AdminShell"


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getCurrentUser()


  if (!data?.user) redirect("/login")

  if (data.profile.role !== "admin") {
    redirect("/")
  }

  // Temporary static health until we wire it cleanly again
  const healthScore = 100
  const emergencyMode = false

  return (
    <AdminShell
      healthScore={healthScore}
      emergencyMode={emergencyMode}
    >
      {children}
    </AdminShell>
  )
}
