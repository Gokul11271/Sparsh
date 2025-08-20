"use client"
import { useEffect } from "react"
import axios from "axios"

import { SmoothScroll } from "@/components/smooth-scroll"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { CollectionsSection } from "@/components/collections-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import GallerySection from "@/components/gallery/GallerySection"

export default function LandingPage() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/visitors/track`, {
          sessionId: crypto.randomUUID(),
          page: window.location.pathname,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          isFirstVisit: !localStorage.getItem("visited"),
        })

        // Save flag so next time it's not first visit
        localStorage.setItem("visited", "true")
      } catch (error) {
        console.error("Error tracking visit:", error)
      }
    }

    trackVisit()
  }, [])

  return (
    <div className="min-h-screen bg-[#f7faf8]">
      <SmoothScroll />
      <Header />
      <HeroSection />
      <AboutSection />
      <CollectionsSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
