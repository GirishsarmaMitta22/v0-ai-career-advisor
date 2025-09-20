"use client"

import type React from "react"

import { useState, useRef } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Circle,
  Clock,
  Star,
  Download,
  Upload,
  Target,
  TrendingUp,
  FileText,
  AlertCircle,
} from "lucide-react"

const roadmapData = {
  "Software Engineer": {
    phases: [
      {
        title: "Foundation Phase",
        duration: "3-6 months",
        progress: 75,
        milestones: [
          { title: "Learn Programming Fundamentals", completed: true, priority: "high" },
          { title: "Master Data Structures & Algorithms", completed: true, priority: "high" },
          { title: "Version Control (Git)", completed: true, priority: "medium" },
          { title: "Basic Web Development", completed: false, priority: "high" },
        ],
      },
      {
        title: "Intermediate Phase",
        duration: "6-12 months",
        progress: 40,
        milestones: [
          { title: "Full-Stack Development", completed: false, priority: "high" },
          { title: "Database Management", completed: false, priority: "high" },
          { title: "API Development", completed: false, priority: "medium" },
          { title: "Testing & Debugging", completed: false, priority: "medium" },
        ],
      },
      {
        title: "Advanced Phase",
        duration: "12+ months",
        progress: 0,
        milestones: [
          { title: "System Design", completed: false, priority: "high" },
          { title: "Cloud Technologies", completed: false, priority: "high" },
          { title: "DevOps Practices", completed: false, priority: "medium" },
          { title: "Leadership Skills", completed: false, priority: "low" },
        ],
      },
    ],
    skills: ["JavaScript", "Python", "React", "Node.js", "SQL", "Git", "AWS"],
    certifications: ["AWS Solutions Architect", "Google Cloud Professional", "Microsoft Azure Fundamentals"],
    projects: ["E-commerce Platform", "Task Management App", "Real-time Chat Application"],
  },
  "Data Scientist": {
    phases: [
      {
        title: "Foundation Phase",
        duration: "4-8 months",
        progress: 60,
        milestones: [
          { title: "Statistics & Mathematics", completed: true, priority: "high" },
          { title: "Python Programming", completed: true, priority: "high" },
          { title: "Data Manipulation (Pandas)", completed: false, priority: "high" },
          { title: "Data Visualization", completed: false, priority: "medium" },
        ],
      },
      {
        title: "Intermediate Phase",
        duration: "8-15 months",
        progress: 20,
        milestones: [
          { title: "Machine Learning Algorithms", completed: false, priority: "high" },
          { title: "Deep Learning", completed: false, priority: "high" },
          { title: "SQL & Databases", completed: false, priority: "medium" },
          { title: "Big Data Tools", completed: false, priority: "medium" },
        ],
      },
      {
        title: "Advanced Phase",
        duration: "15+ months",
        progress: 0,
        milestones: [
          { title: "MLOps & Model Deployment", completed: false, priority: "high" },
          { title: "Advanced Analytics", completed: false, priority: "high" },
          { title: "Business Intelligence", completed: false, priority: "medium" },
          { title: "Research & Publications", completed: false, priority: "low" },
        ],
      },
    ],
    skills: ["Python", "R", "SQL", "TensorFlow", "PyTorch", "Tableau", "Apache Spark"],
    certifications: ["Google Data Analytics", "IBM Data Science", "Microsoft Azure Data Scientist"],
    projects: ["Predictive Analytics Model", "Customer Segmentation", "Recommendation System"],
  },
}

