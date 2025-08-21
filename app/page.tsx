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
import { useEffect } from "react"
import axios from "axios"

export default function LandingPage() {
useEffect(() => {
  axios.post("https://sparsh-backend-n1lf.onrender.com/api/analytics/track", {
    page: "LandingPage",
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    sessionId: crypto.randomUUID()
  })
  .then(res => console.log("Analytics tracked successfully:", res.data))
  .catch(err => console.error("Analytics tracking error:", err));
}, []);


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
