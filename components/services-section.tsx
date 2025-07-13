import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Ruler, Sparkles, Users, Clock, Heart } from "lucide-react"
import { AnimatedText } from "./animated-text"
import { LiquidButton } from "./liquid-button"

const services = [
  {
    icon: Palette,
    title: "Personal Styling",
    description: "Comprehensive style consultation to discover and refine your unique fashion identity",
    features: ["Style Assessment", "Color Analysis", "Wardrobe Planning", "Shopping Guidance"],
    price: "₹3,500/session",
    duration: "2-3 hours",
  },
  {
    icon: Ruler,
    title: "Bespoke Tailoring",
    description: "Custom-made clothing tailored to your exact measurements and style preferences",
    features: ["Perfect Fit Guarantee", "Premium Fabrics", "Multiple Fittings", "Lifetime Alterations"],
    price: "Starting ₹12,000",
    duration: "3-4 weeks",
  },
  {
    icon: Sparkles,
    title: "Bridal Styling",
    description: "Complete bridal transformation including outfit selection, accessories, and styling",
    features: ["Bridal Consultation", "Outfit Coordination", "Accessory Selection", "Trial Sessions"],
    price: "₹25,000 package",
    duration: "Full experience",
  },
  {
    icon: Users,
    title: "Group Styling",
    description: "Coordinated styling services for families, bridal parties, or special events",
    features: ["Group Discounts", "Coordinated Looks", "Event Planning", "Group Consultation"],
    price: "₹2,500/person",
    duration: "4-5 hours",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <AnimatedText>
            <Badge className="w-fit mx-auto bg-[#ef9343]/20 text-[#603202] hover:bg-[#ef9343]/30 border-[#ef9343]/30">
              Our Services
            </Badge>
          </AnimatedText>

          <AnimatedText delay={200}>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#603202]">
              Personalized
              <span className="block bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
                Luxury Experience
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={400}>
            <p className="text-xl text-[#603202]/80 max-w-3xl mx-auto leading-relaxed">
              Beyond creating beautiful clothing, we offer comprehensive styling services designed to help you discover,
              develop, and express your unique style with confidence and sophistication.
            </p>
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <AnimatedText key={index} delay={index * 150} animation="fadeInUp">
                <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 h-full bg-gradient-to-br from-white to-[#f7faf8]">
                  <CardHeader className="pb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-[#603202] group-hover:text-[#ef9343] transition-colors duration-300">
                            {service.title}
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-[#603202]/70 mt-2">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{service.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4 text-[#ef9343]" />
                              <span className="font-semibold text-[#ef9343]">{service.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-[#603202]/80 leading-relaxed">{service.description}</p>

                    <div>
                      <h4 className="font-semibold text-[#603202] mb-4">What's Included:</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3 text-[#603202]/80">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#ef9343] to-[#603202] rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <LiquidButton className="w-full group/btn">
                      <span className="flex items-center justify-center space-x-2">
                        <span>Book Consultation</span>
                        <Sparkles className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                      </span>
                    </LiquidButton>
                  </CardContent>
                </Card>
              </AnimatedText>
            )
          })}
        </div>

        <AnimatedText delay={600}>
          <div className="text-center mt-16 p-10 bg-gradient-to-r from-[#ef9343]/10 to-[#603202]/10 rounded-3xl border border-[#ef9343]/20">
            <h3 className="text-2xl font-bold text-[#603202] mb-4">Not sure which service suits you best?</h3>
            <p className="text-[#603202]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Schedule a complimentary 30-minute consultation where we'll discuss your style goals, preferences, and
              recommend the perfect service package tailored to your needs.
            </p>
            {/* <LiquidButton variant="outline" size="lg">
              Schedule Free Consultation
            </LiquidButton> */}
          </div>
        </AnimatedText>
      </div>
    </section>
  )
}
