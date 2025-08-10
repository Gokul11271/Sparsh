import axios from "axios"
import Cookies from "js-cookie"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token")
      window.location.href = "/admin/login"
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) => api.post("/auth/login", credentials),

  register: (userData: { username: string; email: string; password: string }) => api.post("/auth/register", userData),

  getMe: () => api.get("/auth/me"),

  logout: () => api.post("/auth/logout"),
}

// Images API
export const imagesAPI = {
  upload: (formData: FormData) =>
    api.post("/images/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getAll: (params?: any) => api.get("/images/admin", { params }),

  update: (id: string, data: any) => api.put(`/images/${id}`, data),

  delete: (id: string) => api.delete(`/images/${id}`),
}

// Gallery API
export const galleryAPI = {
  getImages: (params?: any) => api.get("/gallery", { params }),

  getFilters: () => api.get("/gallery/filters"),

  getImage: (id: string) => api.get(`/gallery/${id}`),
}

// Reviews API
export const reviewsAPI = {
  // Public endpoints
  getPublic: (params?: any) => api.get("/reviews/public", { params }),

  submit: (formData: FormData) =>
    api.post("/reviews/submit", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Admin endpoints
  getAll: (params?: any) => api.get("/reviews/admin", { params }),

  approve: (id: string) => api.put(`/reviews/admin/${id}/approve`),

  updateVisibility: (id: string, isVisible: boolean) => api.put(`/reviews/admin/${id}/visibility`, { isVisible }),

  delete: (id: string) => api.delete(`/reviews/admin/${id}`),

  getStats: () => api.get("/reviews/admin/stats"),
}

// Analytics API
export const analyticsAPI = {
  track: (data: any) => api.post("/analytics/track", data),

  updateDuration: (sessionId: string, duration: number) =>
    api.put(`/analytics/track/${sessionId}/duration`, { duration }),

  getStats: (params?: any) => api.get("/analytics/stats", { params }),

  getOverview: () => api.get("/analytics/overview"),

  getRecent: () => api.get("/analytics/recent"),

  test: () => api.get("/analytics/test"),
}


export default api
