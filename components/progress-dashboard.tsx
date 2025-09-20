"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts"
import {
  Target,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle,
  Star,
  Zap,
  Users,
  Trophy,
  ArrowRight,
  AlertCircle,
  Play,
} from "lucide-react"

const skillProgress = [
  { skill: "JavaScript", current: 85, target: 90, color: "#8b5cf6" },
  { skill: "React", current: 75, target: 85, color: "#06b6d4" },
  { skill: "Node.js", current: 60, target: 80, color: "#10b981" },
  { skill: "Database", current: 45, target: 70, color: "#f59e0b" },
  { skill: "Git", current: 70, target: 75, color: "#ef4444" },
]

const learningActivity = [
  { date: "Mon", hours: 2.5, completed: 3 },
  { date: "Tue", hours: 3.0, completed: 4 },
  { date: "Wed", hours: 1.5, completed: 2 },
  { date: "Thu", hours: 4.0, completed: 5 },
  { date: "Fri", hours: 2.0, completed: 3 },
  { date: "Sat", hours: 3.5, completed: 4 },
  { date: "Sun", hours: 2.5, completed: 3 },
]

const achievements = [
  {
    id: "1",
    title: "First Course Completed",
    description: "Completed your first learning module",
    icon: BookOpen,
    earned: true,
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Week Streak",
    description: "Maintained a 7-day learning streak",
    icon: Zap,
    earned: true,
    date: "2024-01-20",
  },
  {
    id: "3",
    title: "Skill Master",
    description: "Reached 80% proficiency in JavaScript",
    icon: Star,
    earned: true,
    date: "2024-01-25",
  },
  {
    id: "4",
    title: "Project Builder",
    description: "Complete 3 hands-on projects",
    icon: Trophy,
    earned: false,
    progress: 67,
  },
  {
    id: "5",
    title: "Community Helper",
    description: "Help 5 fellow learners",
    icon: Users,
    earned: false,
    progress: 40,
  },
]

const upcomingMilestones = [
  {
    title: "Complete React Advanced Course",
    dueDate: "2024-02-15",
    progress: 75,
    priority: "high",
  },
  {
    title: "Build Portfolio Project",
    dueDate: "2024-02-28",
    progress: 30,
    priority: "medium",
  },
  {
    title: "JavaScript Certification Exam",
    dueDate: "2024-03-10",
    progress: 0,
    priority: "high",
  },
]

const careerGoalProgress = [
  { name: "Technical Skills", value: 75, color: "#8b5cf6" },
  { name: "Projects", value: 60, color: "#06b6d4" },
  { name: "Certifications", value: 40, color: "#10b981" },
  { name: "Networking", value: 25, color: "#f59e0b" },
]

export function ProgressDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")

  const overallProgress = 68
  const weeklyGoal = 15 // hours
  const currentWeekHours = 18.5

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Learning Dashboard</h1>
            <p className="text-muted-foreground">Track your progress and stay motivated on your career journey</p>
          </div>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Study Time
          </Button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Progress</p>
                      <p className="text-2xl font-bold">{overallProgress}%</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">+5% this week</span>
                      </div>
                    </div>
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Week</p>
                      <p className="text-2xl font-bold">{currentWeekHours}h</p>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">Goal exceeded!</span>
                      </div>
                    </div>
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Courses Completed</p>
                      <p className="text-2xl font-bold">12</p>
                      <div className="flex items-center gap-1 mt-1">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">3 in progress</span>
                      </div>
                    </div>
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Learning Streak</p>
                      <p className="text-2xl font-bold">15 days</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Zap className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-orange-500">Keep it up!</span>
                      </div>
                    </div>
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Chart and Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Weekly Learning Activity</CardTitle>
                  <CardDescription>Your daily learning hours and completed modules</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={learningActivity}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="date" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={2} name="Hours" />
                        <Line type="monotone" dataKey="completed" stroke="#06b6d4" strokeWidth={2} name="Completed" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Career Goal Progress</CardTitle>
                  <CardDescription>Progress towards your Full Stack Developer goal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={careerGoalProgress}>
                        <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                        <Tooltip />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {careerGoalProgress.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Milestones */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Upcoming Milestones</CardTitle>
                <CardDescription>Important deadlines and goals to focus on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <Badge
                            variant={milestone.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {milestone.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{milestone.dueDate}</span>
                          </div>
                          <div className="flex-1 max-w-32">
                            <Progress value={milestone.progress} className="h-2" />
                          </div>
                          <span className="text-sm text-muted-foreground">{milestone.progress}%</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="ml-4 bg-transparent">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6 mt-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Skill Development Progress</CardTitle>
                <CardDescription>Track your proficiency levels and identify areas for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillProgress.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{skill.skill}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {skill.current}% / {skill.target}%
                          </span>
                          <Badge variant={skill.current >= skill.target ? "default" : "secondary"} className="text-xs">
                            {skill.current >= skill.target ? "Target Reached" : "In Progress"}
                          </Badge>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={skill.current} className="h-3" />
                        <div
                          className="absolute top-0 h-3 w-1 bg-orange-500 rounded-full"
                          style={{ left: `${skill.target}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Advanced</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Recommended Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Focus on Database Skills</h5>
                      <p className="text-sm text-muted-foreground">
                        You're behind on your database target. Consider taking the MongoDB course.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Play className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h5 className="font-medium">Practice Node.js Projects</h5>
                      <p className="text-sm text-muted-foreground">
                        Build more backend projects to reach your Node.js goal.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Skill Certificates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="font-medium">JavaScript Fundamentals</span>
                    </div>
                    <Badge variant="default" className="bg-green-500">
                      Earned
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">React Developer</span>
                    </div>
                    <Badge variant="outline">75% Complete</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`border-border bg-card ${achievement.earned ? "ring-2 ring-primary/20 bg-primary/5" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${achievement.earned ? "bg-primary/10" : "bg-muted"}`}>
                        <achievement.icon
                          className={`h-6 w-6 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      {achievement.earned ? (
                        <Badge variant="default">Earned</Badge>
                      ) : (
                        <Badge variant="outline">In Progress</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    {achievement.earned ? (
                      <p className="text-xs text-muted-foreground">Earned on {achievement.date}</p>
                    ) : (
                      <div className="space-y-2">
                        <Progress value={achievement.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">{achievement.progress}% complete</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Career Goal: Full Stack Developer</CardTitle>
                  <CardDescription>Target completion: March 2024</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />

                  <div className="space-y-3 pt-4">
                    <h4 className="font-medium">Key Milestones</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Complete Frontend Fundamentals
                        </span>
                        <Badge variant="default">Done</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Master React Development
                        </span>
                        <Badge variant="secondary">In Progress</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          Learn Backend Technologies
                        </span>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Weekly Goals</CardTitle>
                  <CardDescription>Stay on track with your learning schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Study Hours</span>
                      <span className="text-sm text-muted-foreground">
                        {currentWeekHours}h / {weeklyGoal}h
                      </span>
                    </div>
                    <Progress value={(currentWeekHours / weeklyGoal) * 100} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Complete Modules</span>
                      <span className="text-sm text-muted-foreground">3 / 4</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Practice Projects</span>
                      <span className="text-sm text-muted-foreground">1 / 2</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>

                  <Button className="w-full mt-4">
                    <Target className="h-4 w-4 mr-2" />
                    Update Goals
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
