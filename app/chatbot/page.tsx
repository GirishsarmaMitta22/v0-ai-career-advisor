"use client"

import { useState, useRef, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  Bot,
  User,
  BookOpen,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Search,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  category?: string
  helpful?: boolean
}

interface Resource {
  id: string
  title: string
  type: "article" | "video" | "course" | "tool"
  url: string
  description: string
  category: string
  rating: number
}

const predefinedQuestions = {
  "Career Planning": [
    "How do I choose the right career path?",
    "What factors should I consider when changing careers?",
    "How do I identify my strengths and interests?",
    "What are the fastest-growing career fields?",
  ],
  "Skill Development": [
    "What technical skills are most in-demand?",
    "How do I learn programming from scratch?",
    "What certifications should I pursue?",
    "How do I stay updated with industry trends?",
  ],
  "Job Search": [
    "How do I write an effective resume?",
    "What are the best job search strategies?",
    "How do I prepare for interviews?",
    "How do I negotiate salary?",
  ],
  "Industry Insights": [
    "What are the current job market trends?",
    "Which industries are hiring the most?",
    "What are the salary expectations for my field?",
    "How is AI impacting different industries?",
  ],
}

const sampleResources: Resource[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    type: "course",
    url: "#",
    description: "Learn full-stack web development from scratch",
    category: "Programming",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Resume Writing Guide 2024",
    type: "article",
    url: "#",
    description: "Step-by-step guide to creating a standout resume",
    category: "Job Search",
    rating: 4.6,
  },
  {
    id: "3",
    title: "Data Science Career Path",
    type: "video",
    url: "#",
    description: "Complete roadmap for becoming a data scientist",
    category: "Career Planning",
    rating: 4.9,
  },
  {
    id: "4",
    title: "LinkedIn Profile Optimizer",
    type: "tool",
    url: "#",
    description: "AI-powered tool to optimize your LinkedIn profile",
    category: "Job Search",
    rating: 4.5,
  },
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredResources, setFilteredResources] = useState(sampleResources)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          type: "bot",
          content:
            "Hello! I'm your AI career assistant. I can help you with career planning, skill development, job search strategies, and industry insights. What would you like to know?",
          timestamp: new Date(),
        },
      ])
    }
  }, [messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    // Filter resources based on search and category
    let filtered = sampleResources

    if (selectedCategory !== "all") {
      filtered = filtered.filter((resource) => resource.category.toLowerCase().includes(selectedCategory.toLowerCase()))
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredResources(filtered)
  }, [selectedCategory, searchQuery])

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage
    if (!messageToSend.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: messageToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        "career planning":
          "Great question about career planning! Here are some key steps: 1) Assess your interests, values, and skills, 2) Research different career options, 3) Set short and long-term goals, 4) Create an action plan, and 5) Network with professionals in your field of interest. Would you like me to elaborate on any of these steps?",
        "skill development":
          "Skill development is crucial for career growth! Focus on both technical and soft skills relevant to your field. Consider online courses, certifications, hands-on projects, and mentorship. The key is continuous learning and staying updated with industry trends. What specific skills are you looking to develop?",
        "job search":
          "Effective job searching involves multiple strategies: 1) Optimize your resume and LinkedIn profile, 2) Network actively, 3) Apply to relevant positions, 4) Prepare thoroughly for interviews, and 5) Follow up professionally. The hidden job market through networking often yields the best opportunities. Need help with any specific aspect?",
        interview:
          "Interview preparation is key to success! Research the company thoroughly, practice common questions, prepare specific examples using the STAR method, dress appropriately, and prepare thoughtful questions to ask. Remember, interviews are two-way conversations. Would you like tips for specific types of interviews?",
        salary:
          "Salary negotiation requires preparation and confidence. Research market rates for your role and location, document your achievements and value, practice your pitch, and be prepared to discuss the entire compensation package, not just base salary. Timing and approach are crucial. Need specific negotiation strategies?",
        default:
          "That's an interesting question! Based on current industry trends and best practices, I'd recommend focusing on developing both technical skills relevant to your field and essential soft skills like communication, problem-solving, and adaptability. The job market is constantly evolving, so continuous learning is key. What specific area would you like to explore further?",
      }

      let response = responses.default
      const lowerMessage = messageToSend.toLowerCase()

      for (const [key, value] of Object.entries(responses)) {
        if (key !== "default" && lowerMessage.includes(key)) {
          response = value
          break
        }
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question)
  }

  const handleFeedback = (messageId: string, helpful: boolean) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, helpful } : msg)))
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course":
        return <GraduationCap className="h-4 w-4" />
      case "article":
        return <BookOpen className="h-4 w-4" />
      case "video":
        return <TrendingUp className="h-4 w-4" />
      case "tool":
        return <Briefcase className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">AI Career Chatbot</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Get instant answers to your career questions and discover helpful resources
              </p>
            </div>

            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
                <TabsTrigger value="resources">Resource Library</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Quick Questions Sidebar */}
                  <div className="lg:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Questions</CardTitle>
                        <CardDescription>Click on any question to get started</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(predefinedQuestions).map(([category, questions]) => (
                          <div key={category}>
                            <h4 className="font-semibold text-sm mb-2 text-primary">{category}</h4>
                            <div className="space-y-2">
                              {questions.map((question, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleQuestionClick(question)}
                                  className="w-full text-left text-sm p-2 rounded-md hover:bg-muted transition-colors"
                                >
                                  {question}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Chat Interface */}
                  <div className="lg:col-span-3">
                    <Card className="h-[600px] flex flex-col">
                      <CardHeader className="border-b">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle>AI Career Assistant</CardTitle>
                            <CardDescription>Online • Ready to help with your career questions</CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      {/* Messages Area */}
                      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            {message.type === "bot" && (
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Bot className="w-4 h-4 text-primary" />
                              </div>
                            )}
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</p>
                                {message.type === "bot" && (
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => handleFeedback(message.id, true)}
                                    >
                                      <ThumbsUp
                                        className={`h-3 w-3 ${message.helpful === true ? "text-green-500" : ""}`}
                                      />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => handleFeedback(message.id, false)}
                                    >
                                      <ThumbsDown
                                        className={`h-3 w-3 ${message.helpful === false ? "text-red-500" : ""}`}
                                      />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                            {message.type === "user" && (
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <User className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        ))}

                        {isTyping && (
                          <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <Bot className="w-4 h-4 text-primary" />
                            </div>
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </CardContent>

                      {/* Input Area */}
                      <div className="border-t p-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Ask me anything about your career..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            className="flex-1"
                          />
                          <Button onClick={() => handleSendMessage()} disabled={!inputMessage.trim()}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                {/* Resource Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Library</CardTitle>
                    <CardDescription>Discover curated resources to accelerate your career growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search resources..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          variant={selectedCategory === "all" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory("all")}
                        >
                          All
                        </Button>
                        <Button
                          variant={selectedCategory === "programming" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory("programming")}
                        >
                          Programming
                        </Button>
                        <Button
                          variant={selectedCategory === "career" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory("career")}
                        >
                          Career Planning
                        </Button>
                        <Button
                          variant={selectedCategory === "job search" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory("job search")}
                        >
                          Job Search
                        </Button>
                      </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredResources.map((resource) => (
                        <Card key={resource.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                {getResourceIcon(resource.type)}
                                <Badge variant="secondary" className="text-xs">
                                  {resource.type}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-muted-foreground">{resource.rating}</span>
                              </div>
                            </div>
                            <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {resource.category}
                              </Badge>
                              <Button size="sm" variant="outline">
                                View Resource
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
