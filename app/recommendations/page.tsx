import { AuthGuard } from "@/components/auth-guard"
import { CareerRecommendations } from "@/components/career-recommendations"
import { Header } from "@/components/header"

export default function RecommendationsPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-background">
        <Header />
        <CareerRecommendations />
      </main>
    </AuthGuard>
  )
}
