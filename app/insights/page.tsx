import { AuthGuard } from "@/components/auth-guard"
import { JobMarketInsights } from "@/components/job-market-insights"
import { Header } from "@/components/header"

export default function InsightsPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-background">
        <Header />
        <JobMarketInsights />
      </main>
    </AuthGuard>
  )
}
