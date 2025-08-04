"use client";

import type React from "react"

import { useState } from "react"
import { imagesAPI } from "@/lib/api"
import toast from "react-hot-toast"
import { X, Upload, ImageIcon } from "lucide-react"

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function ImageUploadModal({ isOpen, onClose, onSuccess }: ImageUploadModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sector: "",
    template: "",
    tags: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [uploading, setUploading] = useState(false)

  const sectors = ["Wedding", "Corporate", "Fashion", "Traditional", "Casual", "Festive", "Bridal", "Evening"]
  const templates = ["Portrait", "Landscape", "Square", "Collage", "Minimalist", "Vintage", "Modern", "Classic"]

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      toast.error("Please select an image")
      return
    }

    setUploading(true)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append("image", selectedFile)
      uploadFormData.append("title", formData.title)
      uploadFormData.append("description", formData.description)
      uploadFormData.append("sector", formData.sector)
      uploadFormData.append("template", formData.template)
      uploadFormData.append("tags", formData.tags)

      await imagesAPI.upload(uploadFormData)

      toast.success("Image uploaded successfully!")
      resetForm()
      onSuccess()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      sector: "",
      template: "",
      tags: "",
    })
    setSelectedFile(null)
    setPreview("")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#ef9343]/20">
          <h2 className="text-2xl font-bold text-[#603202]">Upload New Image</h2>
          <button onClick={handleClose} className="p-2 text-[#603202]/50 hover:text-[#603202] transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Upload */}
          {/* File Upload */}
<div>
  <label className="block text-sm font-medium text-[#603202] mb-2">Select Image</label>
  <div className="relative border-2 border-dashed border-[#ef9343]/30 rounded-xl p-6 text-center hover:border-[#ef9343]/50 transition-colors">
    {preview ? (
      <div className="relative">
        <img
          src={preview || "/placeholder.svg"}
          alt="Preview"
          className="max-h-48 mx-auto rounded-lg shadow-md"
        />
        <button
          type="button"
          onClick={() => {
            setSelectedFile(null)
            setPreview("")
          }}
          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ) : (
      <>
        <ImageIcon className="w-12 h-12 text-[#603202]/30 mx-auto mb-4" />
        <p className="text-[#603202]/70 mb-2">Click to select an image</p>
        <p className="text-sm text-[#603202]/50">PNG, JPG, JPEG up to 10MB</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </>
    )}
  </div>
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

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-[#ef9343]/30 text-[#603202] rounded-xl hover:bg-[#ef9343]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="px-6 py-3 bg-gradient-to-r from-[#ef9343] to-[#603202] text-white rounded-xl hover:from-[#603202] hover:to-[#ef9343] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Image</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
