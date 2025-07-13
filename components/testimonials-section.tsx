import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { AnimatedText } from "./animated-text"

const testimonials = [
  {
    name: "Priya Krishnan",
    role: "Bride",
    location: "Coimbatore",
    content:
      "SPARSH DESIGN made my wedding day absolutely magical. The attention to detail in my bridal lehenga was extraordinary. Every stitch, every embellishment was perfect. I felt like royalty!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Anitha Rajesh",
    role: "Corporate Executive",
    location: "Chennai",
    content:
      "The personal styling service completely transformed my professional wardrobe. I now feel confident and powerful in every meeting. The investment was absolutely worth every penny!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Meera Sundaram",
    role: "Fashion Enthusiast",
    location: "Bangalore",
    content:
      "I've been a loyal customer for 5 years now. The quality, creativity, and personal touch that SPARSH DESIGN brings to every piece is unmatched. They truly understand my style!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Kavitha Raman",
    role: "Entrepreneur",
    location: "Madurai",
    content:
      "From casual wear to formal events, SPARSH DESIGN has been my go-to for all occasions. Their custom tailoring is perfection, and the styling advice is always spot-on!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#f7faf8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <AnimatedText>
            <Badge className="w-fit mx-auto bg-[#ef9343]/20 text-[#603202] hover:bg-[#ef9343]/30 border-[#ef9343]/30">
              Client Stories
            </Badge>
          </AnimatedText>

          <AnimatedText delay={200}>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#603202]">
              What Our Clients
              <span className="block bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={400}>
            <p className="text-xl text-[#603202]/80 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our valued clients have to say about their transformative
              experience with SPARSH DESIGN.
            </p>
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedText key={index} delay={index * 150} animation="fadeInUp">
              <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 relative overflow-hidden bg-white">
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-20 h-20 text-[#ef9343]" />
                </div>

                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#ef9343] fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-[#603202]/80 leading-relaxed text-lg italic font-light">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="flex items-center space-x-4 pt-6 border-t border-[#ef9343]/20">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover border-2 border-[#ef9343]/30"
                    />
                    <div>
                      <div className="font-bold text-[#603202] text-lg">{testimonial.name}</div>
                      <div className="text-[#603202]/70 font-medium">{testimonial.role}</div>
                      <div className="text-sm text-[#ef9343] font-medium">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          ))}
          
        </div>

        <AnimatedText delay={600}>
  <div className="text-center mt-10 md:mt-16">
    <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-[#ef9343]/20 gap-8 md:gap-0 md:space-x-12">
      
      {/* Clients */}
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
          2K
        </div>
        <div className="text-[#603202]/70 font-medium">Happy Clients</div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-16 bg-[#ef9343]/30"></div>

      {/* Experience */}
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#603202] to-[#ef9343] bg-clip-text text-transparent">
          22+
        </div>
        <div className="text-[#603202]/70 font-medium">Years Experience</div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-16 bg-[#ef9343]/30"></div>

      {/* Satisfaction */}
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
          99%
        </div>
        <div className="text-[#603202]/70 font-medium">Satisfaction Rate</div>
      </div>

    </div>
  </div>
</AnimatedText>

      </div>
    </section>
  )
}
