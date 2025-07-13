"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

interface LiquidButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

export function LiquidButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
}: LiquidButtonProps) {
  const baseClasses =
    "relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl group"

  const variantClasses = {
    primary: "bg-gradient-to-r from-[#ef9343] to-[#603202] text-white hover:from-[#603202] hover:to-[#ef9343]",
    secondary: "bg-[#f7faf8] text-[#603202] border-2 border-[#ef9343] hover:bg-[#ef9343] hover:text-white",
    outline: "border-2 border-[#603202] text-[#603202] bg-transparent hover:bg-[#603202] hover:text-white",
  }

  const sizeClasses = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-12 py-6 text-lg",
  }

  return (
    <Button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} onClick={onClick}>
      <span className="relative z-10 font-medium tracking-wide">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
    </Button>
  )
}
