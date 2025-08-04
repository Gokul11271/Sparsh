"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { imagesAPI } from "@/lib/api"
import toast from "react-hot-toast"
import { X, Save } from "lucide-react"

interface Image {
  _id: string
  title: string
  description: string
  imageUrl: string
  sector: string
  template: string
  tags: string[]
  isActive: boolean
}

interface ImageEditModalProps {
  isOpen: boolean
  onClose: () => void
  image: Image | null
  onSuccess: () => void
}

export default function ImageEditModal({ isOpen, onClose, image, onSuccess }: ImageEditModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sector: "",
    template: "",
    tags: "",
    isActive: true,
  })
  const [saving, setSaving] = useState(false)

  const sectors = ["Wedding", "Corporate", "Fashion", "Traditional", "Casual", "Festive", "Bridal", "Evening"]
  const templates = ["Portrait", "Landscape", "Square", "Collage", "Minimalist", "Vintage", "Modern", "Classic"]

  useEffect(() => {
    if (image) {
      setFormData({
        title: image.title,
        description: image.description,
        sector: image.sector,
        template: image.template,
        tags: image.tags.join(", "),
        isActive: image.isActive,
      })
    }
  }, [image])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) return

    setSaving(true)

    try {
      await imagesAPI.update(image._id, formData)

      toast.success("Image updated successfully!")
      onSuccess()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed")
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen || !image) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#ef9343]/20">
          <h2 className="text-2xl font-bold text-[#603202]">Edit Image</h2>
          <button onClick={onClose} className="p-2 text-[#603202]/50 hover:text-[#603202] transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Preview */}
          <div className="text-center">
            <img
              src={image.imageUrl || "/placeholder.svg"}
              alt={image.title}
              className="max-h-48 mx-auto rounded-lg shadow-md"
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#603202] mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-[#ef9343]/30 rounded-xl focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
              placeholder="Enter image title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#603202] mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-[#ef9343]/30 rounded-xl focus:ring-2 focus:ring-[#ef9343] focus:border-transparent resize-none"
              placeholder="Enter image description"
            />
          </div>

          {/* Sector and Template */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sector" className="block text-sm font-medium text-[#603202] mb-2">
                Sector *
              </label>
              <select
                id="sector"
                value={formData.sector}
                onChange={(e) => setFormData((prev) => ({ ...prev, sector: e.target.value }))}
                required
                className="w-full px-4 py-3 border border-[#ef9343]/30 rounded-xl focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
              >
                <option value="">Select Sector</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="template" className="block text-sm font-medium text-[#603202] mb-2">
                Template *
              </label>
              <select
                id="template"
                value={formData.template}
                onChange={(e) => setFormData((prev) => ({ ...prev, template: e.target.value }))}
                required
                className="w-full px-4 py-3 border border-[#ef9343]/30 rounded-xl focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
              >
                <option value="">Select Template</option>
                {templates.map((template) => (
                  <option key={template} value={template}>
                    {template}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-[#603202] mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-3 border border-[#ef9343]/30 rounded-xl focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
              placeholder="Enter tags separated by commas"
            />
            <p className="text-xs text-[#603202]/50 mt-1">Separate multiple tags with commas</p>
          </div>

          {/* Active Status */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 text-[#ef9343] border-[#ef9343]/30 rounded focus:ring-[#ef9343]"
              />
              <span className="text-sm font-medium text-[#603202]">Active (visible in gallery)</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-[#ef9343]/30 text-[#603202] rounded-xl hover:bg-[#ef9343]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-[#ef9343] to-[#603202] text-white rounded-xl hover:from-[#603202] hover:to-[#ef9343] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
