import { AuthGuard } from "@/components/auth-guard"
import { KnowledgeAssessment } from "@/components/knowledge-assessment"
import { Header } from "@/components/header"

export default function AssessmentPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-background">
        <Header />
        <KnowledgeAssessment />
      </main>
    </AuthGuard>
  )
}
