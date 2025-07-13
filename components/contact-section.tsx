import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"
import { AnimatedText } from "./animated-text"
import { LiquidButton } from "./liquid-button"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Boutique",
    details: ["135 A, Above ICICI ATM", "Hope College, Avinashi Rd", "Coimbatore, Tamil Nadu 641004"],
    action: "Get Directions",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["098657 66573", "For appointments & inquiries"],
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@sparshdesign.com", "appointments@sparshdesign.com"],
    action: "Send Email",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Sat: 10:00 AM - 8:00 PM", "Sunday: 12:00 PM - 6:00 PM"],
    action: "Book Appointment",
  },
]

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram", color: "from-pink-500 to-purple-600" },
  { icon: Facebook, href: "#", label: "Facebook", color: "from-blue-500 to-blue-700" },
  { icon: Twitter, href: "#", label: "Twitter", color: "from-blue-400 to-blue-600" },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <AnimatedText>
            <Badge className="w-fit mx-auto bg-[#ef9343]/20 text-[#603202] hover:bg-[#ef9343]/30 border-[#ef9343]/30">
              Get In Touch
            </Badge>
          </AnimatedText>

          <AnimatedText delay={200}>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#603202]">
              Let's Create Something
              <span className="block bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
                Beautiful Together
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={400}>
            <p className="text-xl text-[#603202]/80 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your style? We'd love to hear from you. Visit our boutique in Coimbatore or reach out
              to schedule a consultation and experience the SPARSH DESIGN difference.
            </p>
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <AnimatedText key={index} delay={index * 100} animation="fadeInUp">
                <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 text-center h-full bg-gradient-to-br from-white to-[#f7faf8]">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#ef9343] to-[#603202] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg text-[#603202] group-hover:text-[#ef9343] transition-colors duration-300">
                      {info.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-[#603202]/70 text-sm leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>

                    <button className="text-[#ef9343] hover:text-[#603202] transition-colors duration-300 font-medium text-sm">
                      {info.action}
                    </button>
                  </CardContent>
                </Card>
              </AnimatedText>
            )
          })}
        </div>

        {/* CTA Section */}
        <AnimatedText delay={600}>
          <div className="text-center bg-gradient-to-r from-[#ef9343] to-[#603202] rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Begin Your Style Journey?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Book your complimentary consultation today and discover how SPARSH DESIGN can transform your wardrobe and
              elevate your confidence to new heights.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <LiquidButton variant="secondary" size="lg">
                Book Free Consultation
              </LiquidButton>
              <LiquidButton
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#603202]"
              >
                Visit Our Boutique
              </LiquidButton>
            </div>
          </div>
        </AnimatedText>

        {/* map */}
        {/* <AnimatedText delay={1000}>
  <div className="mt-10 md:mt-16">
    <h2 className="text-center text-2xl md:text-3xl font-bold text-[#603202] mb-6">
      Visit Our Boutique
    </h2>
    <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-[#ef9343]/30">
      <iframe
        title="Sparsh Ladies Designer Boutique Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.336936594148!2d76.9869790757847!3d11.018664554257384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859bc8f158cc3%3A0xcbd9cf9c41573541!2s135%20A%2C%20Above%20Icici%20Atm%2C%20Hope%20College%2C%20Avinashi%20Rd%2C%20Coimbatore%2C%20Tamil%20Nadu%20641004!5e0!3m2!1sen!2sin!4v1720879055821!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen   // ✅ Correct usage: no quotes or value
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</AnimatedText> */}
{/* Social Media */}
        <AnimatedText delay={800}>
          <div className="text-center mt-16">
            <h4 className="text-xl font-semibold text-[#603202] mb-6">Follow Our Journey</h4>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                    aria-label={social.label}
                  >
                    <Icon className="w-7 h-7" />
                  </Link>
                )
              })}
            </div>
          </div>
        </AnimatedText>

      </div>
    </section>
  )
}
