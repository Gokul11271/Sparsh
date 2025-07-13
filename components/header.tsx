"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Phone } from "lucide-react"
import { LiquidButton } from "./liquid-button"

const collectionsMenu = [
  { name: "Bridal Collection", href: "#bridal" },
  { name: "Party Wear", href: "#party" },
  { name: "Casual Elegance", href: "#casual" },
  { name: "Traditional Wear", href: "#traditional" },
  { name: "Designer Sarees", href: "#sarees" },
  { name: "Custom Outfits", href: "#custom" },
]

const servicesMenu = [
  { name: "Personal Styling", href: "#styling" },
  { name: "Custom Tailoring", href: "#tailoring" },
  { name: "Bridal Consultation", href: "#bridal-service" },
  { name: "Wardrobe Planning", href: "#wardrobe" },
  { name: "Alteration Services", href: "#alterations" },
  { name: "Fashion Consultation", href: "#consultation" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-[#f7faf8]/95 backdrop-blur-md shadow-lg border-b border-[#ef9343]/20" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-[#603202] tracking-tight group-hover:text-[#ef9343] transition-colors duration-300">
                  SPARSH
                </span>
                <span className="text-xs text-[#603202]/70 -mt-1 tracking-[0.2em] font-medium">DESIGN</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="#home"
                className="text-[#603202] hover:text-[#ef9343] transition-all duration-300 font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ef9343] group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                href="#about"
                className="text-[#603202] hover:text-[#ef9343] transition-all duration-300 font-medium relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ef9343] group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Collections Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("collections")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-[#603202] hover:text-[#ef9343] transition-all duration-300 font-medium">
                  <span>Collections</span>
                  <ChevronDown className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" />
                </button>

                {activeDropdown === "collections" && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#f7faf8] rounded-xl shadow-2xl border border-[#ef9343]/20 py-2 animate-in slide-in-from-top-2 duration-200">
                    {collectionsMenu.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 text-[#603202] hover:text-[#ef9343] hover:bg-[#ef9343]/10 transition-all duration-200 font-medium"
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
                <button className="flex items-center space-x-1 text-[#603202] hover:text-[#ef9343] transition-all duration-300 font-medium">
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" />
                </button>

                {activeDropdown === "services" && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#f7faf8] rounded-xl shadow-2xl border border-[#ef9343]/20 py-2 animate-in slide-in-from-top-2 duration-200">
                    {servicesMenu.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 text-[#603202] hover:text-[#ef9343] hover:bg-[#ef9343]/10 transition-all duration-200 font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="#contact"
                className="text-[#603202] hover:text-[#ef9343] transition-all duration-300 font-medium relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ef9343] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden xl:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-[#603202]">
                <Phone className="w-4 h-4 text-[#ef9343]" />
                <span className="font-medium">098657 66573</span>
              </div>
              <LiquidButton size="md">Book Consultation</LiquidButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#603202] hover:text-[#ef9343] transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-[#603202]/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-[#f7faf8] shadow-2xl transform transition-transform duration-300">
            <div className="flex flex-col p-6 space-y-6 mt-20">
              <Link
                href="#home"
                className="text-xl text-[#603202] hover:text-[#ef9343] transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-xl text-[#603202] hover:text-[#ef9343] transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#603202]">Collections</h3>
                {collectionsMenu.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block text-[#603202]/80 hover:text-[#ef9343] transition-colors duration-200 pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#603202]">Services</h3>
                {servicesMenu.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block text-[#603202]/80 hover:text-[#ef9343] transition-colors duration-200 pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link
                href="#contact"
                className="text-xl text-[#603202] hover:text-[#ef9343] transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-6">
                <LiquidButton size="lg" className="w-full">
                  Book Consultation
                </LiquidButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
