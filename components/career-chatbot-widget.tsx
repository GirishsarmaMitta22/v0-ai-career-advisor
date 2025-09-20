"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Bot, User, Youtube, ExternalLink, Minimize2, Maximize2 } from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  videoSuggestions?: VideoSuggestion[]
}

interface VideoSuggestion {
  id: string
  title: string
  channel: string
  duration: string
  thumbnail: string
  url: string
  category: string
}

const domainVideos: Record<string, VideoSuggestion[]> = {
  "machine learning": [
    {
      id: "1",
      title: "Machine Learning Explained - Complete Beginner's Guide",
      channel: "Tech with Tim",
      duration: "45:30",
      thumbnail: "/placeholder.svg?height=90&width=160&text=ML+Guide",
      url: "https://youtube.com/watch?v=example1",
      category: "Machine Learning",
    },
    {
      id: "2",
      title: "Python for Machine Learning - Full Course",
      channel: "freeCodeCamp",
      duration: "3:15:20",
      thumbnail: "/placeholder.svg?height=90&width=160&text=Python+ML",
      url: "https://youtube.com/watch?v=example2",
      category: "Machine Learning",
    },
  ],
  "artificial intelligence": [
    {
      id: "3",
      title: "AI Fundamentals - What You Need to Know in 2024",
      channel: "AI Explained",
      duration: "28:45",
      thumbnail: "/placeholder.svg?height=90&width=160&text=AI+2024",
      url: "https://youtube.com/watch?v=example3",
      category: "Artificial Intelligence",
    },
    {
      id: "4",
      title: "Building Your First AI Application",
      channel: "Code with Mosh",
      duration: "1:12:30",
      thumbnail: "/placeholder.svg?height=90&width=160&text=First+AI+App",
      url: "https://youtube.com/watch?v=example4",
      category: "Artificial Intelligence",
    },
  ],
  "web development": [
    {
      id: "5",
      title: "Full Stack Web Development Roadmap 2024",
      channel: "Traversy Media",
      duration: "35:20",
      thumbnail: "/placeholder.svg?height=90&width=160&text=Web+Dev+2024",
      url: "https://youtube.com/watch?v=example5",
      category: "Web Development",
    },
  ],
  "data science": [
    {
      id: "6",
      title: "Data Science Career Path - Complete Guide",
      channel: "Data School",
      duration: "42:15",
      thumbnail: "/placeholder.svg?height=90&width=160&text=Data+Science+Career",
      url: "https://youtube.com/watch?v=example6",
      category: "Data Science",
    },
  ],
}

export function CareerChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "1",
          type: "bot",
          content:
            "Hi! I'm your Career Assistant. I can help you with career guidance, skill development, and suggest relevant learning videos. What would you like to know about?",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const detectDomain = (message: string): string[] => {
    const lowerMessage = message.toLowerCase()
    const domains = []

    if (lowerMessage.includes("machine learning") || lowerMessage.includes("ml")) {
      domains.push("machine learning")
    }
    if (lowerMessage.includes("artificial intelligence") || lowerMessage.includes("ai")) {
      domains.push("artificial intelligence")
    }
    if (
      lowerMessage.includes("web development") ||
      lowerMessage.includes("frontend") ||
      lowerMessage.includes("backend")
    ) {
      domains.push("web development")
    }
    if (lowerMessage.includes("data science") || lowerMessage.includes("data analysis")) {
      domains.push("data science")
    }

    return domains
  }

  const getVideoSuggestions = (domains: string[]): VideoSuggestion[] => {
    const suggestions: VideoSuggestion[] = []
    domains.forEach((domain) => {
      if (domainVideos[domain]) {
        suggestions.push(...domainVideos[domain])
      }
    })
    return suggestions.slice(0, 3) // Limit to 3 suggestions
  }

  const generateResponse = (userMessage: string): { content: string; videoSuggestions?: VideoSuggestion[] } => {
    const domains = detectDomain(userMessage)
    const videoSuggestions = getVideoSuggestions(domains)

    const lowerMessage = userMessage.toLowerCase()

    if (domains.length > 0) {
      const domainText = domains.join(" and ")
      return {
        content: `Great question about ${domainText}! This is an exciting field with lots of opportunities. Here are some key points to consider and I've also found some helpful YouTube videos for you to explore.`,
        videoSuggestions: videoSuggestions.length > 0 ? videoSuggestions : undefined,
      }
    }

    if (lowerMessage.includes("career") || lowerMessage.includes("job")) {
      return {
        content:
          "Career planning is crucial for professional success! I can help you with career transitions, skill development, interview preparation, and finding the right opportunities. What specific aspect of your career would you like to focus on?",
      }
    }

    if (lowerMessage.includes("skill") || lowerMessage.includes("learn")) {
      return {
        content:
          "Skill development is key to career growth! The most in-demand skills currently include programming, data analysis, digital marketing, and soft skills like communication. What specific skills are you interested in developing?",
      }
    }

    return {
      content:
        "I'm here to help with your career journey! I can assist with career planning, skill development, job search strategies, and recommend learning resources. Feel free to ask about any specific domain like AI, web development, data science, or general career advice.",
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    setTimeout(() => {
      const response = generateResponse(userMessage.content)

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.content,
        timestamp: new Date(),
        videoSuggestions: response.videoSuggestions,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-2xl transition-all duration-300 ${isMinimized ? "h-16" : "h-[500px]"}`}>
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-lg">Career Assistant</CardTitle>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
              {messages.map((message) => (
                <div key={message.id}>
                  <div className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    {message.type === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                    {message.type === "user" && (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <User className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {message.videoSuggestions && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Youtube className="h-4 w-4 text-red-500" />
                        Recommended Videos:
                      </div>
                      {message.videoSuggestions.map((video) => (
                        <div key={video.id} className="bg-muted/50 rounded-lg p-3 hover:bg-muted transition-colors">
                          <div className="flex gap-3">
                            <img
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              className="w-16 h-9 rounded object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{video.channel}</span>
                                <span>•</span>
                                <span>{video.duration}</span>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="secondary" className="text-xs">
                                  {video.category}
                                </Badge>
                                <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent" asChild>
                                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Watch
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-3 h-3 text-primary" />
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

            <div className="border-t p-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about your career..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 text-sm"
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim()} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
