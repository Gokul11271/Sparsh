"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Phone } from "lucide-react"
import { LiquidButton } from "./liquid-button"
import Image from "next/image"

const collectionsMenu = [
  { name: "Bridal Collection", href: "/gallery" },
  { name: "Traditional Wear", href: "/gallery" },
  { name: "Designer Sarees", href: "/gallery" },
  { name: "Custom Outfits", href: "/gallery" },
]

const servicesMenu = [
  { name: "Personal Styling", href: "#services" },
  { name: "Custom Tailoring", href: "#services" },
  { name: "Bridal Consultation", href: "#services" },
  { name: "Wardrobe Planning", href: "#services" },
  { name: "Alteration Services", href: "#services" },
  { name: "Fashion Consultation", href: "#services" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContact = () => {
    setIsMenuOpen(false)
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#f7faf8]/95 backdrop-blur-md shadow-md border-b border-[#ef9343]/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/newlogo.png"
                alt="Sparsh Logo"
                width={100}
                height={77}
                className="rounded-full hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 font-medium text-[#603202]">
              <Link href="#home" className="hover:text-[#ef9343] transition-colors">Home</Link>
              <Link href="#about" className="hover:text-[#ef9343] transition-colors">About</Link>

              {/* Collections Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("collections")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 hover:text-[#ef9343] transition-colors">
                  Collections
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                {activeDropdown === "collections" && (
                  <div className="absolute top-full mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden">
                    {collectionsMenu.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="block px-4 py-2 hover:bg-orange-50 text-[#603202] hover:text-[#ef9343] transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("services")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 hover:text-[#ef9343] transition-colors">
                  Services
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                {activeDropdown === "services" && (
                  <div className="absolute top-full mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden">
                    {servicesMenu.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="block px-4 py-2 hover:bg-orange-50 text-[#603202] hover:text-[#ef9343] transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="#contact" className="hover:text-[#ef9343] transition-colors">Contact</Link>
              <Link href="/admin/login" className="hover:text-[#ef9343] transition-colors">Admin Login</Link>
              <Link href="/gallery" className="hover:text-[#ef9343] transition-colors">Gallery</Link>
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden xl:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-[#603202]">
                <Phone className="w-4 h-4 text-[#ef9343]" />
                <span className="font-medium">+91 99940 56184</span>
              </div>
              <LiquidButton size="md" onClick={scrollToContact}>
                Book Consultation
              </LiquidButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#603202] hover:text-[#ef9343] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-amber-900/80 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Side Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-xs bg-white shadow-xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-amber-900/10 hover:bg-amber-900/20"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-amber-900" />
          </button>

          <div className="flex flex-col h-full px-6 py-8 space-y-6">
            {/* Main Links */}
            <nav className="space-y-4">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" },
                 { name: "Admin Login", href: "/admin/login" },
                 { name: "Gallery", href: "/gallery" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium text-amber-900 hover:text-orange-500 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Collections */}
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Collections</h3>
              <div className="space-y-2">
                {collectionsMenu.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-amber-900 hover:text-orange-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Services</h3>
              <div className="space-y-2">
                {servicesMenu.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-amber-900 hover:text-orange-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-6">
              <LiquidButton size="lg" className="w-full" onClick={scrollToContact}>
                Book Consultation
              </LiquidButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
