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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-[#f7faf8]/95 backdrop-blur-md shadow-lg border-b border-[#ef9343]/20" : "bg-transparent"
        }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#603202]">SPARSH</span>
                <span className="text-xs text-[#603202]/70 tracking-[0.2em]">DESIGN</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="#home" className="hover:text-[#ef9343] text-[#603202]">Home</Link>
              <Link href="#about" className="hover:text-[#ef9343] text-[#603202]">About</Link>

              <div className="group relative">
                <button className="flex items-center hover:text-[#ef9343] text-[#603202]">
                  Collections <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <div className="hidden group-hover:block absolute bg-white mt-2 shadow-lg rounded-lg p-2 w-48">
                  {collectionsMenu.map((item) => (
                    <Link key={item.name} href={item.href} className="block px-4 py-2 hover:bg-[#ef9343]/10">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="group relative">
                <button className="flex items-center hover:text-[#ef9343] text-[#603202]">
                  Services <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <div className="hidden group-hover:block absolute bg-white mt-2 shadow-lg rounded-lg p-2 w-48">
                  {servicesMenu.map((item) => (
                    <Link key={item.name} href={item.href} className="block px-4 py-2 hover:bg-[#ef9343]/10">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="#contact" className="hover:text-[#ef9343] text-[#603202]">Contact</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#603202]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#f7faf8] shadow-2xl z-50 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col p-6 pt-20 gap-5">
          <Link href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#603202] hover:text-[#ef9343]">Home</Link>
          <Link href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#603202] hover:text-[#ef9343]">About</Link>

          <div>
            <h4 className="text-[#603202] mb-2 font-semibold">Collections</h4>
            <div className="flex flex-col gap-2 pl-4">
              {collectionsMenu.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-[#603202]/80 hover:text-[#ef9343]">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#603202] mb-2 font-semibold">Services</h4>
            <div className="flex flex-col gap-2 pl-4">
              {servicesMenu.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-[#603202]/80 hover:text-[#ef9343]">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="#contact" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#603202] hover:text-[#ef9343]">Contact</Link>

          <div className="pt-4">
            <LiquidButton size="lg" className="w-full">Book Consultation</LiquidButton>
          </div>
        </div>
      </div>
    </>
  )
}
