"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Video,
  MessageCircle,
  Bot,
  FileText,
  Download,
  Zap,
  Star,
  TrendingUp,
  BookOpen,
  Users,
  Target,
  Brain,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const features = [
  {
    id: "assessment",
    title: "Knowledge Assessment System",
    description:
      "Take comprehensive tests to evaluate your skills and get personalized career recommendations with integrated roadmaps.",
    icon: Target,
    href: "/assessment",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    highlights: [
      "Timed knowledge testing",
      "Multiple choice questions",
      "Personalized career recommendations",
      "Integrated roadmap suggestions",
      "Detailed performance analytics",
    ],
    status: "Enhanced",
  },
  {
    id: "videos",
    title: "Video Learning Library",
    description: "Access curated educational content with advanced search, filtering, and personalized learning paths.",
    icon: Video,
    href: "/videos",
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    highlights: [
      "Categorized video content",
      "Advanced search and filtering",
      "Rating and review system",
      "Featured learning playlists",
      "Progress tracking per video",
    ],
    status: "Active",
  },
  {
    id: "virtual-guidance",
    title: "Virtual Career Guidance",
    description:
      "Interactive guidance system with AI advisors that redirect to specific features based on your career needs.",
    icon: MessageCircle,
    href: "/virtual-guidance",
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    highlights: [
      "Multiple AI advisor personalities",
      "Feature-specific redirections",
      "Interactive guidance areas",
      "Personalized recommendations",
      "Quick access to tools",
    ],
    status: "Enhanced",
  },
  {
    id: "career-chatbot",
    title: "Career Chatbot Widget",
    description:
      "Floating chatbot that detects domain-specific questions and suggests relevant YouTube videos and resources.",
    icon: Bot,
    href: "#chatbot",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    highlights: [
      "Domain detection (ML, AI, Web Dev)",
      "YouTube video suggestions",
      "Floating widget interface",
      "Context-aware responses",
      "Resource recommendations",
    ],
    status: "New",
  },
  {
    id: "dashboard",
    title: "Progress Dashboard",
    description:
      "Comprehensive dashboard with demo data showing your learning progress, achievements, and career insights.",
    icon: FileText,
    href: "/dashboard",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    highlights: [
      "Demo user data",
      "Progress visualization",
      "Achievement tracking",
      "Learning analytics",
      "Career milestone tracking",
    ],
    status: "Active",
  },
]

const stats = [
  { label: "Active Features", value: "5", icon: Zap },
  { label: "Learning Resources", value: "500+", icon: BookOpen },
  { label: "AI Interactions", value: "Real-time", icon: Brain },
  { label: "Career Paths", value: "Multiple", icon: Target },
]

export default function FeaturesPage() {
  const router = useRouter()

  const handleFeatureClick = (href: string) => {
    if (href === "#chatbot") {
      // Scroll to bottom to show chatbot widget
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    } else {
      router.push(href)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                ✨ All Features Working
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4">Enhanced Career Advisor Platform</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Discover our fully functional features designed to accelerate your career growth with AI-powered
                guidance, interactive learning, and comprehensive progress tracking.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>

              {features.map((feature, index) => (
                <Card
                  key={feature.id}
                  className={`${feature.borderColor} hover:shadow-lg transition-all duration-300 cursor-pointer`}
                  onClick={() => handleFeatureClick(feature.href)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                          <feature.icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-xl">{feature.title}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {feature.status}
                            </Badge>
                          </div>
                          <CardDescription className="text-base">{feature.description}</CardDescription>
                        </div>
                      </div>
                      <Button>Try Now</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {feature.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 shrink-0" />
                          <span className="text-sm text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Integration Section */}
            <div className="mt-16">
              <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-2">Seamlessly Integrated Experience</CardTitle>
                  <CardDescription className="text-lg">
                    All features work together to provide a comprehensive career development platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Progress Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Monitor your advancement across all learning paths and milestones
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">AI Guidance</h3>
                      <p className="text-sm text-muted-foreground">
                        Get personalized advice from multiple AI advisors with different specialties
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Download className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Export & Share</h3>
                      <p className="text-sm text-muted-foreground">
                        Generate detailed reports and share your progress with mentors or employers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
              <h2 className="text-3xl font-bold mb-4">Ready to Accelerate Your Career?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start exploring these powerful features and take control of your professional development
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/assessment">Take Assessment</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/virtual-guidance">Get Virtual Guidance</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
