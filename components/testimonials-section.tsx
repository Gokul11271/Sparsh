"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, Plus } from "lucide-react"
import Image from "next/image"
import { AnimatedText } from "./animated-text"
import AddReviewModal from "./reviews/AddReviewModal"
import axios from "axios"
import toast from "react-hot-toast"

interface Review {
  _id: string
  name: string
  role: string
  location: string
  content: string
  rating: number
  image: string
  createdAt: string
}

// Default testimonials
const defaultTestimonials: Review[] = [
  {
    _id: "default-1",
    name: "Priya Krishnan",
    role: "Bride",
    location: "Coimbatore",
    content:
      "SPARSH DESIGN made my wedding day absolutely magical. The attention to detail in my bridal lehenga was extraordinary. Every stitch, every embellishment was perfect. I felt like royalty!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "default-2",
    name: "Anitha Rajesh",
    role: "Corporate Executive",
    location: "Chennai",
    content:
      "The personal styling service completely transformed my professional wardrobe. I now feel confident and powerful in every meeting. The investment was absolutely worth every penny!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "default-3",
    name: "Meera Sundaram",
    role: "Fashion Enthusiast",
    location: "Bangalore",
    content:
      "I've been a loyal customer for 5 years now. The quality, creativity, and personal touch that SPARSH DESIGN brings to every piece is unmatched. They truly understand my style!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "default-4",
    name: "Kavitha Raman",
    role: "Entrepreneur",
    location: "Madurai",
    content:
      "From casual wear to formal events, SPARSH DESIGN has been my go-to for all occasions. Their custom tailoring is perfection, and the styling advice is always spot-on!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    createdAt: new Date().toISOString(),
  },
]

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>(defaultTestimonials)
  const [loading, setLoading] = useState(true)
  const [addReviewModalOpen, setAddReviewModalOpen] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [])

  // const fetchReviews = async () => {
  //   try {
  //     const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
  //     const response = await axios.get(`${apiBase}/api/reviews/public`, {
  //       params: { limit: 4 },
  //     })

  //     if (response.data?.data?.length > 0) {
  //       setReviews(response.data.data)
  //     }
  //   } catch (error: any) {
  //     console.error(
  //       "Failed to fetch reviews:",
  //       error.response?.data || error.message
  //     )
  //     // keep default testimonials on error
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const fetchReviews = async () => {
  try {
    // Remove trailing slash or /api from base to avoid duplication
    let apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    apiBase = apiBase.replace(/\/+$/, ""); // remove trailing slash
    apiBase = apiBase.replace(/\/api$/, ""); // remove ending /api if exists

    const response = await axios.get(`${apiBase}/api/reviews/public`, {
      params: { limit: 4 },
    });

    if (response.data?.data?.length > 0) {
      setReviews(response.data.data);
    }
  } catch (error: any) {
    console.error(
      "Failed to fetch reviews:",
      error.response?.data || error.message
    );
    // keep default testimonials on error
  } finally {
    setLoading(false);
  }
};


  const handleReviewSuccess = () => {
    toast.success("Thank you for your review!")
    fetchReviews()
  }

  return (
    <section className="py-20 bg-[#f7faf8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
              Don't just take our word for it. Here's what our valued clients
              have to say about their transformative experience with SPARSH
              DESIGN.
            </p>
          </AnimatedText>
        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {reviews.map((review, index) => (
            <AnimatedText
              key={review._id}
              delay={index * 150}
              animation="fadeInUp"
            >
              <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 relative overflow-hidden bg-white">
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-20 h-20 text-[#ef9343]" />
                </div>

                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-[#ef9343] fill-current"
                      />
                    ))}
                  </div>

                  <blockquote className="text-[#603202]/80 leading-relaxed text-lg italic font-light">
                    "{review.content}"
                  </blockquote>

                  <div className="flex items-center space-x-4 pt-6 border-t border-[#ef9343]/20">
                    <Image
                      src={
                        review.image || "/placeholder.svg?height=60&width=60"
                      }
                      alt={review.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover border-2 border-[#ef9343]/30"
                    />
                    <div>
                      <div className="font-bold text-[#603202] text-lg">
                        {review.name}
                      </div>
                      <div className="text-[#603202]/70 font-medium">
                        {review.role}
                      </div>
                      <div className="text-sm text-[#ef9343] font-medium">
                        {review.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedText>
          ))}
        </div>

        {/* Add Review Button */}
        <AnimatedText delay={600}>
          <div className="text-center mb-16">
            <button
              onClick={() => setAddReviewModalOpen(true)}
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-[#ef9343] to-[#603202] text-white px-8 py-4 rounded-2xl hover:from-[#603202] hover:to-[#ef9343] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-semibold">Share Your Experience</span>
            </button>
            <p className="text-[#603202]/60 mt-3 text-sm">
              Had a great experience? We'd love to hear from you!
            </p>
          </div>
        </AnimatedText>

        {/* Statistics */}
        <AnimatedText delay={800}>
          <div className="text-center px-4">
            <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-[#ef9343]/100 gap-8 md:gap-12">
              {/* Stat 1 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
                  2K+
                </div>
                <div className="text-[#603202]/70 font-medium text-base md:text-lg">
                  Happy Clients
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-16 bg-[#ef9343]/30"></div>

              {/* Stat 2 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#603202] to-[#ef9343] bg-clip-text text-transparent">
                  22+
                </div>
                <div className="text-[#603202]/70 font-medium text-base md:text-lg">
                  Years Experience
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-16 bg-[#ef9343]/30"></div>

              {/* Stat 3 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ef9343] to-[#603202] bg-clip-text text-transparent">
                  99%
                </div>
                <div className="text-[#603202]/70 font-medium text-base md:text-lg">
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </div>
        </AnimatedText>
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={addReviewModalOpen}
        onClose={() => setAddReviewModalOpen(false)}
        onSuccess={handleReviewSuccess}
      />
    </section>
  )
}
