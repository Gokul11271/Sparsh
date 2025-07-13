"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "slideInScale" | "liquidReveal"
}

export function AnimatedText({ children, className = "", delay = 0, animation = "fadeInUp" }: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const animationClasses = {
    fadeInUp: isVisible ? "opacity-100 translate-y-0 transition-all duration-1000 ease-out" : "opacity-0 translate-y-8",
    fadeInLeft: isVisible
      ? "opacity-100 translate-x-0 transition-all duration-1000 ease-out"
      : "opacity-0 -translate-x-8",
    fadeInRight: isVisible
      ? "opacity-100 translate-x-0 transition-all duration-1000 ease-out"
      : "opacity-0 translate-x-8",
    slideInScale: isVisible ? "opacity-100 scale-100 transition-all duration-1200 ease-out" : "opacity-0 scale-95",
    liquidReveal: isVisible
      ? "opacity-100 scale-100 rotate-0 transition-all duration-1500 ease-out"
      : "opacity-0 scale-90 rotate-1",
  }

  return (
    <div ref={ref} className={`${animationClasses[animation]} ${className}`}>
      {children}
    </div>
  )
}
