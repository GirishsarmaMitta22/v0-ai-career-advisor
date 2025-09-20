"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Clock,
  Star,
  Play,
  CheckCircle,
  Award,
  Users,
  ExternalLink,
  Target,
  TrendingUp,
  Zap,
  Calendar,
} from "lucide-react"

interface LearningResource {
  id: string
  title: string
  type: "course" | "tutorial" | "book" | "project" | "certification"
  provider: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  price: "Free" | "Paid" | "Freemium"
  description: string
  skills: string[]
  url: string
  completed?: boolean
}

interface LearningPath {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  skills: string[]
  phases: {
    title: string
    duration: string
    resources: LearningResource[]
  }[]
  careerOutcomes: string[]
  averageSalary: string
}

const learningPaths: LearningPath[] = [
  {
    id: "fullstack-dev",
    title: "Full Stack Developer",
    description: "Master both frontend and backend development to build complete web applications",
    duration: "6-8 months",
    difficulty: "Intermediate",
    skills: ["JavaScript", "React", "Node.js", "Database", "Git"],
    averageSalary: "₹8-15 LPA",
    careerOutcomes: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Software Engineer"],
    phases: [
      {
        title: "Foundation Phase",
        duration: "2 months",
        resources: [
          {
            id: "1",
            title: "JavaScript Fundamentals",
            type: "course",
            provider: "freeCodeCamp",
            duration: "40 hours",
            difficulty: "Beginner",
            rating: 4.8,
            price: "Free",
            description: "Learn JavaScript basics including variables, functions, objects, and DOM manipulation",
            skills: ["JavaScript", "DOM", "ES6"],
            url: "https://freecodecamp.org",
          },
          {
            id: "2",
            title: "HTML & CSS Complete Guide",
            type: "course",
            provider: "Coursera",
            duration: "30 hours",
            difficulty: "Beginner",
            rating: 4.6,
            price: "Freemium",
            description: "Master HTML structure and CSS styling for modern web development",
            skills: ["HTML", "CSS", "Responsive Design"],
            url: "https://coursera.org",
          },
        ],
      },
      {
        title: "Frontend Development",
        duration: "2 months",
        resources: [
          {
            id: "3",
            title: "React Complete Course",
            type: "course",
            provider: "Udemy",
            duration: "60 hours",
            difficulty: "Intermediate",
            rating: 4.7,
            price: "Paid",
            description: "Build modern React applications with hooks, context, and state management",
            skills: ["React", "JSX", "State Management", "Hooks"],
            url: "https://udemy.com",
          },
          {
            id: "4",
            title: "Portfolio Website Project",
            type: "project",
            provider: "Self-guided",
            duration: "1 week",
            difficulty: "Intermediate",
            rating: 4.5,
            price: "Free",
            description: "Create a responsive portfolio website showcasing your projects",
            skills: ["React", "CSS", "Deployment"],
            url: "#",
          },
        ],
      },
      {
        title: "Backend Development",
        duration: "2 months",
        resources: [
          {
            id: "5",
            title: "Node.js & Express Masterclass",
            type: "course",
            provider: "Udemy",
            duration: "50 hours",
            difficulty: "Intermediate",
            rating: 4.8,
            price: "Paid",
            description: "Build RESTful APIs and server-side applications with Node.js",
            skills: ["Node.js", "Express", "API Development"],
            url: "https://udemy.com",
          },
          {
            id: "6",
            title: "Database Design with MongoDB",
            type: "course",
            provider: "MongoDB University",
            duration: "25 hours",
            difficulty: "Intermediate",
            rating: 4.6,
            price: "Free",
            description: "Learn NoSQL database design and operations with MongoDB",
            skills: ["MongoDB", "Database Design", "Queries"],
            url: "https://university.mongodb.com",
          },
        ],
      },
    ],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    description: "Learn to analyze data and derive insights to drive business decisions",
    duration: "4-6 months",
    difficulty: "Beginner",
    skills: ["Python", "SQL", "Excel", "Statistics", "Visualization"],
    averageSalary: "₹6-12 LPA",
    careerOutcomes: ["Data Analyst", "Business Analyst", "Data Scientist", "Research Analyst"],
    phases: [
      {
        title: "Data Fundamentals",
        duration: "1.5 months",
        resources: [
          {
            id: "7",
            title: "Python for Data Analysis",
            type: "course",
            provider: "DataCamp",
            duration: "35 hours",
            difficulty: "Beginner",
            rating: 4.7,
            price: "Paid",
            description: "Master Python libraries like Pandas and NumPy for data manipulation",
            skills: ["Python", "Pandas", "NumPy"],
            url: "https://datacamp.com",
          },
          {
            id: "8",
            title: "SQL for Data Science",
            type: "course",
            provider: "Coursera",
            duration: "25 hours",
            difficulty: "Beginner",
            rating: 4.8,
            price: "Freemium",
            description: "Learn SQL queries, joins, and database operations for data analysis",
            skills: ["SQL", "Database Queries", "Data Extraction"],
            url: "https://coursera.org",
          },
        ],
      },
      {
        title: "Analysis & Visualization",
        duration: "2 months",
        resources: [
          {
            id: "9",
            title: "Data Visualization with Tableau",
            type: "course",
            provider: "Tableau Learning",
            duration: "30 hours",
            difficulty: "Intermediate",
            rating: 4.6,
            price: "Free",
            description: "Create interactive dashboards and visualizations",
            skills: ["Tableau", "Data Visualization", "Dashboards"],
            url: "https://tableau.com",
          },
          {
            id: "10",
            title: "Statistics for Data Analysis",
            type: "course",
            provider: "Khan Academy",
            duration: "40 hours",
            difficulty: "Intermediate",
            rating: 4.5,
            price: "Free",
            description: "Understand statistical concepts essential for data analysis",
            skills: ["Statistics", "Probability", "Hypothesis Testing"],
            url: "https://khanacademy.org",
          },
        ],
      },
    ],
  },
]

