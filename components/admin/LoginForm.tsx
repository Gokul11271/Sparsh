"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Eye, EyeOff, LogIn, Sparkles } from "lucide-react"

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API
    const success = await login(formData.email, formData.password)
    if (success) {
      router.push("/admin/dashboard")
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7faf8] to-[#ef9343]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {loading ? (
          // Shimmer skeleton for entire card
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-[#ef9343]/20 animate-shimmer">
            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full bg-gray-200/80"></div>
              <div className="w-3/4 h-6 rounded-md bg-gray-200/80"></div>
              <div className="w-1/2 h-4 rounded-md bg-gray-200/80"></div>
              <div className="w-full h-10 rounded-md bg-gray-200/80"></div>
              <div className="w-full h-10 rounded-md bg-gray-200/80"></div>
              <div className="w-full h-12 rounded-md bg-gray-200/80"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#603202]">SPARSH</h1>
                  <p className="text-xs text-[#603202]/70 tracking-[0.2em]">DESIGN .</p>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-[#603202] mb-2">Admin Login</h2>
              <p className="text-[#603202]/70">Access your dashboard</p>
            </div>

            {/* Login Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-[#ef9343]/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#603202] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#ef9343]/30 rounded-xl focus:ring-2 focus:ring-[#ef9343] focus:border-transparent transition-all duration-300 bg-white/50"
                    placeholder="admin@sparshdesign.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#603202] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-12 border border-[#ef9343]/30 rounded-xl focus:ring-2 focus:ring-[#ef9343] focus:border-transparent transition-all duration-300 bg-white/50"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#603202]/50 hover:text-[#603202] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#ef9343] to-[#603202] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#603202] hover:to-[#ef9343] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-[#603202]/70">
              <p>&copy; 2024 SPARSH DESIGN. All rights reserved.</p>
            </div>
          </>
        )}
      </div>

      {/* Shimmer Animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .animate-shimmer > div > div {
          background-image: linear-gradient(
            to right,
            #e0e0e0 0%,
            #f0f0f0 20%,
            #e0e0e0 40%,
            #e0e0e0 100%
          );
          background-repeat: no-repeat;
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  )
}
