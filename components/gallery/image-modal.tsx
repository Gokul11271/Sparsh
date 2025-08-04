"use client"

import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog" // Assuming shadcn Dialog

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  currentImage: { src: string; alt: string; title: string } | null
  onNext: () => void
  onPrev: () => void
  totalImages: number
  currentIndex: number
}

export function ImageModal({
  isOpen,
  onClose,
  currentImage,
  onNext,
  onPrev,
  totalImages,
  currentIndex,
}: ImageModalProps) {
  if (!currentImage) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl border-none rounded-none max-w-full max-h-full w-screen h-screen">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors duration-300"
          aria-label="Close image"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative flex items-center justify-center w-full h-full">
          <button
            onClick={onPrev}
            className="absolute left-4 lg:left-8 z-40 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center">
            <Image
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.alt}
              fill
              className="object-contain rounded-lg shadow-2xl border border-white/10"
              priority
            />
          </div>

          <button
            onClick={onNext}
            className="absolute right-4 lg:right-8 z-40 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors duration-300"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-center bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
          <h3 className="text-xl font-semibold">{currentImage.title}</h3>
          <p className="text-sm text-white/80">{currentImage.alt}</p>
          <p className="text-xs text-white/60 mt-1">
            {currentIndex + 1} / {totalImages}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
