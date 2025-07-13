"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowDown, Sparkles, Award, Users, Clock } from "lucide-react"
import Link from "next/link"
import { AnimatedText } from "./animated-text"
import { LiquidButton } from "./liquid-button"

export function HeroSection() {
  const [currentYear] = useState(new Date().getFullYear())
  const yearsOfExperience = currentYear - 2003

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-[#f7faf8]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#ef9343]/20 to-[#603202]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-[#603202]/15 to-[#ef9343]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-[#ef9343]/25 to-[#603202]/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          {/* Left Content */}
          <div className="space-y-10 text-center lg:text-left">
            <AnimatedText delay={200} animation="liquidReveal">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#ef9343]/20 to-[#603202]/20 backdrop-blur-sm px-6 py-3 rounded-full border border-[#ef9343]/30">
                <Sparkles className="w-5 h-5 text-[#ef9343] animate-spin" />
                <span className="text-[#603202] font-semibold tracking-wide">Premium Luxury Boutique</span>
              </div>
            </AnimatedText>

            {/* Animated Title */}
            <AnimatedText delay={400} animation="slideInScale">
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight">
                  <span className="inline-block bg-gradient-to-r from-[#603202] via-[#ef9343] to-[#603202] bg-clip-text text-transparent animate-pulse">
                    SPARSH
                  </span>
                </h1>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#603202] tracking-[0.3em]">
                  DESIGN
                </div>
              </div>
            </AnimatedText>

            <AnimatedText delay={600} animation="fadeInUp">
              <p className="text-xl lg:text-2xl text-[#603202]/80 leading-relaxed max-w-2xl font-light">
                Where timeless elegance meets contemporary sophistication. Crafting bespoke fashion experiences that
                celebrate your unique style and personality since 2003.
              </p>
            </AnimatedText>

            <AnimatedText delay={800} animation="fadeInUp">
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <LiquidButton size="lg" className="group">
                  <span className="flex items-center space-x-2">
                    <span>Explore Collections</span>
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </LiquidButton>
                <LiquidButton variant="outline" size="lg">
                  Book Consultation
                </LiquidButton>
              </div>
            </AnimatedText>

            {/* Stats */}
            <AnimatedText delay={1000} animation="fadeInUp">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#603202]">{yearsOfExperience}+</div>
                  <div className="text-sm text-[#603202]/70 font-medium">Years Experience</div>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#603202] to-[#ef9343] rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#603202]">2K+</div>
                  <div className="text-sm text-[#603202]/70 font-medium">Happy Clients</div>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#603202]">99%</div>
                  <div className="text-sm text-[#603202]/70 font-medium">Satisfaction</div>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#603202] to-[#ef9343] rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#603202]">Premium</div>
                  <div className="text-sm text-[#603202]/70 font-medium">Quality</div>
                </div>
              </div>
            </AnimatedText>
          </div>

          {/* Right Content - Hero Image */}
          <AnimatedText delay={600} animation="fadeInRight">
            <div className="relative">
              <div className="relative z-10 group">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="SPARSH DESIGN Premium Collection"
                  width={600}
                  height={800}
                  className="rounded-3xl shadow-2xl object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">Since</div>
                    <div className="text-xl font-light">2003</div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-8 w-40 h-28 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl flex items-center justify-center border border-[#ef9343]/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#603202]">Premium</div>
                    <div className="text-sm text-[#603202]/70 font-medium">Luxury Fashion</div>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ef9343]/30 to-[#603202]/30 rounded-3xl transform rotate-6 scale-105 -z-10 blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#603202]/20 to-[#ef9343]/20 rounded-3xl transform -rotate-3 scale-110 -z-20 blur-md"></div>
            </div>
          </AnimatedText>
        </div>

        {/* Scroll Down Indicator */}
        <AnimatedText delay={1200} animation="fadeInUp">
          <div className="flex justify-center mt-16">
            <Link
              href="#about"
              className="flex flex-col items-center space-y-3 text-[#603202] hover:text-[#ef9343] transition-all duration-500 group"
            >
              <span className="text-sm font-medium tracking-wide">Discover Our Story</span>
              <div className="w-8 h-12 border-2 border-[#603202] rounded-full flex justify-center group-hover:border-[#ef9343] transition-colors duration-300">
                <ArrowDown className="w-4 h-4 mt-2 animate-bounce group-hover:text-[#ef9343]" />
              </div>
            </Link>
          </div>
        </AnimatedText>
      </div>
    </section>
  )
}
