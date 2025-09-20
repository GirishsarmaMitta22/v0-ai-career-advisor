import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ArrowRight, Sparkles, Target } from "lucide-react"
import Link from "next/link"

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 bounce-in">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-primary/10 pulse-glow">
                <Brain className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Start Your Career Journey</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover your potential, explore career paths, and build the skills needed for your dream job
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* New User */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">New to CareerPath AI?</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Take our comprehensive assessment to discover your strengths and get personalized career
                  recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Skills assessment & personality analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    AI-powered career matching
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Personalized learning paths
                  </li>
                </ul>
                <Button asChild className="w-full group/btn relative overflow-hidden">
                  <Link href="/assessment" className="flex items-center justify-center gap-2">
                    <span className="absolute inset-0 shimmer-button opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Start Assessment</span>
                    <ArrowRight className="h-4 w-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Returning User */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-6 w-6 text-accent" />
                  <CardTitle className="text-2xl">Already have an account?</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Sign in to continue your career journey and track your progress
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Access your personalized dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Continue learning paths
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Track skill development
                  </li>
                </ul>
                <Button
                  variant="outline"
                  asChild
                  className="w-full group/btn hover:bg-accent/10 hover:border-accent transition-all duration-300 bg-transparent"
                >
                  <Link href="/auth" className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-sm text-muted-foreground">Students Guided</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform duration-300">
                200+
              </div>
              <div className="text-sm text-muted-foreground">Career Paths</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                95%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
