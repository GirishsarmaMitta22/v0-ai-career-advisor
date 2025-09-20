import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">AI-Powered Career Guidance</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
          Discover Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Perfect Career Path
          </span>{" "}
          with AI
        </h1>

        <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8 leading-relaxed">
          Personalized career recommendations, skills mapping, and job market insights tailored specifically for Indian
          students navigating the evolving professional landscape.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/assessment">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            Watch Demo
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Students Guided</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Career Paths</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
