"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = "/auth" }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const demoUser = localStorage.getItem("demoUser")
      if (demoUser) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        router.push(redirectTo)
      }
    }

    checkAuth()
  }, [router, redirectTo])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
