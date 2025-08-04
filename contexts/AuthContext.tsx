"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"
// Update the path below to the correct relative path if needed
// Update the path below to the correct relative path if needed
import { authAPI } from "../lib/api"
// If the file does not exist, create ../lib/api.ts and export authAPI from it.
import toast from "react-hot-toast"

interface User {
  id: string
  username: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = Cookies.get("token")
      if (token) {
        const response = await authAPI.getMe()
        setUser(response.data.user)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      Cookies.remove("token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login({ email, password })
      const { token, user } = response.data

      Cookies.set("token", token, { expires: 7 })
      setUser(user)
      toast.success("Login successful!")
      return true
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed")
      return false
    }
  }

  const logout = () => {
    Cookies.remove("token")
    setUser(null)
    toast.success("Logged out successfully")
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
