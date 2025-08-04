"use client"

import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react" // Added useLayoutEffect
import { GallerySlider } from "./gallery-slider"
import { ImageModal } from "./image-modal"
import { Badge } from "@/components/ui/badge"
import { AnimatedText } from "../animated-text"

const galleryImages = [
  {
    src: "/placeholder.svg?height=600&width=400&text=Bridal+Couture+1",
    alt: "Exquisite Bridal Lehenga",
    title: "Bridal Couture",
  },
  {
    src: "/placeholder.svg?height=600&width=400&text=Evening+Gown+2",
    alt: "Elegant Evening Gown",
    title: "Evening Elegance",
  },
  {
    src: "/placeholder.svg?height=600&width=400&text=Traditional+Saree+3",
    alt: "Handcrafted Traditional Saree",
    title: "Traditional Heritage",
  },
  {
    src: "/placeholder.svg?height=600&width=400&text=Modern+Suit+4",
    alt: "Contemporary Business Suit",
    title: "Modern Professional",
  },
  {
    src: "/placeholder.svg?height=600&width=400&text=Casual+Chic+5",
    alt: "Chic Casual Outfit",
    title: "Casual Luxury",
  },
  {
    src: "/placeholder.svg?height=600&width=400&text=Festive+Wear+6",
    alt: "Vibrant Festive Attire",
    title: "Festive Collection",
  },
  {
    src: "/placeholder.svg?height=600&width=400&text=Bespoke+Design+7",
    alt: "Unique Bespoke Creation",
    title: "Custom Creations",
  },
]

// Triple the array for seamless looping
const loopedImages = [...galleryImages, ...galleryImages, ...galleryImages]

export function InfiniteGallery() {
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Initialize scroll position to the middle set using useLayoutEffect
  useLayoutEffect(() => {
    const currentSlider = sliderContainerRef.current
    if (currentSlider) {
      currentSlider.scrollLeft = currentSlider.scrollWidth / 3
    }
  }, []) // Run once after initial render

  // Mouse wheel navigation on the slider
  useEffect(() => {
    const currentSlider = sliderContainerRef.current

    const handleWheel = (event: WheelEvent) => {
      if (currentSlider) {
        event.preventDefault() // Prevent page scroll
        const scrollAmount = event.deltaY * 2 // Adjust sensitivity

        currentSlider.scrollLeft += scrollAmount

        // Implement infinite loop logic for scrollLeft
        const singleSetWidth = currentSlider.scrollWidth / 3
        const currentScrollLeft = currentSlider.scrollLeft

        // Check if we've scrolled past the first or second set
        if (currentScrollLeft >= singleSetWidth * 2) {
          currentSlider.scrollLeft -= singleSetWidth // Jump back to the middle set
        } else if (currentScrollLeft <= 0) {
          currentSlider.scrollLeft += singleSetWidth // Jump forward to the middle set
        }
      }
    }

    if (currentSlider) {
      currentSlider.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (currentSlider) {
        currentSlider.removeEventListener("wheel", handleWheel)
      }
    }
  }, []) // No dependencies needed as currentSlider is stable

  // Dynamic gradient following mouse
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const openModal = useCallback((index: number) => {
    setCurrentImageIndex(index % galleryImages.length) // Use original index for modal
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
  }, [])

  const goToPrevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length)
  }, [])

  const currentModalImage = galleryImages[currentImageIndex]

  return (
    <section
      id="gallery"
      className="relative w-full h-screen bg-[#1a1a1a] overflow-hidden flex flex-col items-center justify-center py-20"
    >
      {/* Dynamic Gradient Background */}
      <div
        className="absolute inset-0 transition-all duration-100 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 147, 67, 0.2) 0%, rgba(96, 50, 2, 0.1) 30%, rgba(26, 26, 26, 1) 70%)`,
        }}
      ></div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/10 blur-sm animate-float"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
            opacity: `${0.2 + Math.random() * 0.6}`,
          }}
        ></div>
      ))}

      {/* Gallery Header */}
      <div className="relative z-10 text-center space-y-6 mb-16">
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

      {/* Gallery Slider Container */}
      <div
        ref={sliderContainerRef}
        className="relative w-full h-[500px] lg:h-[600px] flex items-center overflow-x-scroll scrollbar-hide px-4"
        style={{ scrollBehavior: "smooth" }} // Enable smooth scrolling for internal scrollLeft
      >
        <GallerySlider images={loopedImages} onImageClick={openModal} />
      </div>

      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        currentImage={currentModalImage}
        onNext={goToNextImage}
        onPrev={goToPrevImage}
        totalImages={galleryImages.length}
        currentIndex={currentImageIndex}
      />
    </section>
  )
}
