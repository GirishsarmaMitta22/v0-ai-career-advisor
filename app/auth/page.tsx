"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const DEMO_USERS = [
  {
    email: "demo@careerpath.ai",
    password: "demo123",
    name: "Demo User",
    role: "Software Developer",
  },
  {
    email: "john@example.com",
    password: "password",
    name: "John Smith",
    role: "Data Scientist",
  },
]

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const demoUser = DEMO_USERS.find((user) => user.email === formData.email && user.password === formData.password)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (demoUser) {
      console.log("[v0] Demo login successful:", { user: demoUser.name, role: demoUser.role })
      // Store demo user data in localStorage
      localStorage.setItem("demoUser", JSON.stringify(demoUser))
      window.dispatchEvent(new Event("authStateChanged"))
      window.location.href = "/dashboard"
    } else {
      console.log("[v0] Sign in attempt with:", { email: formData.email })
      alert("Use demo credentials: demo@careerpath.ai / demo123")
    }

    setIsLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Sign up attempt with:", { name: formData.name, email: formData.email })

    const newUser = {
      email: formData.email,
      name: formData.name,
      role: "New User",
      password: formData.password,
    }
    localStorage.setItem("demoUser", JSON.stringify(newUser))
    window.dispatchEvent(new Event("authStateChanged"))

    setIsLoading(false)

    // Redirect to assessment on success
    window.location.href = "/assessment"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 bounce-in">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">CareerPath AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue your career journey</p>
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary font-medium">Demo Credentials:</p>
            <p className="text-xs text-muted-foreground">Email: demo@careerpath.ai</p>
            <p className="text-xs text-muted-foreground">Password: demo123</p>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50"></div>
          <CardContent className="relative z-10 p-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <Link href="/forgot-password" className="text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full relative overflow-hidden group" disabled={isLoading}>
                    <span className="absolute inset-0 shimmer-button opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full relative overflow-hidden group" disabled={isLoading}>
                    <span className="absolute inset-0 shimmer-button opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Create Account
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By signing up, you agree to our{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
