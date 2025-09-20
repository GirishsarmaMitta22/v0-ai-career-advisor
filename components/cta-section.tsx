import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle } from "lucide-react"

const benefits = [
  "Personalized career recommendations",
  "Skills gap analysis and learning paths",
  "Real-time job market insights",
  "Industry mentor connections",
  "Progress tracking and milestones",
]

export function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <Card className="border-border bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <CardContent className="p-12 text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Ready to Transform Your Career Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
              Join thousands of Indian students who have discovered their perfect career path with our AI-powered
              guidance.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Schedule Demo
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • Free 7-day trial • Cancel anytime
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