const skillCategories = [
  { name: "Programming", count: 45 },
  { name: "Data Science", count: 32 },
  { name: "Design", count: 28 },
  { name: "Marketing", count: 24 },
  { name: "Business", count: 35 },
  { name: "Cloud Computing", count: 18 },
]

export function LearningPaths() {
  const [selectedPath, setSelectedPath] = useState<LearningPath>(learningPaths[0])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set())

  const toggleResourceCompletion = (resourceId: string) => {
    const newCompleted = new Set(completedResources)
    if (newCompleted.has(resourceId)) {
      newCompleted.delete(resourceId)
    } else {
      newCompleted.add(resourceId)
    }
    setCompletedResources(newCompleted)
  }

  const getPathProgress = (path: LearningPath) => {
    const totalResources = path.phases.reduce((acc, phase) => acc + phase.resources.length, 0)
    const completedCount = path.phases.reduce(
      (acc, phase) => acc + phase.resources.filter((r) => completedResources.has(r.id)).length,
      0,
    )
    return totalResources > 0 ? (completedCount / totalResources) * 100 : 0
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Personalized Learning Paths</h1>
          <p className="text-muted-foreground text-lg">
            Curated learning journeys to help you develop the skills needed for your target career
          </p>
        </div>

        <Tabs defaultValue="paths" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="resources">All Resources</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="paths" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Path Selection */}
              <div className="lg:col-span-1 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Choose Your Path</h2>
                {learningPaths.map((path) => (
                  <Card
                    key={path.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPath.id === path.id ? "ring-2 ring-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedPath(path)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{path.title}</h3>
                          <p className="text-sm text-muted-foreground">{path.averageSalary}</p>
                        </div>
                        <Badge variant="secondary">{path.difficulty}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-sm">{path.duration}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{Math.round(getPathProgress(path))}% complete</div>
                          <Progress value={getPathProgress(path)} className="h-1 w-16" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Path Details */}
              <div className="lg:col-span-2">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedPath.title}</CardTitle>
                        <CardDescription className="text-base mt-2">{selectedPath.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant="default" className="mb-2">
                          {selectedPath.difficulty}
                        </Badge>
                        <div className="text-sm text-muted-foreground">{selectedPath.duration}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Skills & Outcomes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary" />
                          Skills You'll Learn
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedPath.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          Career Outcomes
                        </h3>
                        <ul className="space-y-1">
                          {selectedPath.careerOutcomes.map((outcome, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Learning Phases */}
                    <div className="space-y-6">
                      <h3 className="font-semibold text-lg">Learning Journey</h3>
                      {selectedPath.phases.map((phase, phaseIndex) => (
                        <div key={phaseIndex} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-bold">
                                {phaseIndex + 1}
                              </div>
                              {phase.title}
                            </h4>
                            <Badge variant="outline">{phase.duration}</Badge>
                          </div>
                          <div className="space-y-3">
                            {phase.resources.map((resource) => (
                              <div
                                key={resource.id}
                                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                              >
                                <div className="flex-shrink-0 mt-1">
                                  {resource.type === "course" && <BookOpen className="h-4 w-4 text-primary" />}
                                  {resource.type === "project" && <Zap className="h-4 w-4 text-accent" />}
                                  {resource.type === "certification" && <Award className="h-4 w-4 text-green-500" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h5 className="font-medium">{resource.title}</h5>
                                      <p className="text-sm text-muted-foreground">{resource.provider}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant={
                                          resource.price === "Free"
                                            ? "default"
                                            : resource.price === "Paid"
                                              ? "secondary"
                                              : "outline"
                                        }
                                        className="text-xs"
                                      >
                                        {resource.price}
                                      </Badge>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                        <span className="text-xs">{resource.rating}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">{resource.duration}</span>
                                      </div>
                                      <Badge variant="outline" className="text-xs">
                                        {resource.difficulty}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant={completedResources.has(resource.id) ? "default" : "outline"}
                                        onClick={() => toggleResourceCompletion(resource.id)}
                                        className="text-xs"
                                      >
                                        {completedResources.has(resource.id) ? (
                                          <>
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Completed
                                          </>
                                        ) : (
                                          <>
                                            <Play className="h-3 w-3 mr-1" />
                                            Start
                                          </>
                                        )}
                                      </Button>
                                      <Button size="sm" variant="ghost" className="text-xs">
                                        <ExternalLink className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-border">
                      <Button className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Create Study Schedule
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Users className="h-4 w-4 mr-2" />
                        Join Study Group
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {skillCategories.map((category) => (
                    <SelectItem key={category.name} value={category.name.toLowerCase()}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, index) => (
                <Card key={index} className="border-border bg-card hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {category.name}
                      <Badge variant="secondary">{category.count} resources</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Explore Resources
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Courses Completed</p>
                      <p className="text-2xl font-bold">{completedResources.size}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Learning Streak</p>
                      <p className="text-2xl font-bold">7 days</p>
                    </div>
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Skills Acquired</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <Award className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Learning Path Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPaths.map((path) => (
                    <div key={path.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <h4 className="font-medium">{path.title}</h4>
                        <p className="text-sm text-muted-foreground">{path.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium mb-1">{Math.round(getPathProgress(path))}% complete</div>
                        <Progress value={getPathProgress(path)} className="h-2 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
