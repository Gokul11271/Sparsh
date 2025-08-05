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
                    <div>135 A, Avinashi Rd, above ICICI ATM</div>
                    <div>Peelamedu, Sri Nagar, Hope College</div>
                    <div>Coimbatore, Tamil Nadu 641004</div>
                  </div>
                </div>
              </div>
            </AnimatedText>

            {/* Visit Our Boutique Button */}
            <AnimatedText delay={1200}>
              <a
                href="https://www.google.co.in/maps/dir/Coimbatore,+Tamil+Nadu/135+A,+Avinashi+Rd,+above+ICICI+ATM,+Peelamedu,+Sri+Nagar,+Hope+College,+Coimbatore,+Tamil+Nadu+641004/@11.0118875,76.9477892,13z/data=!3m2!4b1!5s0x3ba8578572542575:0x64d1c1d491f9fa50!4m14!4m13!1m5!1m1!1s0x3ba859af2f971cb5:0x2fc1c81e183ed282!2m2!1d76.9588876!2d10.9973691!1m5!1m1!1s0x3ba8578574c70215:0x82ba9fdcdf0806d7!2m2!1d77.0193824!2d11.0259674!3e0?hl=en-in&entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiquidButton size="lg">Visit Our Boutique</LiquidButton>
              </a>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  )
}
 
