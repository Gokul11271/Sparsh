"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackVisitor } from "@/lib/analytics"

export function VisitorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    let isMounted = true

    const runTracking = async () => {
      try {
        await trackVisitor(pathname)
      } catch (error) {
        console.error("Error tracking visitor:", error)
      }
    }

    if (isMounted) {
      runTracking()
    }

    return () => {
      isMounted = false
    }
  }, [pathname])

  return null
}
