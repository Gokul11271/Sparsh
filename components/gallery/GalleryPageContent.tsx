"use client"

import { useState, useEffect } from "react"
import { galleryAPI } from "@/lib/api"
import socketManager from "@/lib/socket"
import { Badge } from "@/components/ui/badge"
import { AnimatedText } from "../animated-text"
import { Filter, Grid, List, Search, Eye, Calendar, Tag } from "lucide-react"
import { ImageModal } from "./image-modal"
import Image from "next/image"

interface GalleryImage {
  _id: string
  title: string
  description: string
  imageUrl: string
  sector: string
  template: string
  tags: string[]
  createdAt: string
}

export default function GalleryPageContent() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [groupedImages, setGroupedImages] = useState<Record<string, GalleryImage[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedSector, setSelectedSector] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "grouped">("grid")
  const [sectors, setSectors] = useState<string[]>([])
  const [templates, setTemplates] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchImages()
    fetchFilters()
    setupSocketListeners()

    return () => {
      socketManager.off("imageUploaded")
      socketManager.off("imageUpdated")
      socketManager.off("imageDeleted")
    }
  }, [])

  useEffect(() => {
    filterImages()
  }, [images, selectedSector, selectedTemplate, searchQuery])

  const setupSocketListeners = () => {
    const socket = socketManager.connect()

    socketManager.onImageUploaded((data) => {
      if (data.image.isActive) {
        setImages((prev) => [data.image, ...prev])
      }
    })

    socketManager.onImageUpdated((data) => {
      if (data.image.isActive) {
        setImages((prev) => prev.map((img) => (img._id === data.image._id ? data.image : img)))
      } else {
        setImages((prev) => prev.filter((img) => img._id !== data.image._id))
      }
    })

    socketManager.onImageDeleted((data) => {
      setImages((prev) => prev.filter((img) => img._id !== data.imageId))
    })
  }

  const fetchImages = async () => {
    try {
      const response = await galleryAPI.getImages()
      setImages(response.data.images)
    } catch (error) {
      console.error("Failed to fetch images:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFilters = async () => {
    try {
      const response = await galleryAPI.getFilters()
      setSectors(response.data.sectors)
      setTemplates(response.data.templates)
    } catch (error) {
      console.error("Failed to fetch filters:", error)
    }
  }

  const filterImages = () => {
    let filtered = images

    if (selectedSector) {
      filtered = filtered.filter((img) => img.sector === selectedSector)
    }

    if (selectedTemplate) {
      filtered = filtered.filter((img) => img.template === selectedTemplate)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(query) ||
          img.description.toLowerCase().includes(query) ||
          img.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    setFilteredImages(filtered)

    // Group by sector for grouped view
    const grouped = filtered.reduce(
      (acc, image) => {
        if (!acc[image.sector]) {
          acc[image.sector] = []
        }
        acc[image.sector].push(image)
        return acc
      },
      {} as Record<string, GalleryImage[]>,
    )
    setGroupedImages(grouped)
  }

  const clearFilters = () => {
    setSelectedSector("")
    setSelectedTemplate("")
    setSearchQuery("")
  }

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length)
  }

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length)
  }

  const currentModalImage = filteredImages[currentImageIndex]
    ? {
        src: filteredImages[currentImageIndex].imageUrl,
        alt: filteredImages[currentImageIndex].description,
        title: filteredImages[currentImageIndex].title,
      }
    : null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#ef9343]/30 border-t-[#ef9343] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#603202] font-medium">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <AnimatedText>
            <Badge className="w-fit mx-auto bg-[#ef9343]/20 text-[#603202] hover:bg-[#ef9343]/30 border-[#ef9343]/30">
              Our Gallery
            </Badge>
          </AnimatedText>

          <AnimatedText delay={200}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#603202]">
              Exquisite
              <span className="block bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
                Fashion Collection
              </span>
            </h1>
          </AnimatedText>

          <AnimatedText delay={400}>
            <p className="text-xl text-[#603202]/80 max-w-3xl mx-auto leading-relaxed">
              Discover our curated collection of luxury fashion designs, where every piece tells a story of
              craftsmanship, elegance, and timeless beauty.
            </p>
          </AnimatedText>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#ef9343]/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#603202]/50" />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#ef9343]/30 rounded-xl focus:ring-2 focus:ring-[#ef9343] focus:border-transparent bg-white/50"
                />
              </div>

              {/* Sector Filter */}
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-4 py-3 border border-[#ef9343]/30 rounded-xl focus:ring-2 focus:ring-[#ef9343] focus:border-transparent bg-white/50"
              >
                <option value="">All Sectors</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>

              {/* Template Filter */}
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="px-4 py-3 border border-[#ef9343]/30 rounded-xl focus:ring-2 focus:ring-[#ef9343] focus:border-transparent bg-white/50"
              >
                <option value="">All Templates</option>
                {templates.map((template) => (
                  <option key={template} value={template}>
                    {template}
                  </option>
                ))}
              </select>

              {/* Clear Filters */}
              {(selectedSector || selectedTemplate || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 bg-[#ef9343]/20 text-[#603202] rounded-xl hover:bg-[#ef9343]/30 transition-colors whitespace-nowrap"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#ef9343] text-white"
                    : "bg-white/50 text-[#603202]/70 hover:text-[#603202] hover:bg-white/80"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grouped")}
                className={`p-3 rounded-xl transition-colors ${
                  viewMode === "grouped"
                    ? "bg-[#ef9343] text-white"
                    : "bg-white/50 text-[#603202]/70 hover:text-[#603202] hover:bg-white/80"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-[#ef9343]/20">
            <p className="text-sm text-[#603202]/70">
              Showing <span className="font-semibold text-[#603202]">{filteredImages.length}</span> of{" "}
              <span className="font-semibold text-[#603202]">{images.length}</span> images
            </p>
          </div>
        </div>

        {/* Gallery Content */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-[#ef9343]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-10 h-10 text-[#603202]/50" />
            </div>
            <h3 className="text-2xl font-bold text-[#603202] mb-4">No images found</h3>
            <p className="text-[#603202]/70 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-[#ef9343] to-[#603202] text-white px-6 py-3 rounded-xl hover:from-[#603202] hover:to-[#ef9343] transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredImages.map((image, index) => (
              <AnimatedText key={image._id} delay={index * 50} animation="fadeInUp">
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onClick={() => openModal(index)}
                    />
                  </div>

                  {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
  <div className="text-white space-y-3 w-full drop-shadow-lg">
    {/* Uncomment if you want to enable the title */}
    {/* <h3 className="font-semibold text-lg group-hover:translate-y-0 translate-y-4 transition-transform duration-300">
        {image.title}
    </h3> */}
    <p className="text-sm text-white/90 group-hover:translate-y-0 translate-y-4 transition-transform duration-400 line-clamp-2 leading-relaxed">
      {image.description}
    </p>
    <div className="flex items-center justify-between group-hover:translate-y-0 translate-y-4 transition-transform duration-500">
      {/* Uncomment if you want sectors & templates */}
      {/* <div className="flex items-center space-x-2">
        <span className="text-xs bg-[#ef9343]/90 px-2 py-1 rounded-full">{image.sector}</span>
        <span className="text-xs bg-[#603202]/90 px-2 py-1 rounded-full">{image.template}</span>
      </div> */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          openModal(index);
        }}
        className="p-2 bg-white/25 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors shadow-md"
        aria-label="View details"
      >
        <Eye className="w-5 h-5 text-white" />
      </button>
    </div>
  </div>
</div>


                  {/* Info Panel */}
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-[#603202] group-hover:text-[#ef9343] transition-colors duration-300">
                      {image.title}
                    </h3>
                    <p className="text-sm text-[#603202]/70 line-clamp-2">{image.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 text-[#603202]/50" />
                        <span className="text-[#603202]/50">{new Date(image.createdAt).toLocaleDateString()}</span>
                      </div>
                      {image.tags.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Tag className="w-3 h-3 text-[#603202]/50" />
                          <span className="text-[#603202]/50">{image.tags.length} tags</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedText>
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(groupedImages).map(([sector, sectorImages]) => (
              <div key={sector}>
                <AnimatedText>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-[#603202] flex items-center">
                      <span className="bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
                        {sector}
                      </span>
                      <span className="ml-4 text-sm text-[#603202]/50 bg-[#ef9343]/20 px-3 py-1 rounded-full">
                        {sectorImages.length} {sectorImages.length === 1 ? "image" : "images"}
                      </span>
                    </h2>
                  </div>
                </AnimatedText>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {sectorImages.map((image, index) => (
                    <AnimatedText key={image._id} delay={index * 50} animation="fadeInUp">
                      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                        <div className="aspect-square overflow-hidden">
                          <Image
                            src={image.imageUrl || "/placeholder.svg"}
                            alt={image.title}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onClick={() => openModal(filteredImages.findIndex((img) => img._id === image._id))}
                          />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                          <div className="text-white space-y-2 w-full">
                            <h4 className="font-bold group-hover:translate-y-0 translate-y-4 transition-transform duration-300">
                              {image.title}
                            </h4>
                            <p className="text-sm text-white/80 group-hover:translate-y-0 translate-y-4 transition-transform duration-400 line-clamp-2">
                              {image.description}
                            </p>
                            <div className="flex items-center justify-between group-hover:translate-y-0 translate-y-4 transition-transform duration-500">
                              <span className="text-xs bg-[#603202]/80 px-2 py-1 rounded-full">{image.template}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openModal(filteredImages.findIndex((img) => img._id === image._id))
                                }}
                                 className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Info Panel */}
                        <div className="p-4 space-y-3">
                          <h4 className="font-bold text-[#603202] group-hover:text-[#ef9343] transition-colors duration-300">
                            {image.title}
                          </h4>
                          <p className="text-sm text-[#603202]/70 line-clamp-2">{image.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-3 h-3 text-[#603202]/50" />
                              <span className="text-[#603202]/50">
                                {new Date(image.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            {image.tags.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <Tag className="w-3 h-3 text-[#603202]/50" />
                                <span className="text-[#603202]/50">{image.tags.length} tags</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </AnimatedText>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        <ImageModal
          isOpen={modalOpen}
          onClose={closeModal}
          currentImage={currentModalImage}
          onNext={goToNextImage}
          onPrev={goToPrevImage}
          totalImages={filteredImages.length}
          currentIndex={currentImageIndex}
        />
      </div>
    </div>
  )
}
