// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Menu, X, ChevronDown, Phone } from "lucide-react"
// import { LiquidButton } from "./liquid-button"

// const collectionsMenu = [
//   { name: "Bridal Collection", href: "#bridal" },
//   { name: "Party Wear", href: "#party" },
//   { name: "Casual Elegance", href: "#casual" },
//   { name: "Traditional Wear", href: "#traditional" },
//   { name: "Designer Sarees", href: "#sarees" },
//   { name: "Custom Outfits", href: "#custom" },
// ]

// const servicesMenu = [
//   { name: "Personal Styling", href: "#styling" },
//   { name: "Custom Tailoring", href: "#tailoring" },
//   { name: "Bridal Consultation", href: "#bridal-service" },
//   { name: "Wardrobe Planning", href: "#wardrobe" },
//   { name: "Alteration Services", href: "#alterations" },
//   { name: "Fashion Consultation", href: "#consultation" },
// ]

// export function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <>
//       <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
//           isScrolled ? "bg-[#f7faf8]/95 backdrop-blur-md shadow-lg border-b border-[#ef9343]/20" : "bg-transparent"
//         }`}>
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             {/* Logo */}
//             <Link href="/" className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">S</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-xl font-bold text-[#603202]">SPARSH</span>
//                 <span className="text-xs text-[#603202]/70 tracking-[0.2em]">DESIGN</span>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center space-x-8">
//               <Link href="#home" className="hover:text-[#ef9343] text-[#603202]">Home</Link>
//               <Link href="#about" className="hover:text-[#ef9343] text-[#603202]">About</Link>

//               <div className="group relative">
//                 <button className="flex items-center hover:text-[#ef9343] text-[#603202]">
//                   Collections <ChevronDown className="w-4 h-4 ml-1" />
//                 </button>
//                 <div className="hidden group-hover:block absolute bg-white mt-2 shadow-lg rounded-lg p-2 w-48">
//                   {collectionsMenu.map((item) => (
//                     <Link key={item.name} href={item.href} className="block px-4 py-2 hover:bg-[#ef9343]/10">
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               <div className="group relative">
//                 <button className="flex items-center hover:text-[#ef9343] text-[#603202]">
//                   Services <ChevronDown className="w-4 h-4 ml-1" />
//                 </button>
//                 <div className="hidden group-hover:block absolute bg-white mt-2 shadow-lg rounded-lg p-2 w-48">
//                   {servicesMenu.map((item) => (
//                     <Link key={item.name} href={item.href} className="block px-4 py-2 hover:bg-[#ef9343]/10">
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               <Link href="#contact" className="hover:text-[#ef9343] text-[#603202]">Contact</Link>
//             </nav>

//             {/* Mobile Menu Button */}
//             <button
//               className="lg:hidden p-2 text-[#603202]"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Slide-in Menu */}
//       <div className={`fixed top-0 right-0 h-full w-80 bg-[#f7faf8] shadow-2xl z-50 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
//         <div className="flex flex-col p-6 pt-20 gap-5">
//           <Link href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#603202] hover:text-[#ef9343]">Home</Link>
//           <Link href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#603202] hover:text-[#ef9343]">About</Link>

//           <div>
//             <h4 className="text-[#603202] mb-2 font-semibold">Collections</h4>
//             <div className="flex flex-col gap-2 pl-4">
//               {collectionsMenu.map((item) => (
//                 <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-[#603202]/80 hover:text-[#ef9343]">
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="text-[#603202] mb-2 font-semibold">Services</h4>
//             <div className="flex flex-col gap-2 pl-4">
//               {servicesMenu.map((item) => (
//                 <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-[#603202]/80 hover:text-[#ef9343]">
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <Link href="#contact" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#603202] hover:text-[#ef9343]">Contact</Link>

//           <div className="pt-4">
//             <LiquidButton size="lg" className="w-full">Book Consultation</LiquidButton>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
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
              {/* <div className="w-12 h-12 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">S</span>
              </div> */}
              <div className="flex flex-col group">
  <span className="text-4xl text-[#603202] tracking-tight font-playfair italic group-hover:text-[#ef9343] transition-colors duration-300">
    Sparsh
  </span>
  <span className="text-sm text-[#603202]/70 font-vibes italic mt-1">
    Designer
  </span>
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
     {/* Mobile Menu */}
{isMenuOpen && (
  <div className="fixed inset-0 z-50 lg:hidden">
    
    {/* Backdrop */}
    <div 
      className="absolute inset-0 bg-amber-900/80 backdrop-blur-sm transition-opacity duration-300"
      onClick={() => setIsMenuOpen(false)}
    />

    {/* Menu Panel */}
    <div className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-xs bg-white shadow-xl transition-transform duration-300 transform translate-x-0">
      
      {/* Close Button */}
      <button
        onClick={() => setIsMenuOpen(false)}
        className="absolute top-4 right-4 p-2 rounded-full bg-amber-900/10 hover:bg-amber-900/20 transition"
        aria-label="Close menu"
      >
        <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Menu Content */}
      <div className="flex flex-col h-full px-6 py-8 space-y-6">
        
        {/* Main Links */}
        <nav className="space-y-4">
          {[
            { name: 'Home', href: '#home' },
            { name: 'About', href: '#about' },
            { name: 'Contact', href: '#contact' }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-medium text-amber-900 hover:text-orange-500 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Collections */}
        <div>
          <h3 className="text-sm font-semibold text-amber-900 mb-2">Collections</h3>
          <div className="space-y-2">
            {collectionsMenu.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm text-amber-900/80 hover:text-orange-500 transition pl-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold text-amber-900 mb-2">Services</h3>
          <div className="space-y-2">
            {servicesMenu.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm text-amber-900/80 hover:text-orange-500 transition pl-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-6">
          <LiquidButton 
            size="lg" 
            className="w-full"
            onClick={() => setIsMenuOpen(false)}
          >
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
