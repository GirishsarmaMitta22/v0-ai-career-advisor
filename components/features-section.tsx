import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Target, TrendingUp, Users, BookOpen, Zap } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced algorithms analyze your skills, interests, and aptitudes to provide personalized career recommendations.",
  },
  {
    icon: Target,
    title: "Skills Mapping",
    description:
      "Comprehensive assessment of your current skills and identification of gaps for your target career path.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Real-time job market data and emerging career trends specific to the Indian professional landscape.",
  },
  {
    icon: Users,
    title: "Industry Connections",
    description: "Connect with professionals and mentors in your field of interest for guidance and networking.",
  },
  {
    icon: BookOpen,
    title: "Learning Pathways",
    description: "Curated learning resources and courses to help you develop the skills needed for your chosen career.",
  },
  {
    icon: Zap,
    title: "Instant Recommendations",
    description: "Get immediate career suggestions based on your profile and preferences with detailed action plans.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Career Guidance</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive career guidance tailored to your unique profile and the
            Indian job market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
