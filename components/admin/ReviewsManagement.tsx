"use client"

import { useState, useEffect } from "react"
import { reviewsAPI } from "@/lib/api"
import toast from "react-hot-toast"
import { Star, Eye, EyeOff, Trash2, Check, Clock, Search, ChevronLeft, ChevronRight, User } from "lucide-react"
import Image from "next/image"

interface Review {
  _id: string
  name: string
  email: string
  role: string
  location: string
  content: string
  rating: number
  image: string
  isApproved: boolean
  isVisible: boolean
  createdAt: string
  approvedBy?: {
    username: string
    email: string
  }
  approvedAt?: string
}

interface ReviewStats {
  totalReviews: number
  approvedReviews: number
  pendingReviews: number
  hiddenReviews: number
  averageRating: number
  ratingDistribution: { [key: number]: number }
}

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    page: 1,
    limit: 10,
  })
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 10,
  })
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    hidden: 0,
  })

  useEffect(() => {
    fetchReviews()
    fetchStats()
  }, [filters])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const response = await reviewsAPI.getAll(filters)
      setReviews(response.data.data)
      setPagination(response.data.pagination)
      setCounts(response.data.counts)
    } catch (error) {
      toast.error("Failed to fetch reviews")
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await reviewsAPI.getStats()
      setStats(response.data.data)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      await reviewsAPI.approve(id)
      toast.success("Review approved successfully")
      fetchReviews()
      fetchStats()
    } catch (error) {
      toast.error("Failed to approve review")
    }
  }

  const handleVisibilityToggle = async (id: string, isVisible: boolean) => {
    try {
      await reviewsAPI.updateVisibility(id, !isVisible)
      toast.success(`Review ${!isVisible ? "shown" : "hidden"} successfully`)
      fetchReviews()
    } catch (error) {
      toast.error("Failed to update review visibility")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
      return
    }

    try {
      await reviewsAPI.delete(id)
      toast.success("Review deleted successfully")
      fetchReviews()
      fetchStats()
    } catch (error) {
      toast.error("Failed to delete review")
    }
  }

  const getStatusBadge = (review: Review) => {
    if (!review.isApproved) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </span>
      )
    }
    if (!review.isVisible) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <EyeOff className="w-3 h-3 mr-1" />
          Hidden
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <Check className="w-3 h-3 mr-1" />
        Published
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ef9343]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#603202]/70">Total Reviews</p>
                <p className="text-2xl font-bold text-[#603202]">{stats.totalReviews}</p>
              </div>
              <div className="w-12 h-12 bg-[#ef9343]/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-[#ef9343]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ef9343]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#603202]/70">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingReviews}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ef9343]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#603202]/70">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.approvedReviews}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ef9343]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#603202]/70">Average Rating</p>
                <p className="text-2xl font-bold text-[#603202]">
                  {stats.averageRating ? stats.averageRating.toFixed(1) : "0.0"}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#ef9343]/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-[#ef9343] fill-current" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-[#ef9343]/20 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#603202] mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#603202]/50" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
                className="w-full pl-10 pr-4 py-2 border border-[#ef9343]/30 rounded-lg focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#603202] mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value, page: 1 }))}
              className="w-full px-3 py-2 border border-[#ef9343]/30 rounded-lg focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
            >
              <option value="all">All Reviews ({counts.total})</option>
              <option value="pending">Pending ({counts.pending})</option>
              <option value="approved">Approved ({counts.approved})</option>
              <option value="hidden">Hidden ({counts.hidden})</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({ status: "all", search: "", page: 1, limit: 10 })}
              className="w-full px-4 py-2 border border-[#ef9343]/30 text-[#603202] rounded-lg hover:bg-[#ef9343]/10 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-sm border border-[#ef9343]/20 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-[#ef9343]/30 border-t-[#ef9343] rounded-full animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-[#603202]/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#603202] mb-2">No reviews found</h3>
            <p className="text-[#603202]/70">No reviews match your current filters</p>
          </div>
        ) : (
          <div className="divide-y divide-[#ef9343]/20">
            {reviews.map((review) => (
              <div key={review._id} className="p-6 hover:bg-[#f7faf8] transition-colors">
                <div className="flex items-start space-x-4">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    {review.image ? (
                      <Image
                        src={review.image || "/placeholder.svg"}
                        alt={review.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover border-2 border-[#ef9343]/30"
                      />
                    ) : (
                      <div className="w-15 h-15 bg-[#ef9343]/20 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-[#603202]" />
                      </div>
                    )}
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-[#603202]">{review.name}</h3>
                        <p className="text-sm text-[#603202]/70">
                          {review.role} • {review.location}
                        </p>
                      </div>
                      {getStatusBadge(review)}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "text-[#ef9343] fill-current" : "text-[#603202]/20"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-[#603202]/70 ml-2">{review.rating}/5</span>
                    </div>

                    {/* Review Text */}
                    <p className="text-[#603202]/80 mb-4 leading-relaxed">"{review.content}"</p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-[#603202]/50">
                      <div>
                        <span>Submitted on {new Date(review.createdAt).toLocaleDateString()}</span>
                        {review.approvedBy && <span className="ml-4">Approved by {review.approvedBy.username}</span>}
                      </div>
                      <span>{review.email}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex items-center space-x-2">
                    {!review.isApproved && (
                      <button
                        onClick={() => handleApprove(review._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Approve Review"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => handleVisibilityToggle(review._id, review.isVisible)}
                      className="p-2 text-[#603202] hover:bg-[#ef9343]/10 rounded-lg transition-colors"
                      title={review.isVisible ? "Hide Review" : "Show Review"}
                    >
                      {review.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleDelete(review._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-[#ef9343]/20 flex items-center justify-between">
            <div className="text-sm text-[#603202]/70">
              Showing {(pagination.current - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.current * pagination.limit, pagination.total)} of {pagination.total} reviews
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.current === 1}
                className="p-2 border border-[#ef9343]/30 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ef9343]/10 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-4 py-2 text-sm text-[#603202]">
                Page {pagination.current} of {pagination.pages}
              </span>

              <button
                onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.current === pagination.pages}
                className="p-2 border border-[#ef9343]/30 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ef9343]/10 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
