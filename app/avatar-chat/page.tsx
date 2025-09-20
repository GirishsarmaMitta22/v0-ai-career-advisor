"use client"

import { useState, useRef, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Mic, MicOff, Volume2, VolumeX, User, Bot, Settings, Zap } from "lucide-react"

interface Message {
  id: string
  type: "user" | "avatar"
  content: string
  timestamp: Date
  emotion?: "happy" | "thinking" | "explaining" | "encouraging"
}

const avatarPersonalities = {
  "Career Mentor": {
    name: "Alex",
    description: "Experienced career counselor specializing in tech careers",
    avatar: "/professional-career-counselor-avatar.jpg",
    expertise: ["Career Planning", "Interview Prep", "Skill Development"],
    greeting:
      "Hi! I'm Alex, your AI career mentor. I'm here to help you navigate your career journey and achieve your professional goals. What would you like to discuss today?",
  },
  "Tech Expert": {
    name: "Sam",
    description: "Senior software engineer with expertise in modern technologies",
    avatar: "/tech-expert-software-engineer-avatar.jpg",
    expertise: ["Programming", "System Design", "Technology Trends"],
    greeting:
      "Hello! I'm Sam, your tech expert. I can help you with programming concepts, technology choices, and technical career advice. What technical challenge are you facing?",
  },
  "Industry Analyst": {
    name: "Jordan",
    description: "Market researcher with insights into job trends and opportunities",
    avatar: "/business-analyst-market-researcher-avatar.jpg",
    expertise: ["Market Trends", "Industry Analysis", "Job Market"],
    greeting:
      "Welcome! I'm Jordan, your industry analyst. I can provide insights into job market trends, salary expectations, and emerging opportunities. How can I help you understand the market better?",
  },
}

export default function AvatarChatPage() {
  const [selectedAvatar, setSelectedAvatar] = useState("Career Mentor")
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [avatarEmotion, setAvatarEmotion] = useState<"happy" | "thinking" | "explaining" | "encouraging">("happy")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentAvatar = avatarPersonalities[selectedAvatar as keyof typeof avatarPersonalities]

  useEffect(() => {
    // Initialize with greeting message
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          type: "avatar",
          content: currentAvatar.greeting,
          timestamp: new Date(),
          emotion: "happy",
        },
      ])
    }
  }, [selectedAvatar, currentAvatar.greeting, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)
    setAvatarEmotion("thinking")

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on your interests and the current market trends, I'd recommend focusing on developing skills in cloud computing and AI/ML. These areas are seeing tremendous growth and offer excellent career opportunities.",
        "I understand your concern about career transitions. It's completely normal to feel uncertain when making a big change. Let me help you create a structured plan to make this transition smoother and more confident.",
        "Excellent choice! The field you're considering has a lot of potential. Here are some specific steps you can take to get started, along with resources that will help you build the necessary skills.",
        "From what you've shared, it sounds like you have a solid foundation. The next step would be to focus on practical experience through projects and networking within the industry.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const avatarMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "avatar",
        content: randomResponse,
        timestamp: new Date(),
        emotion: "explaining",
      }

      setMessages((prev) => [...prev, avatarMessage])
      setIsTyping(false)
      setAvatarEmotion("happy")
    }, 2000)
  }

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording)
    // Voice recording logic would be implemented here
    console.log("[v0] Voice recording toggled:", !isRecording)
  }

  const handleSpeakToggle = () => {
    setIsSpeaking(!isSpeaking)
    // Text-to-speech logic would be implemented here
    console.log("[v0] Text-to-speech toggled:", !isSpeaking)
  }

  const getAvatarExpression = () => {
    if (isTyping) return "thinking"
    return avatarEmotion
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">AI Avatar Conversation</h1>
              <p className="text-xl text-muted-foreground mb-6">Have real-time conversations with AI career experts</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Avatar Selection Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Choose Your Advisor</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(avatarPersonalities).map(([key, avatar]) => (
                      <div
                        key={key}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedAvatar === key
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedAvatar(key)}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={avatar.avatar || "/placeholder.svg"}
                            alt={avatar.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{avatar.name}</h3>
                            <p className="text-sm text-muted-foreground">{key}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{avatar.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {avatar.expertise.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={currentAvatar.avatar || "/placeholder.svg"}
                            alt={currentAvatar.name}
                            className={`w-16 h-16 rounded-full object-cover transition-all duration-300 ${
                              getAvatarExpression() === "thinking" ? "animate-pulse" : ""
                            }`}
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                              isTyping ? "bg-yellow-500" : "bg-green-500"
                            }`}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{currentAvatar.name}</CardTitle>
                          <CardDescription>{isTyping ? "Thinking..." : "Online • Ready to help"}</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSpeakToggle}
                          className={isSpeaking ? "bg-primary text-primary-foreground" : ""}
                        >
                          {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
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
                        {message.type === "avatar" && (
                          <img
                            src={currentAvatar.avatar || "/placeholder.svg"}
                            alt={currentAvatar.name}
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                          />
                        )}
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
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
                        <img
                          src={currentAvatar.avatar || "/placeholder.svg"}
                          alt={currentAvatar.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
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
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Ask me anything about your career..."
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          className="pr-12"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${
                            isRecording ? "text-red-500" : ""
                          }`}
                          onClick={handleVoiceToggle}
                        >
                          {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setInputMessage("What skills should I focus on for my career?")}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Skill Advice
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setInputMessage("How do I prepare for technical interviews?")}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Interview Prep
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setInputMessage("What are the current job market trends?")}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Market Trends
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="h-5 w-5 text-primary" />
                    Voice Interaction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Speak naturally with your AI advisor using voice input and get audio responses.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    Personalized Responses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Each avatar has unique expertise and personality to provide tailored career advice.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Real-time Interaction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get instant responses and engage in natural conversations about your career goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
