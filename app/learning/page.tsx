import { AuthGuard } from "@/components/auth-guard"
import { LearningPaths } from "@/components/learning-paths"
import { Header } from "@/components/header"

export default function LearningPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-background">
        <Header />
        <LearningPaths />
      </main>
    </AuthGuard>
  )
}
