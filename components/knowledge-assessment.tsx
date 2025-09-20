"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Brain, Target, TrendingUp, Award, ArrowRight, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface AssessmentResult {
  category: string
  score: number
  level: "beginner" | "intermediate" | "advanced"
  recommendations: string[]
  roadmapSuggestions: string[]
}

const knowledgeQuestions: Question[] = [
  // Programming Questions
  {
    id: "prog1",
    category: "Programming",
    difficulty: "beginner",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language",
    ],
    correctAnswer: 0,
    explanation:
      "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.",
  },
  {
    id: "prog2",
    category: "Programming",
    difficulty: "intermediate",
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    correctAnswer: 2,
    explanation:
      "JavaScript doesn't have a specific 'Float' data type. Numbers in JavaScript are all stored as double-precision floating-point numbers.",
  },
  {
    id: "prog3",
    category: "Programming",
    difficulty: "advanced",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    explanation:
      "Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each step.",
  },

  // Data Science Questions
  {
    id: "ds1",
    category: "Data Science",
    difficulty: "beginner",
    question: "What is the most common measure of central tendency?",
    options: ["Mode", "Median", "Mean", "Range"],
    correctAnswer: 2,
    explanation:
      "Mean (average) is the most commonly used measure of central tendency, calculated by summing all values and dividing by the count.",
  },
  {
    id: "ds2",
    category: "Data Science",
    difficulty: "intermediate",
    question: "Which Python library is primarily used for data manipulation and analysis?",
    options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
    correctAnswer: 1,
    explanation:
      "Pandas is the primary library for data manipulation and analysis in Python, providing data structures like DataFrames.",
  },
  {
    id: "ds3",
    category: "Data Science",
    difficulty: "advanced",
    question: "What is overfitting in machine learning?",
    options: [
      "Model performs well on training data but poorly on test data",
      "Model performs poorly on both training and test data",
      "Model performs well on test data but poorly on training data",
      "Model has too few parameters",
    ],
    correctAnswer: 0,
    explanation:
      "Overfitting occurs when a model learns the training data too well, including noise, making it perform poorly on new, unseen data.",
  },

  // Digital Marketing Questions
  {
    id: "dm1",
    category: "Digital Marketing",
    difficulty: "beginner",
    question: "What does SEO stand for?",
    options: [
      "Social Engine Optimization",
      "Search Engine Optimization",
      "Site Enhancement Operations",
      "Search Enhancement Optimization",
    ],
    correctAnswer: 1,
    explanation:
      "SEO stands for Search Engine Optimization, the practice of optimizing websites to rank higher in search engine results.",
  },
  {
    id: "dm2",
    category: "Digital Marketing",
    difficulty: "intermediate",
    question: "What is the primary goal of A/B testing in digital marketing?",
    options: [
      "To increase website traffic",
      "To compare two versions to see which performs better",
      "To reduce advertising costs",
      "To improve social media engagement",
    ],
    correctAnswer: 1,
    explanation:
      "A/B testing compares two versions of a webpage, email, or ad to determine which one performs better based on specific metrics.",
  },
  {
    id: "dm3",
    category: "Digital Marketing",
    difficulty: "advanced",
    question: "What is the customer lifetime value (CLV)?",
    options: [
      "The cost to acquire a customer",
      "The total revenue a customer generates over their relationship with a business",
      "The time a customer spends on a website",
      "The number of purchases a customer makes",
    ],
    correctAnswer: 1,
    explanation:
      "Customer Lifetime Value (CLV) is the total revenue a business can expect from a customer throughout their entire relationship.",
  },
]

