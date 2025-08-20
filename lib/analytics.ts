import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sparsh-backend-n1lf.onrender.com/api"

// Generate unique session ID
const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Get or create session ID
const getSessionId = (): string => {
  if (typeof window === "undefined") return generateSessionId()

  let sessionId = sessionStorage.getItem("visitor_session_id")
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem("visitor_session_id", sessionId)
  }
  return sessionId
}

// Check if this is the first visit in this session
const isFirstVisit = (): boolean => {
  if (typeof window === "undefined") return true

  const hasVisited = localStorage.getItem("has_visited")
  if (!hasVisited) {
    localStorage.setItem("has_visited", "true")
    return true
  }
  return false
}

// Track visitor
export const trackVisitor = async (page = "/"): Promise<() => void> => {
  try {
    if (typeof window === "undefined") return () => {}

    const sessionId = getSessionId()
    const firstVisit = isFirstVisit()

    await axios.post(`${API_BASE_URL}/analytics/track`, {
      sessionId,
      page,
      referrer: document.referrer || "",
      userAgent: navigator.userAgent || "",
      isFirstVisit: firstVisit,
    })

    // Track visit duration
    const startTime = Date.now()

    const updateDuration = () => {
      const duration = Math.floor((Date.now() - startTime) / 1000)
      axios.put(`${API_BASE_URL}/analytics/track/${sessionId}/duration`, { duration })
        .catch(() => {}) // Ignore errors
    }

    window.addEventListener("beforeunload", updateDuration)
    const durationInterval = setInterval(updateDuration, 30000)

    // Cleanup function
    return () => {
      clearInterval(durationInterval)
      window.removeEventListener("beforeunload", updateDuration)
      updateDuration()
    }
  } catch (error) {
    console.error("Visitor tracking error:", error)
    return () => {} // empty cleanup on error
  }
}


// Analytics API for admin
export const analyticsAPI = {
  getStats: (period: string, startDate?: string, endDate?: string) =>
    axios.get(`${API_BASE_URL}/analytics/stats`, {
      params: { period, startDate, endDate },
      headers: {
        Authorization: `Bearer ${document.cookie.split("token=")[1]?.split(";")[0]}`,
      },
    }),

  getOverview: () =>
    axios.get(`${API_BASE_URL}/analytics/overview`, {
      headers: {
        Authorization: `Bearer ${document.cookie.split("token=")[1]?.split(";")[0]}`,
      },
    }),
}
