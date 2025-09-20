"use client"

import { Button } from "@/components/ui/button"
import { Brain, Menu, Target, BarChart3, Video, MessageCircle, LayoutDashboard, Sparkles, LogOut } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const demoUser = localStorage.getItem("demoUser")
      if (demoUser) {
        setIsAuthenticated(true)
        setUser(JSON.parse(demoUser))
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    }

    checkAuth()
    window.addEventListener("storage", checkAuth)
    window.addEventListener("authStateChanged", checkAuth)

    return () => {
      window.removeEventListener("storage", checkAuth)
      window.removeEventListener("authStateChanged", checkAuth)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("demoUser")
    setIsAuthenticated(false)
    setUser(null)
    window.dispatchEvent(new Event("authStateChanged"))
    router.push("/")
  }

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">CareerPath AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/features"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Features
              </Link>
              <Link
                href="/assessment"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Target className="h-4 w-4" />
                Assessment
              </Link>
              <Link
                href="/insights"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
                Market Insights
              </Link>
              <Link
                href="/videos"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Video className="h-4 w-4" />
                Videos
              </Link>
              <Link
                href="/virtual-guidance"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Virtual Avatar
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">Welcome, {user?.name}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hover:bg-primary/10 transition-all duration-300 bg-transparent"
              >
                <Link href="/auth">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="relative overflow-hidden group">
                <Link href="/auth" className="relative z-10">
                  <span className="absolute inset-0 shimmer-button opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Get Started
                </Link>
              </Button>
            </>
          )}
        </nav>

        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