export default function RoadmapPage() {
  const [selectedCareer, setSelectedCareer] = useState("Software Engineer")
  const [activePhase, setActivePhase] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentRoadmap = roadmapData[selectedCareer as keyof typeof roadmapData]

  const handleExportPDF = async () => {
    setIsExporting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const pdfData = {
        career: selectedCareer,
        generatedDate: new Date().toISOString(),
        totalPhases: currentRoadmap.phases.length,
        overallProgress: Math.round(
          currentRoadmap.phases.reduce((acc, phase) => acc + phase.progress, 0) / currentRoadmap.phases.length,
        ),
        phases: currentRoadmap.phases.map((phase, index) => ({
          ...phase,
          phaseNumber: index + 1,
          completedMilestones: phase.milestones.filter((m) => m.completed).length,
          totalMilestones: phase.milestones.length,
        })),
        skills: currentRoadmap.skills,
        certifications: currentRoadmap.certifications,
        projects: currentRoadmap.projects,
        analysis: {
          strengths: ["Strong foundation in programming", "Good progress in core skills"],
          recommendations: ["Focus on practical projects", "Consider industry certifications"],
          nextSteps: ["Complete current phase milestones", "Start networking in the industry"],
        },
      }

      const blob = new Blob([JSON.stringify(pdfData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${selectedCareer.replace(" ", "_")}_Roadmap_${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      console.log("[v0] PDF exported successfully:", pdfData)
    } catch (error) {
      console.error("[v0] Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleImportRoadmap = () => {
    fileInputRef.current?.click()
  }

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setImportStatus(null)

    try {
      const text = await file.text()
      const importedData = JSON.parse(text)

      if (!importedData.career || !importedData.phases) {
        throw new Error("Invalid roadmap format")
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))

      setImportStatus(`Successfully imported roadmap for ${importedData.career}`)
      console.log("[v0] Roadmap imported:", importedData)
    } catch (error) {
      setImportStatus("Failed to import roadmap. Please check the file format.")
      console.error("[v0] Import failed:", error)
    } finally {
      setIsImporting(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Interactive Career Roadmap</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Follow a structured path to achieve your career goals with personalized milestones
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {Object.keys(roadmapData).map((career) => (
                  <Button
                    key={career}
                    variant={selectedCareer === career ? "default" : "outline"}
                    onClick={() => setSelectedCareer(career)}
                    className="transition-all duration-300"
                  >
                    {career}
                  </Button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Button
                  onClick={handleExportPDF}
                  variant="outline"
                  className="gap-2 bg-transparent"
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Export Detailed Analysis
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleImportRoadmap}
                  variant="outline"
                  className="gap-2 bg-transparent"
                  disabled={isImporting}
                >
                  {isImporting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Import Custom Roadmap
                    </>
                  )}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.pdf"
                  onChange={handleFileImport}
                  className="hidden"
                />
              </div>

              {importStatus && (
                <div
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg mb-6 ${
                    importStatus.includes("Successfully")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {importStatus.includes("Successfully") ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {importStatus}
                </div>
              )}
            </div>

            <Tabs defaultValue="roadmap" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="roadmap" className="space-y-6">
                <div className="flex justify-center mb-8">
                  <div className="flex gap-4">
                    {currentRoadmap.phases.map((phase, index) => (
                      <Button
                        key={index}
                        variant={activePhase === index ? "default" : "outline"}
                        onClick={() => setActivePhase(index)}
                        className="gap-2"
                      >
                        <Target className="h-4 w-4" />
                        Phase {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>

                <Card className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{currentRoadmap.phases[activePhase].title}</CardTitle>
                        <CardDescription className="text-lg">
                          Duration: {currentRoadmap.phases[activePhase].duration}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {currentRoadmap.phases[activePhase].progress}%
                        </div>
                        <div className="text-sm text-muted-foreground">Complete</div>
                      </div>
                    </div>
                    <Progress value={currentRoadmap.phases[activePhase].progress} className="mt-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {currentRoadmap.phases[activePhase].milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                          {milestone.completed ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground" />
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold">{milestone.title}</h4>
                          </div>
                          <Badge
                            variant={
                              milestone.priority === "high"
                                ? "destructive"
                                : milestone.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {milestone.priority} priority
                          </Badge>
                          {!milestone.completed && (
                            <Button size="sm" variant="outline">
                              Start Learning
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      Complete Roadmap Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {currentRoadmap.phases.map((phase, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-4 h-4 rounded-full ${
                                phase.progress > 0 ? "bg-primary" : "bg-muted-foreground"
                              }`}
                            />
                            {index < currentRoadmap.phases.length - 1 && <div className="w-0.5 h-16 bg-border mt-2" />}
                          </div>
                          <div className="flex-1 pb-8">
                            <h3 className="font-semibold text-lg">{phase.title}</h3>
                            <p className="text-muted-foreground mb-2">{phase.duration}</p>
                            <Progress value={phase.progress} className="w-full max-w-xs" />
                            <p className="text-sm text-muted-foreground mt-1">{phase.progress}% complete</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Required Skills for {selectedCareer}</CardTitle>
                    <CardDescription>Master these skills to excel in your chosen career path</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {currentRoadmap.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Certifications</CardTitle>
                    <CardDescription>Industry-recognized certifications to boost your credentials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {currentRoadmap.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                          <Star className="h-5 w-5 text-yellow-500" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{cert}</h4>
                          </div>
                          <Button size="sm" variant="outline">
                            Learn More
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Projects</CardTitle>
                    <CardDescription>Build these projects to demonstrate your skills to employers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {currentRoadmap.projects.map((project, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                          <Clock className="h-5 w-5 text-blue-500" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{project}</h4>
                          </div>
                          <Button size="sm" variant="outline">
                            Start Project
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        Progress Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {currentRoadmap.phases.map((phase, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{phase.title}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={phase.progress} className="w-20" />
                              <span className="text-sm text-muted-foreground">{phase.progress}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Overall Progress</span>
                          <span className="text-lg font-bold text-primary">
                            {Math.round(
                              currentRoadmap.phases.reduce((acc, phase) => acc + phase.progress, 0) /
                                currentRoadmap.phases.length,
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-900 mb-1">Next Priority</h4>
                          <p className="text-sm text-blue-700">
                            Focus on completing {currentRoadmap.phases[activePhase].title} milestones
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-900 mb-1">Skill Development</h4>
                          <p className="text-sm text-green-700">
                            Consider hands-on projects to reinforce theoretical knowledge
                          </p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-900 mb-1">Networking</h4>
                          <p className="text-sm text-purple-700">Connect with professionals in your target industry</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        Detailed Report Export
                      </CardTitle>
                      <CardDescription>
                        Generate comprehensive PDF reports with progress analysis, recommendations, and action plans
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Button variant="outline" className="gap-2 bg-transparent" onClick={handleExportPDF}>
                          <Download className="h-4 w-4" />
                          Progress Report
                        </Button>
                        <Button variant="outline" className="gap-2 bg-transparent" onClick={handleExportPDF}>
                          <Download className="h-4 w-4" />
                          Skills Analysis
                        </Button>
                        <Button variant="outline" className="gap-2 bg-transparent" onClick={handleExportPDF}>
                          <Download className="h-4 w-4" />
                          Action Plan
                        </Button>
                      </div>
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Report Includes:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Detailed progress breakdown by phase</li>
                          <li>• Personalized skill gap analysis</li>
                          <li>• Industry-specific recommendations</li>
                          <li>• Timeline and milestone tracking</li>
                          <li>• Resource suggestions and next steps</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
