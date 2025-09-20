"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  TrendingUp,
  DollarSign,
  Clock,
  MapPin,
  Star,
  BookOpen,
  Users,
  ArrowRight,
  Sparkles,
  Brain,
} from "lucide-react"

interface CareerMatch {
  id: string
  title: string
  matchPercentage: number
  salaryRange: string
  growthRate: string
  description: string
  requiredSkills: string[]
  missingSkills: string[]
  industries: string[]
  locations: string[]
  education: string
  experience: string
  keyResponsibilities: string[]
  careerPath: string[]
  pros: string[]
  cons: string[]
}

const mockRecommendations: CareerMatch[] = [
  {
    id: "1",
    title: "Full Stack Developer",
    matchPercentage: 92,
    salaryRange: "₹6-15 LPA",
    growthRate: "+22%",
    description:
      "Build end-to-end web applications using modern technologies. Work on both frontend user interfaces and backend systems.",
    requiredSkills: ["JavaScript", "React", "Node.js", "Database Management", "Problem Solving"],
    missingSkills: ["Docker", "AWS", "TypeScript"],
    industries: ["Technology", "E-commerce", "Fintech", "Healthcare"],
    locations: ["Bangalore", "Mumbai", "Pune", "Hyderabad", "Remote"],
    education: "Bachelor's in Computer Science or related field",
    experience: "0-2 years for entry level",
    keyResponsibilities: [
      "Develop responsive web applications",
      "Design and implement APIs",
      "Collaborate with cross-functional teams",
      "Optimize application performance",
    ],
    careerPath: ["Junior Developer", "Senior Developer", "Tech Lead", "Engineering Manager"],
    pros: ["High demand", "Good salary growth", "Remote work options", "Creative problem solving"],
    cons: ["Continuous learning required", "Can be stressful with deadlines", "Long hours sometimes"],
  },
  {
    id: "2",
    title: "Data Analyst",
    matchPercentage: 87,
    salaryRange: "₹4-12 LPA",
    growthRate: "+18%",
    description:
      "Analyze complex datasets to derive business insights and support data-driven decision making across organizations.",
    requiredSkills: ["Data Analysis", "Statistics", "Excel", "SQL", "Critical Thinking"],
    missingSkills: ["Python", "Tableau", "Machine Learning"],
    industries: ["Banking", "E-commerce", "Healthcare", "Consulting"],
    locations: ["Mumbai", "Bangalore", "Delhi", "Chennai"],
    education: "Bachelor's in Statistics, Mathematics, or related field",
    experience: "0-1 years for entry level",
    keyResponsibilities: [
      "Collect and analyze business data",
      "Create reports and dashboards",
      "Identify trends and patterns",
      "Present findings to stakeholders",
    ],
    careerPath: ["Junior Analyst", "Data Analyst", "Senior Analyst", "Data Science Manager"],
    pros: ["Growing field", "Analytical work", "Good work-life balance", "Multiple industries"],
    cons: ["Can be repetitive", "Requires attention to detail", "Limited creativity"],
  },
  {
    id: "3",
    title: "Digital Marketing Specialist",
    matchPercentage: 78,
    salaryRange: "₹3-10 LPA",
    growthRate: "+15%",
    description:
      "Plan and execute digital marketing campaigns across various channels to drive brand awareness and customer acquisition.",
    requiredSkills: ["Digital Marketing", "Social Media", "Content Writing", "Communication"],
    missingSkills: ["SEO/SEM", "Google Analytics", "Paid Advertising"],
    industries: ["E-commerce", "Media", "Startups", "Retail"],
    locations: ["Mumbai", "Delhi", "Bangalore", "Pune", "Remote"],
    education: "Bachelor's in Marketing, Communications, or related field",
    experience: "0-2 years for entry level",
    keyResponsibilities: [
      "Develop marketing strategies",
      "Manage social media accounts",
      "Create engaging content",
      "Analyze campaign performance",
    ],
    careerPath: ["Marketing Executive", "Marketing Specialist", "Marketing Manager", "Head of Marketing"],
    pros: ["Creative work", "Fast-growing field", "Diverse opportunities", "Remote work possible"],
    cons: ["Constantly changing landscape", "Performance pressure", "Weekend work sometimes"],
  },
]

