import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scissors, Crown, Users, Award, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import { AnimatedText } from "./animated-text"
import { LiquidButton } from "./liquid-button"

const features = [
  {
    icon: Crown,
    title: "Premium Quality",
    description: "Handpicked fabrics and materials sourced from the finest mills worldwide",
  },
  {
    icon: Scissors,
    title: "Master Craftsmanship",
    description: "Expert tailors with decades of experience in haute couture and bespoke tailoring",
  },
  {
    icon: Users,
    title: "Personal Styling",
    description: "One-on-one consultation to create your perfect wardrobe that reflects your personality",
  },
  {
    icon: Award,
    title: "Exclusive Designs",
    description: "Limited edition pieces and custom creations you won't find anywhere else",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-17 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Image */}
          <AnimatedText animation="fadeInLeft">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=700&width=600"
                alt="SPARSH DESIGN Atelier"
                width={600}
                height={700}
                className="rounded-3xl shadow-2xl object-cover"
              />

              {/* Location Card
              <div className="absolute -bottom-7 -right-4 w-64 h-32 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-2xl flex items-center justify-center text-white shadow-2xl">
                <div className="text-center p-4">
                  <MapPin className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-sm font-medium">Coimbatore</div>
                  <div className="text-xs opacity-90">Tamil Nadu</div>
                </div>
              </div> */}

              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ef9343]/20 to-[#603202]/20 rounded-xl transform rotate-3 scale-105 -z-10"></div>
            </div>
          </AnimatedText>

          {/* Right Content */}
          <div className="space-y-8">
            <AnimatedText delay={200}>
              <Badge className="w-fit bg-[#ef9343]/20 text-[#603202] hover:bg-[#ef9343]/30 border-[#ef9343]/30">
                About SPARSH DESIGN
              </Badge>
            </AnimatedText>

            <AnimatedText delay={400}>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#603202] leading-tight">
                Crafting Dreams Into
                <span className="block bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
                  Timeless Elegance
                </span>
              </h2>
            </AnimatedText>

            <AnimatedText delay={600}>
              <p className="text-lg text-[#603202]/80 leading-relaxed">
                Since 2003, SPARSH DESIGN has been synonymous with luxury, elegance, and impeccable craftsmanship.
                Located in the heart of Coimbatore, we have been creating bespoke fashion experiences that celebrate
                individuality and sophistication.
              </p>
            </AnimatedText>

            <AnimatedText delay={800}>
              <p className="text-lg text-[#603202]/80 leading-relaxed">
                Our journey began with a simple vision: to create clothing that doesn't just fit the body, but fits the
                soul. Every piece we create tells a story of passion, precision, and the pursuit of perfection.
              </p>
            </AnimatedText>

            {/* Contact Info */}
            <AnimatedText delay={1000}>
              <div className="bg-[#f7faf8] rounded-2xl p-6 border border-[#ef9343]/20">
                <div className="flex items-center space-x-4 mb-4">
                  <Phone className="w-5 h-5 text-[#ef9343]" />
                  <span className="text-[#603202] font-semibold">098657 66573</span>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-[#ef9343] mt-1" />
                  <div className="text-[#603202]/80">
                    <div>135 A, Above ICICI ATM</div>
                    <div>Hope College, Avinashi Rd</div>
                    <div>Coimbatore, Tamil Nadu 641004</div>
                  </div>
                </div>
              </div>
            </AnimatedText>

            <AnimatedText delay={1200}>
              <LiquidButton size="lg">Visit Our Boutique</LiquidButton>
            </AnimatedText>
          </div>
        </div>

        {/* Features Grid */}
        {/* <AnimatedText delay={1000}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-[#f7faf8]"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-[#603202] mb-4 text-lg">{feature.title}</h3>
                    <p className="text-[#603202]/70 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </AnimatedText> */}
      </div>
    </section>
  )
}