export function KnowledgeAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([])
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      handleSubmitAssessment()
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeRemaining])

  const startAssessment = () => {
    setIsActive(true)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setTimeRemaining(600)
  }

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < knowledgeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = (): AssessmentResult[] => {
    const categoryScores: { [key: string]: { correct: number; total: number } } = {}

    knowledgeQuestions.forEach((question) => {
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { correct: 0, total: 0 }
      }
      categoryScores[question.category].total++

      if (selectedAnswers[question.id] === question.correctAnswer) {
        categoryScores[question.category].correct++
      }
    })

    return Object.entries(categoryScores).map(([category, scores]) => {
      const percentage = (scores.correct / scores.total) * 100
      let level: "beginner" | "intermediate" | "advanced"
      let recommendations: string[]
      let roadmapSuggestions: string[]

      if (percentage >= 80) {
        level = "advanced"
        recommendations = [
          "Consider advanced certifications in this field",
          "Look into leadership or specialized roles",
          "Mentor others and contribute to open source projects",
        ]
        roadmapSuggestions = [
          "Advanced specialization tracks",
          "Leadership development programs",
          "Industry expert certifications",
        ]
      } else if (percentage >= 60) {
        level = "intermediate"
        recommendations = [
          "Focus on practical projects and real-world applications",
          "Consider intermediate-level certifications",
          "Join professional communities and networks",
        ]
        roadmapSuggestions = [
          "Intermediate skill development",
          "Professional certification paths",
          "Industry-specific training programs",
        ]
      } else {
        level = "beginner"
        recommendations = [
          "Start with foundational courses and tutorials",
          "Practice with beginner-friendly projects",
          "Build a strong understanding of core concepts",
        ]
        roadmapSuggestions = [
          "Beginner learning paths",
          "Foundational skill building",
          "Entry-level certification preparation",
        ]
      }

      return {
        category,
        score: percentage,
        level,
        recommendations,
        roadmapSuggestions,
      }
    })
  }

  const handleSubmitAssessment = () => {
    setIsActive(false)
    const results = calculateResults()
    setAssessmentResults(results)
    setShowResults(true)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const progress = ((currentQuestion + 1) / knowledgeQuestions.length) * 100

  if (!isActive && !showResults) {
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Knowledge Assessment</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Test your knowledge across different domains and get personalized career recommendations
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Assessment Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">{knowledgeQuestions.length}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">10</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="font-semibold">What you'll be tested on:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Programming</Badge>
                    <span className="text-sm text-muted-foreground">Web dev, algorithms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Data Science</Badge>
                    <span className="text-sm text-muted-foreground">ML, statistics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Digital Marketing</Badge>
                    <span className="text-sm text-muted-foreground">SEO, analytics</span>
                  </div>
                </div>
              </div>

              <Button onClick={startAssessment} size="lg" className="w-full">
                <Brain className="h-5 w-5 mr-2" />
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  if (showResults) {
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Assessment Results</h1>
            <p className="text-xl text-muted-foreground">
              Here's your knowledge level analysis and personalized recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {assessmentResults.map((result, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{result.category}</CardTitle>
                    <Badge
                      variant={
                        result.level === "advanced"
                          ? "default"
                          : result.level === "intermediate"
                            ? "secondary"
                            : "outline"
                      }
                      className="capitalize"
                    >
                      {result.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold text-primary">{Math.round(result.score)}%</div>
                    {result.score >= 80 ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : result.score >= 60 ? (
                      <Target className="h-6 w-6 text-yellow-500" />
                    ) : (
                      <TrendingUp className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Recommendations:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {result.recommendations.map((rec, recIndex) => (
                          <li key={recIndex} className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Learning Paths:</h4>
                      <div className="space-y-1">
                        {result.roadmapSuggestions.map((suggestion, sugIndex) => (
                          <Badge key={sugIndex} variant="outline" className="text-xs mr-1 mb-1">
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Your Personalized Career Roadmap
              </CardTitle>
              <CardDescription>Based on your assessment results, here's your recommended learning path</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Immediate Next Steps (1-3 months)</h3>
                  <div className="space-y-3">
                    {assessmentResults.map((result, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {result.category}
                          </Badge>
                          <span className="text-sm font-medium">
                            {result.level === "beginner"
                              ? "Foundation Building"
                              : result.level === "intermediate"
                                ? "Skill Enhancement"
                                : "Advanced Mastery"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {result.level === "beginner"
                            ? "Focus on core concepts and basic projects"
                            : result.level === "intermediate"
                              ? "Work on real-world projects and certifications"
                              : "Lead projects and mentor others"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Long-term Goals (6-12 months)</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Career Advancement</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on your strongest areas, consider roles in{" "}
                        {assessmentResults
                          .filter((r) => r.score >= 60)
                          .map((r) => r.category.toLowerCase())
                          .join(", ") || "your areas of interest"}
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Skill Development</h4>
                      <p className="text-sm text-muted-foreground">
                        Continue building expertise in your strong areas while improving weaker domains
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Professional Growth</h4>
                      <p className="text-sm text-muted-foreground">
                        Network with professionals, contribute to projects, and consider leadership opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setShowResults(false)
                setIsActive(false)
                setCurrentQuestion(0)
                setSelectedAnswers({})
              }}
              variant="outline"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Assessment
            </Button>
            <Button asChild>
              <Link href="/virtual-guidance">
                <ArrowRight className="h-4 w-4 mr-2" />
                Explore Career Guidance
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/videos">View Learning Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const currentQ = knowledgeQuestions[currentQuestion]

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header with timer and progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Knowledge Assessment</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {knowledgeQuestions.length}
              </div>
              <div
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  timeRemaining <= 60 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                }`}
              >
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{currentQ.category}</Badge>
              <Badge
                variant={
                  currentQ.difficulty === "advanced"
                    ? "default"
                    : currentQ.difficulty === "intermediate"
                      ? "secondary"
                      : "outline"
                }
              >
                {currentQ.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQ.id]?.toString() || ""}
              onValueChange={(value) => handleAnswerSelect(currentQ.id, Number.parseInt(value))}
            >
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestion === knowledgeQuestions.length - 1 ? (
              <Button onClick={handleSubmitAssessment}>Submit Assessment</Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
