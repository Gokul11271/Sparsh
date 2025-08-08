"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import { AnimatedText } from "./animated-text"
import { LiquidButton } from "./liquid-button"

// 👇 Import images statically (they're inside components/gallery/image/)
import img1 from "@/components/image/g2.jpg"
import img2 from "@/components/image/green.jpg"
import img3 from "@/components/image/fullblue.jpg"
import img4 from "@/components/image/pur22prem.jpg"
import img5 from "@/components/image/purple.jpg"
import img6 from "@/components/image/red.jpg"


const imageSources = [img1, img2, img3, img4, img5, img6]

const collections = imageSources.map((image, index) => ({
  name: `Collection ${index + 1}`,
  description: "Exquisite handcrafted designs for elegant occasions",
  image: image,
  price: `Starting ₹${(index + 1) * 5000}`,
  rating: 5,
  featured: index % 2 === 0,
}))

export function CollectionsSection() {
  return (
    <section id="collections" className="py-20 bg-[#f7faf8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <AnimatedText>
            <Badge className="w-fit mx-auto bg-[#ef9343]/20 text-[#603202] hover:bg-[#ef9343]/30 border-[#ef9343]/30">
              Our Collections
            </Badge>
          </AnimatedText>

          <AnimatedText delay={200}>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#603202]">
              Curated with
              <span className="block bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
                Passion & Precision
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={400}>
            <p className="text-xl text-[#603202]/80 max-w-3xl mx-auto leading-relaxed">
              Each piece in our collection represents the perfect harmony of traditional craftsmanship and contemporary design, created to make you feel extraordinary on every occasion.
            </p>
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <AnimatedText key={index} delay={index * 100} animation="fadeInUp">
              <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 overflow-hidden bg-white">
                <div className="relative overflow-hidden">
                  {collection.featured && (
                    <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#ef9343] to-[#603202] text-white">
                      Featured
                    </Badge>
                  )}
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    width={300}
                    height={400}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#603202]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <LiquidButton variant="secondary" size="sm">
                      View Details
                    </LiquidButton>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#603202] group-hover:text-[#ef9343] transition-colors duration-300">
                      {collection.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(collection.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#ef9343] fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-[#603202]/70 leading-relaxed">{collection.description}</p>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-lg font-bold text-[#ef9343]">{collection.price}</span>
                    <button className="flex items-center space-x-2 text-[#603202] hover:text-[#ef9343] transition-colors duration-300 group/btn">
                      <span className="font-medium">Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          ))}
        </div>

        <AnimatedText delay={800}>
          <div className="text-center mt-16">
            <LiquidButton size="lg">
              <span className="flex items-center space-x-2">
                <span>View All Collections</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </LiquidButton>
          </div>
        </AnimatedText>
      </div>
    </section>
  )
}
