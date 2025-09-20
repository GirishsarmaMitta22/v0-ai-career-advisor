"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Bot,
  User,
  Sparkles,
  GraduationCap,
  Briefcase,
  Target,
} from "lucide-react"
import type { SpeechRecognition } from "types/speech-recognition"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

interface UserProfile {
  skills: string[]
  education: string
  experience: string
  goals: string[]
}

const CAREER_QUESTIONS = {
  skills: [
    "What are your current technical skills?",
    "Which programming languages do you know?",
    "What tools and technologies are you familiar with?",
    "What soft skills do you consider your strengths?",
  ],
  education: [
    "What is your highest level of education?",
    "What did you study in college/university?",
    "Do you have any certifications?",
    "Are you currently pursuing any additional education?",
  ],
  experience: [
    "How many years of work experience do you have?",
    "What industries have you worked in?",
    "What was your most recent job role?",
    "What type of projects have you worked on?",
  ],
  goals: [
    "What are your short-term career goals?",
    "Where do you see yourself in 5 years?",
    "What type of role are you looking for?",
    "What industries interest you most?",
  ],
}

export default function VirtualGuidancePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your virtual career advisor. I'd like to learn more about you to provide personalized guidance. Let's start with understanding your background. What skills do you currently have?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [currentQuestionType, setCurrentQuestionType] = useState<keyof typeof CAREER_QUESTIONS>("skills")
  const [userProfile, setUserProfile] = useState<UserProfile>({
    skills: [],
    education: "",
    experience: "",
    goals: [],
  })
  const [questionIndex, setQuestionIndex] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "en-US"

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = () => {
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const generateCareerResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (currentQuestionType === "skills") {
      if (message.includes("skill") || message.includes("programming") || message.includes("technology")) {
        setCurrentQuestionType("education")
        setQuestionIndex(0)
        return (
          "Great! I can see you have valuable skills. Now let's talk about your educational background. " +
          CAREER_QUESTIONS.education[0]
        )
      }
      return (
        "That's helpful! Can you tell me more about your technical skills? For example: " + CAREER_QUESTIONS.skills[1]
      )
    } else if (currentQuestionType === "education") {
      if (
        message.includes("degree") ||
        message.includes("university") ||
        message.includes("college") ||
        message.includes("education")
      ) {
        setCurrentQuestionType("experience")
        setQuestionIndex(0)
        return (
          "Excellent educational background! Now I'd like to understand your work experience. " +
          CAREER_QUESTIONS.experience[0]
        )
      }
      return (
        "Thanks for sharing! " +
        CAREER_QUESTIONS.education[Math.min(questionIndex + 1, CAREER_QUESTIONS.education.length - 1)]
      )
    } else if (currentQuestionType === "experience") {
      if (
        message.includes("year") ||
        message.includes("experience") ||
        message.includes("work") ||
        message.includes("job")
      ) {
        setCurrentQuestionType("goals")
        setQuestionIndex(0)
        return (
          "Perfect! Your experience is valuable. Finally, let's discuss your career goals. " + CAREER_QUESTIONS.goals[0]
        )
      }
      return (
        "That's great experience! " +
        CAREER_QUESTIONS.experience[Math.min(questionIndex + 1, CAREER_QUESTIONS.experience.length - 1)]
      )
    } else if (currentQuestionType === "goals") {
      return "Thank you for sharing your goals! Based on what you've told me about your skills, education, experience, and goals, I can provide personalized career recommendations. Would you like me to suggest some career paths that align with your profile?"
    }

    // Default responses for general career questions
    if (message.includes("career") || message.includes("planning") || message.includes("goal")) {
      return "Career planning is crucial for professional success. Based on our conversation, I can help you create a personalized career roadmap. What specific aspect would you like to focus on?"
    } else if (message.includes("skill") || message.includes("learn") || message.includes("develop")) {
      return "Skill development is key to career growth! I can recommend learning paths based on your current skills and career goals. What skills are you most interested in developing?"
    } else if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! I'm excited to help you with your career journey. Let's continue building your profile so I can provide the best guidance."
    }

    return (
      "That's interesting! Let me ask you another question to better understand your career path. " +
      CAREER_QUESTIONS[currentQuestionType][Math.min(questionIndex, CAREER_QUESTIONS[currentQuestionType].length - 1)]
    )
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
    }
  }

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Generate AI response
    setTimeout(() => {
      const responseContent = generateCareerResponse(inputMessage)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Speak the response
      speakText(responseContent)
    }, 1000)

    setInputMessage("")
    setQuestionIndex((prev) => prev + 1)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                AI Career Path Guidance
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">Discover Your Career Path</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have a personalized conversation about your skills, education, and career goals to get tailored
                guidance.
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${currentQuestionType === "skills" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  <Target className="h-4 w-4" />
                  Skills
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${currentQuestionType === "education" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  <GraduationCap className="h-4 w-4" />
                  Education
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${currentQuestionType === "experience" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  <Briefcase className="h-4 w-4" />
                  Experience
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${currentQuestionType === "goals" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  <Sparkles className="h-4 w-4" />
                  Goals
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Virtual Career Advisor</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Analyzing your profile</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Voice Enabled</Badge>
                    {isSpeaking && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={stopSpeaking}
                        className="text-destructive hover:text-destructive bg-transparent"
                      >
                        <VolumeX className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    {message.type === "user" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Share your skills, education, or career goals..."
                      className="pr-12"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute right-1 top-1 h-8 w-8 p-0 ${
                        isListening ? "text-red-500" : "text-muted-foreground"
                      }`}
                      onClick={isListening ? stopListening : startListening}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button onClick={sendMessage} disabled={!inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                  <div className="flex items-center gap-4">
                    {isListening && (
                      <span className="flex items-center gap-1 text-red-500">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        Listening...
                      </span>
                    )}
                    {isSpeaking && (
                      <span className="flex items-center gap-1 text-green-500">
                        <Volume2 className="h-3 w-3" />
                        Speaking...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => setInputMessage("I have experience in JavaScript, Python, and React")}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <Target className="h-5 w-5" />
                <span className="text-sm">Share Skills</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setInputMessage("I have a Bachelor's degree in Computer Science")}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <GraduationCap className="h-5 w-5" />
                <span className="text-sm">Education</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setInputMessage("I have 3 years of experience as a software developer")}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <Briefcase className="h-5 w-5" />
                <span className="text-sm">Experience</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setInputMessage("I want to become a senior developer in the next 2 years")}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                <span className="text-sm">Career Goals</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
