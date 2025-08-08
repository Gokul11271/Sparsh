import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import GalleryPageContent from "@/components/gallery/GalleryPageContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery - SPARSH DESIGN | Luxury Fashion Collection",
  description:
    "Explore our exquisite collection of luxury fashion designs, bridal wear, traditional outfits, and bespoke creations at SPARSH DESIGN.",
  keywords: "luxury fashion gallery, bridal wear, traditional outfits, designer collection, SPARSH DESIGN",
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#f7faf8]">
      <Header />
      <GalleryPageContent />
      <Footer />
    </div>
  )
}
