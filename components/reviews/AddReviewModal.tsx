"use client"

import type React from "react"

import { useState } from "react"
import { reviewsAPI } from "@/lib/api"
import toast from "react-hot-toast"
import { X, Star, Upload, User } from "lucide-react"

interface AddReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddReviewModal({ isOpen, onClose, onSuccess }: AddReviewModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    location: "",
    content: "",
    rating: 5,
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number.parseInt(value) : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.role || !formData.location || !formData.content) {
      toast.error("Please fill in all required fields")
      return
    }

    if (formData.content.length < 10) {
      toast.error("Review content should be at least 10 characters long")
      return
    }

    setLoading(true)

    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value.toString())
      })

      if (image) {
        submitData.append("image", image)
      }

      await reviewsAPI.submit(submitData)

      toast.success("Thank you for your review! It will be published after approval.")

      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "",
        location: "",
        content: "",
        rating: 5,
      })
      setImage(null)
      setImagePreview("")

      onSuccess?.()
      onClose()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit review")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#ef9343]/20">
          <div>
            <h2 className="text-2xl font-bold text-[#603202]">Share Your Experience</h2>
            <p className="text-[#603202]/70 mt-1">Tell us about your experience with SPARSH DESIGN</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#ef9343]/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-[#603202]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#603202] mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#ef9343]/30 rounded-lg focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#603202] mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#ef9343]/30 rounded-lg focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#603202] mb-2">Role/Profession *</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#ef9343]/30 rounded-lg focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
                placeholder="e.g., Bride, Corporate Executive"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#603202] mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#ef9343]/30 rounded-lg focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
                placeholder="e.g., Chennai, Mumbai"
                required
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-[#603202] mb-2">Rating *</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.rating ? "text-[#ef9343] fill-current" : "text-[#603202]/30"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-[#603202]/70">
                {formData.rating} star{formData.rating !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Review Content */}
          <div>
            <label className="block text-sm font-medium text-[#603202] mb-2">Your Review *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-[#ef9343]/30 rounded-lg focus:ring-2 focus:ring-[#ef9343] focus:border-transparent resize-none"
              placeholder="Share your experience with SPARSH DESIGN..."
              required
            />
            <div className="text-right text-sm text-[#603202]/50 mt-1">{formData.content.length}/1000 characters</div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-[#603202] mb-2">Profile Photo (Optional)</label>
            <div className="flex items-center space-x-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#ef9343]/30"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null)
                      setImagePreview("")
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 border-2 border-dashed border-[#ef9343]/30 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-[#603202]/30" />
                </div>
              )}

              <div>
                <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                <label
                  htmlFor="image"
                  className="inline-flex items-center space-x-2 px-4 py-2 border border-[#ef9343]/30 text-[#603202] rounded-lg hover:bg-[#ef9343]/10 transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Photo</span>
                </label>
                <p className="text-xs text-[#603202]/50 mt-1">Max 5MB, JPG/PNG only</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-[#ef9343]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-[#ef9343]/30 text-[#603202] rounded-lg hover:bg-[#ef9343]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-[#ef9343] to-[#603202] text-white rounded-lg hover:from-[#603202] hover:to-[#ef9343] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Review</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
