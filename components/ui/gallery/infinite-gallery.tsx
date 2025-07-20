"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { GallerySlider } from "./gallery-slider"
import { ImageModal } from "./image-modal"

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
  const galleryRef = useRef<HTMLDivElement>(null)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const imageWidth = 300 + 16 * 2 // Image width + horizontal margins (mx-4 = 16px each side)
  const totalSliderWidth = loopedImages.length * imageWidth

  // Calculate initial offset to start in the middle section
  const initialOffset = galleryImages.length * imageWidth

  // Sync page scroll with horizontal slider movement
  useEffect(() => {
    const handleScroll = () => {
      if (sliderContainerRef.current) {
        const scrollY = window.scrollY
        const maxScrollY = document.body.scrollHeight - window.innerHeight
        const scrollProgress = maxScrollY > 0 ? scrollY / maxScrollY : 0

        // Map page scroll progress to slider movement
        // We want to scroll through one full set of original images
        const scrollableSliderWidth = galleryImages.length * imageWidth
        const newTranslateX = -(scrollProgress * scrollableSliderWidth) - initialOffset

        setTranslateX(newTranslateX)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [imageWidth, initialOffset])

  // Mouse wheel navigation on the slider
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (sliderContainerRef.current) {
        event.preventDefault() // Prevent page scroll
        const scrollAmount = event.deltaY * 2 // Adjust sensitivity

        setTranslateX((prev) => {
          let newX = prev - scrollAmount
          // Implement infinite loop logic for mouse wheel
          const middleSectionStart = -initialOffset
          const middleSectionEnd = -(initialOffset + galleryImages.length * imageWidth)

          if (newX > middleSectionStart) {
            newX -= galleryImages.length * imageWidth
          } else if (newX < middleSectionEnd) {
            newX += galleryImages.length * imageWidth
          }
          return newX
        })
      }
    }

    const currentSlider = sliderContainerRef.current
    if (currentSlider) {
      currentSlider.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (currentSlider) {
        currentSlider.removeEventListener("wheel", handleWheel)
      }
    }
  }, [imageWidth, initialOffset])

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
      className="relative w-full h-screen bg-[#1a1a1a] overflow-hidden flex items-center justify-center"
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

      {/* Fixed Gallery Container */}
      <div ref={galleryRef} className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden">
        <div
          ref={sliderContainerRef}
          className="relative w-full h-[500px] lg:h-[600px] flex items-center overflow-hidden"
        >
          <GallerySlider images={loopedImages} translateX={translateX} onImageClick={openModal} />
        </div>
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
