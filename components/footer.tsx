'use client'

import { Sparkles, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const yearsOfExperience = currentYear - 2003

  return (
    <footer className="bg-[#603202] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/newlogo.png"
                alt="Sparsh Logo"
                width={100}
                height={77}
                className="rounded-full hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="text-3xl font-bold tracking-tight">DESIGN</span>
              </div>
            </Link>
            <p className="text-white/80 leading-relaxed">
              Where timeless elegance meets contemporary sophistication. Creating bespoke fashion experiences since
              2003.
            </p>
            <div className="text-sm text-white/70">
              <div className="font-semibold text-[#ef9343] mb-2">{yearsOfExperience}+ Years of Excellence</div>
              <div>2K+ Happy Clients • 99% Satisfaction</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-6 text-[#ef9343] text-lg">Quick Links</h3>
            <ul className="space-y-3 text-white/80">
              <li>
                <Link href="#home" className="hover:text-[#ef9343] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-[#ef9343] transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#collections" className="hover:text-[#ef9343] transition-colors duration-300">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#ef9343] transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#ef9343] transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-6 text-[#ef9343] text-lg">Our Services</h3>
            <ul className="space-y-3 text-white/80">
              <li>
                <Link href="#styling" className="hover:text-[#ef9343] transition-colors duration-300">
                  Personal Styling
                </Link>
              </li>
              <li>
                <Link href="#tailoring" className="hover:text-[#ef9343] transition-colors duration-300">
                  Bespoke Tailoring
                </Link>
              </li>
              <li>
                <Link href="#bridal-service" className="hover:text-[#ef9343] transition-colors duration-300">
                  Bridal Styling
                </Link>
              </li>
              <li>
                <Link href="#consultation" className="hover:text-[#ef9343] transition-colors duration-300">
                  Fashion Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-6 text-[#ef9343] text-lg">Contact Info</h3>
            <ul className="space-y-4 text-white/80">
              {/* Map link */}
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#ef9343] mt-1 flex-shrink-0" />
                <Link
                  href="https://www.google.co.in/maps/dir/Coimbatore,+Tamil+Nadu/135+A,+Avinashi+Rd,+above+ICICI+ATM,+Peelamedu,+Sri+Nagar,+Hope+College,+Coimbatore,+Tamil+Nadu+641004/@11.0118875,76.9477892,13z/data=!3m2!4b1!5s0x3ba8578572542575:0x64d1c1d491f9fa50!4m14!4m13!1m5!1m1!1s0x3ba859af2f971cb5:0x2fc1c81e183ed282!2m2!1d76.9588876!2d10.9973691!1m5!1m1!1s0x3ba8578574c70215:0x82ba9fdcdf0806d7!2m2!1d77.0193824!2d11.0259674!3e0?hl=en-in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-relaxed hover:text-[#ef9343]"
                >
                  <div>135 A, Above ICICI ATM</div>
                  <div>Hope College, Avinashi Rd</div>
                  <div>Coimbatore, Tamil Nadu 641004</div>
                </Link>
              </li>

              {/* Phone link */}
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#ef9343]" />
                <a href="tel:+919865766573" className="text-sm font-medium hover:text-[#ef9343]">
                  098657 66573
                </a>
              </li>

              {/* Email link */}
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#ef9343]" />
                <a href="mailto:hello@sparshdesign.com" className="text-sm hover:text-[#ef9343]">
                  hello@sparshdesign.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/70">
          <p className="text-sm">
            &copy; {currentYear} SPARSH DESIGN. All rights reserved. | Crafted with ❤️ for fashion connoisseurs.
          </p>
        </div>
      </div>
    </footer>
  )
}
