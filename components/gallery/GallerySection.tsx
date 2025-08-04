"use client"

import { useState, useEffect } from "react"
import { galleryAPI } from "@/lib/api"
import socketManager from "@/lib/socket"
import { Badge } from "@/components/ui/badge"
import { AnimatedText } from "../animated-text"
import { Filter, Grid, List } from "lucide-react"

interface Image {
  _id: string
  title: string
  description: string
  imageUrl: string
  sector: string
  template: string
  tags: string[]
  createdAt: string
}

export default function GallerySection() {
  const [images, setImages] = useState<Image[]>([])
  const [groupedImages, setGroupedImages] = useState<Record<string, Image[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedSector, setSelectedSector] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "grouped">("grouped")
  const [sectors, setSectors] = useState<string[]>([])
  const [templates, setTemplates] = useState<string[]>([])

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
    fetchImages()
  }, [selectedSector, selectedTemplate])

  const setupSocketListeners = () => {
    const socket = socketManager.connect()

    socketManager.onImageUploaded((data) => {
      if (data.image.isActive) {
        setImages((prev) => [data.image, ...prev])
        updateGroupedImages([data.image, ...images])
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
      const params: any = {}
      if (selectedSector) params.sector = selectedSector
      if (selectedTemplate) params.template = selectedTemplate

      const response = await galleryAPI.getImages(params)
      setImages(response.data.images)
      setGroupedImages(response.data.groupedBySector)
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

  const updateGroupedImages = (imageList: Image[]) => {
    const grouped = imageList.reduce(
      (acc, image) => {
        if (!acc[image.sector]) {
          acc[image.sector] = []
        }
        acc[image.sector].push(image)
        return acc
      },
      {} as Record<string, Image[]>,
    )
    setGroupedImages(grouped)
  }

  const clearFilters = () => {
    setSelectedSector("")
    setSelectedTemplate("")
  }

  if (loading) {
    return (
      <section className="py-20 bg-[#1a1a1a] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ef9343]/30 border-t-[#ef9343] rounded-full animate-spin" />
      </section>
    )
  }

  return (
    <section id="gallery" className="py-20 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#ef9343]/20 to-[#603202]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-[#603202]/15 to-[#ef9343]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-[#ef9343]/25 to-[#603202]/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/10 blur-sm animate-float"
          style={{
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
            opacity: `${0.3 + Math.random() * 0.5}`,
          }}
        ></div>
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <AnimatedText>
            <Badge className="w-fit mx-auto bg-[#ef9343]/20 text-[#ef9343] hover:bg-[#ef9343]/30 border-[#ef9343]/30">
              Our Gallery
            </Badge>
          </AnimatedText>

          <AnimatedText delay={200}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              A Glimpse Into Our
              <span className="block bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
                Exquisite Creations
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={400}>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Explore our curated collection of bespoke designs, where every piece tells a story of craftsmanship,
              elegance, and passion.
            </p>
          </AnimatedText>
        </div>

        {/* Filters and View Toggle */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
              >
                <option value="">All Sectors</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector} className="text-black">
                    {sector}
                  </option>
                ))}
              </select>

              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-[#ef9343] focus:border-transparent"
              >
                <option value="">All Templates</option>
                {templates.map((template) => (
                  <option key={template} value={template} className="text-black">
                    {template}
                  </option>
                ))}
              </select>

              {(selectedSector || selectedTemplate) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-[#ef9343]/20 text-[#ef9343] rounded-lg hover:bg-[#ef9343]/30 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-[#ef9343] text-white" : "bg-white/20 text-white/70 hover:text-white"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grouped")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grouped" ? "bg-[#ef9343] text-white" : "bg-white/20 text-white/70 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Content */}
        {images.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-white/50" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No images found</h3>
            <p className="text-white/70">Try adjusting your filters or check back later for new uploads</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <AnimatedText key={image._id} delay={index * 50} animation="fadeInUp">
                <div className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#ef9343]/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <div className="text-white space-y-1">
                      <h3 className="font-bold text-lg group-hover:translate-y-0 translate-y-4 transition-transform duration-300">
                        {image.title}
                      </h3>
                      <p className="text-sm text-white/80 group-hover:translate-y-0 translate-y-4 transition-transform duration-400">
                        {image.description}
                      </p>
                      <div className="flex items-center space-x-2 group-hover:translate-y-0 translate-y-4 transition-transform duration-500">
                        <span className="text-xs bg-[#ef9343]/80 px-2 py-1 rounded-full">{image.sector}</span>
                        <span className="text-xs bg-[#603202]/80 px-2 py-1 rounded-full">{image.template}</span>
                      </div>
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
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <span className="bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
                      {sector}
                    </span>
                    <span className="ml-3 text-sm text-white/50 bg-white/10 px-3 py-1 rounded-full">
                      {sectorImages.length} {sectorImages.length === 1 ? "image" : "images"}
                    </span>
                  </h3>
                </AnimatedText>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sectorImages.map((image, index) => (
                    <AnimatedText key={image._id} delay={index * 50} animation="fadeInUp">
                      <div className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#ef9343]/50 transition-all duration-500 hover:-translate-y-2">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={image.imageUrl || "/placeholder.svg"}
                            alt={image.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                          <div className="text-white space-y-1">
                            <h4 className="font-bold group-hover:translate-y-0 translate-y-4 transition-transform duration-300">
                              {image.title}
                            </h4>
                            <p className="text-sm text-white/80 group-hover:translate-y-0 translate-y-4 transition-transform duration-400">
                              {image.description}
                            </p>
                            <span className="text-xs bg-[#603202]/80 px-2 py-1 rounded-full group-hover:translate-y-0 translate-y-4 transition-transform duration-500">
                              {image.template}
                            </span>
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
      </div>
    </section>
  )
}