export function CareerRecommendations() {
  const [selectedCareer, setSelectedCareer] = useState<CareerMatch>(mockRecommendations[0])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Brain className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">AI is analyzing your profile...</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Generating Your Career Recommendations</h1>
            <p className="text-muted-foreground mb-8">
              Our AI is processing your skills, interests, and goals to find the perfect career matches.
            </p>
            <div className="max-w-md mx-auto">
              <Progress value={75} className="h-2 mb-4" />
              <p className="text-sm text-muted-foreground">Analyzing job market trends...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Recommendations</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Personalized Career Matches</h1>
          <p className="text-muted-foreground">
            Based on your skills assessment, here are the top career paths that align with your profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Career List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Top Matches</h2>
            {mockRecommendations.map((career) => (
              <Card
                key={career.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCareer.id === career.id ? "ring-2 ring-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedCareer(career)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{career.title}</h3>
                      <p className="text-sm text-muted-foreground">{career.salaryRange}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-primary fill-current" />
                        <span className="text-sm font-medium">{career.matchPercentage}%</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {career.growthRate} growth
                      </Badge>
                    </div>
                  </div>
                  <Progress value={career.matchPercentage} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Career Details */}
          <div className="lg:col-span-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedCareer.title}</CardTitle>
                    <CardDescription className="text-base mt-2">{selectedCareer.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-5 w-5 text-primary fill-current" />
                      <span className="text-xl font-bold">{selectedCareer.matchPercentage}%</span>
                      <span className="text-sm text-muted-foreground">match</span>
                    </div>
                    <Badge variant="secondary">{selectedCareer.growthRate} growth</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="path">Career Path</TabsTrigger>
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Salary Range</p>
                            <p className="text-sm text-muted-foreground">{selectedCareer.salaryRange}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Growth Rate</p>
                            <p className="text-sm text-muted-foreground">{selectedCareer.growthRate} annually</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Experience Required</p>
                            <p className="text-sm text-muted-foreground">{selectedCareer.experience}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Top Locations</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedCareer.locations.slice(0, 3).map((location) => (
                                <Badge key={location} variant="outline" className="text-xs">
                                  {location}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Target className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Industries</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedCareer.industries.slice(0, 3).map((industry) => (
                                <Badge key={industry} variant="outline" className="text-xs">
                                  {industry}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Key Responsibilities</h3>
                      <ul className="space-y-2">
                        {selectedCareer.keyResponsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-green-600">Skills You Have</h3>
                        <div className="space-y-2">
                          {selectedCareer.requiredSkills.map((skill) => (
                            <div key={skill} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 text-orange-600">Skills to Develop</h3>
                        <div className="space-y-2">
                          {selectedCareer.missingSkills.map((skill) => (
                            <div key={skill} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-500" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                        <Button size="sm" className="mt-4">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Find Learning Resources
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="path" className="space-y-6 mt-6">
                    <div>
                      <h3 className="font-semibold mb-4">Typical Career Progression</h3>
                      <div className="space-y-4">
                        {selectedCareer.careerPath.map((role, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{role}</p>
                              <p className="text-sm text-muted-foreground">
                                {index === 0 && "0-2 years"}
                                {index === 1 && "2-5 years"}
                                {index === 2 && "5-8 years"}
                                {index === 3 && "8+ years"}
                              </p>
                            </div>
                            {index < selectedCareer.careerPath.length - 1 && (
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="insights" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-green-600">Pros</h3>
                        <ul className="space-y-2">
                          {selectedCareer.pros.map((pro, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 text-orange-600">Considerations</h3>
                        <ul className="space-y-2">
                          {selectedCareer.cons.map((con, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="flex-1">
                          <Users className="h-4 w-4 mr-2" />
                          Connect with Professionals
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <BookOpen className="h-4 w-4 mr-2" />
                          View Learning Path
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
