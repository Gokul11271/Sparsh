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
      <GallerySection />
      <Footer />
    </div>
  )
}
