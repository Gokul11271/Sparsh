"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import LoginForm from "@/components/admin/LoginForm"

export default function AdminLoginPage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/admin/dashboard")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7faf8] to-[#ef9343]/10 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ef9343]/30 border-t-[#ef9343] rounded-full animate-spin" />
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect
  }

  return <LoginForm />
}
