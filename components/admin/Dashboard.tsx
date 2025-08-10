"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { imagesAPI } from "@/lib/api"
import socketManager from "@/lib/socket"
import toast from "react-hot-toast"

import { ImageIcon, Search, Edit, Trash2, Eye, LogOut, Plus, BarChart3, Star } from "lucide-react"
import ImageUploadModal from "./ImageUploadModal"
import ImageEditModal from "./ImageEditModal"
import AnalyticsDashboard from "./AnalyticsDashboard"
import ReviewsManagement from "./ReviewsManagement"

interface Image {
  _id: string
  title: string
  description: string
  imageUrl: string
  sector: string
  template: string
  tags: string[]
  isActive: boolean
  createdAt: string
  uploadedBy: {
    username: string
    email: string
  }
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("images")
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [filters, setFilters] = useState({
    sector: "",
    template: "",
    search: "",
  })

  useEffect(() => {
    if (activeTab === "images") {
      fetchImages()
      setupSocketListeners()
    }

    return () => {
      socketManager.off("imageUploaded")
      socketManager.off("imageUpdated")
      socketManager.off("imageDeleted")
    }
  }, [activeTab])

  useEffect(() => {
    if (activeTab === "images") {
      fetchImages()
    }
  }, [filters, activeTab])

  const setupSocketListeners = () => {
    const socket = socketManager.connect()

    socketManager.onImageUploaded((data) => {
      setImages((prev) => [data.image, ...prev])
      toast.success("New image uploaded!")
    })

    socketManager.onImageUpdated((data) => {
      setImages((prev) => prev.map((img) => (img._id === data.image._id ? data.image : img)))
      toast.success("Image updated!")
    })

    socketManager.onImageDeleted((data) => {
      setImages((prev) => prev.filter((img) => img._id !== data.imageId))
      toast.success("Image deleted!")
    })
  }

  const fetchImages = async () => {
    try {
      const response = await imagesAPI.getAll(filters)
      setImages(response.data.images)
    } catch (error) {
      toast.error("Failed to fetch images")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      await imagesAPI.delete(id)
      // Real-time update will handle UI update
    } catch (error) {
      toast.error("Failed to delete image")
    }
  }

  const handleEdit = (image: Image) => {
    setSelectedImage(image)
    setEditModalOpen(true)
  }

  const sectors = ["Wedding", "Corporate", "Fashion", "Traditional", "Casual", "Festive", "Bridal", "Evening"]
  const templates = ["Portrait", "Landscape", "Square", "Collage", "Minimalist", "Vintage", "Modern", "Classic"]

  return (
    <div className="min-h-screen bg-[#f7faf8]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#ef9343]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-full flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#603202]">Admin Dashboard</h1>
                <p className="text-sm text-[#603202]/70">Welcome back, {user?.username}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Tab Navigation */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab("images")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    activeTab === "images" ? "bg-[#ef9343] text-white" : "bg-white text-[#603202] hover:bg-[#ef9343]/10"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Images</span>
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    activeTab === "reviews"
                      ? "bg-[#ef9343] text-white"
                      : "bg-white text-[#603202] hover:bg-[#ef9343]/10"
                  }`}
                >
                  <Star className="w-4 h-4" />
                  <span>Reviews</span>
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    activeTab === "analytics"
                      ? "bg-[#ef9343] text-white"
                      : "bg-white text-[#603202] hover:bg-[#ef9343]/10"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </button>
              </div>

              {activeTab === "images" && (
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="bg-gradient-to-r from-[#ef9343] to-[#603202] text-white px-4 py-2 rounded-lg hover:from-[#603202] hover:to-[#ef9343] transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Image</span>
                </button>
              )}

              <button onClick={logout} className="text-[#603202] hover:text-[#ef9343] transition-colors p-2">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "analytics" ? (
          <AnalyticsDashboard />
        ) : activeTab === "reviews" ? (
          <ReviewsManagement />
        ): (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-[#ef9343]/20 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#603202] mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#603202]/50" />
                    <input
                      type="text"
                      placeholder="Search images..."
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 border border-[#ef9343]/30 rounded-lg focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#603202] mb-2">Sector</label>
                  <select
                    value={filters.sector}
                    onChange={(e) => setFilters((prev) => ({ ...prev, sector: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#ef9343]/30 rounded-lg focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
                  >
                    <option value="">All Sectors</option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#603202] mb-2">Template</label>
                  <select
                    value={filters.template}
                    onChange={(e) => setFilters((prev) => ({ ...prev, template: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#ef9343]/30 rounded-lg focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
                  >
                    <option value="">All Templates</option>
                    {templates.map((template) => (
                      <option key={template} value={template}>
                        {template}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => setFilters({ sector: "", template: "", search: "" })}
                    className="w-full px-4 py-2 border border-[#ef9343]/30 text-[#603202] rounded-lg hover:bg-[#ef9343]/10 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Images Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-4 border-[#ef9343]/30 border-t-[#ef9343] rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((image) => (
                  <div
                    key={image._id}
                    className="bg-white rounded-xl shadow-sm border border-[#ef9343]/20 overflow-hidden group hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={image.imageUrl || "/placeholder.svg"}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                        <button
                          onClick={() => window.open(image.imageUrl, "_blank")}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(image)}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(image._id)}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-red-500/50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-[#603202] mb-1 truncate">{image.title}</h3>
                      <p className="text-sm text-[#603202]/70 mb-2 line-clamp-2">{image.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="bg-[#ef9343]/20 text-[#603202] px-2 py-1 rounded-full">{image.sector}</span>
                        <span className="bg-[#603202]/20 text-[#603202] px-2 py-1 rounded-full">{image.template}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-[#603202]/50">
                        <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                        <span className={`w-2 h-2 rounded-full ${image.isActive ? "bg-green-500" : "bg-red-500"}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {images.length === 0 && !loading && (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-[#603202]/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#603202] mb-2">No images found</h3>
                <p className="text-[#603202]/70 mb-4">Upload your first image to get started</p>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="bg-gradient-to-r from-[#ef9343] to-[#603202] text-white px-6 py-3 rounded-lg hover:from-[#603202] hover:to-[#ef9343] transition-all duration-300"
                >
                  Upload Image
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <ImageUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSuccess={() => {
          setUploadModalOpen(false)
          // Real-time update will handle UI update
        }}
      />

      <ImageEditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false)
          setSelectedImage(null)
        }}
        image={selectedImage}
        onSuccess={() => {
          setEditModalOpen(false)
          setSelectedImage(null)
          // Real-time update will handle UI update
        }}
      />
    </div>
  )
}
