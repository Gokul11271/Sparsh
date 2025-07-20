"use client"

import Image from "next/image"
import { useRef, useEffect } from "react"

interface GallerySliderProps {
  images: { src: string; alt: string; title: string }[]
  translateX: number
  onImageClick: (index: number) => void
}

export function GallerySlider({ images, translateX, onImageClick }: GallerySliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)

  // Apply the translateX directly for smooth animation controlled by parent
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${translateX}px)`
    }
  }, [translateX])

  return (
    <div
      ref={sliderRef}
      className="flex h-full transition-transform duration-100 ease-out will-change-transform"
      style={{ transform: `translateX(${translateX}px)` }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-[300px] h-[400px] lg:w-[400px] lg:h-[500px] relative mx-4 rounded-xl overflow-hidden shadow-2xl cursor-pointer group transition-all duration-500 ease-out image-glow"
          onClick={() => onImageClick(index)}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <div className="text-white space-y-1">
              <h3 className="text-xl font-bold group-hover:translate-y-0 translate-y-4 transition-transform duration-300">
                {image.title}
              </h3>
              <p className="text-sm text-white/80 group-hover:translate-y-0 translate-y-4 transition-transform duration-400">
                {image.alt}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
