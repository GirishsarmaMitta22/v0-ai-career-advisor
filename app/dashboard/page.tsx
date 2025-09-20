import { AuthGuard } from "@/components/auth-guard"
import { ProgressDashboard } from "@/components/progress-dashboard"
import { Header } from "@/components/header"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-background">
        <Header />
        <ProgressDashboard />
      </main>
    </AuthGuard>
  )
}
