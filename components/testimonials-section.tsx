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

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";
// import { Star, Trash } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { AnimatedText } from "./animated-text";

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// export function TestimonialsSection({ isAdmin = false }) {
//   const [reviews, setReviews] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     location: "",
//     content: "",
//     rating: 5,
//     image: "",
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [showAll, setShowAll] = useState(false);

//   // Fetch ALL reviews
//   useEffect(() => {
//     axios
//       .get(`${API_BASE}/api/reviews`)
//       .then((res) => setReviews(res.data))
//       .catch((err) => console.error("Error fetching reviews:", err));
//   }, []);

//   const handleAddReview = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/api/reviews`, formData);
//       setReviews((prev) => [res.data, ...prev]);
//       setShowForm(false);
//       setFormData({
//         name: "",
//         role: "",
//         location: "",
//         content: "",
//         rating: 5,
//         image: "",
//       });
//     } catch (err) {
//       console.error("Error adding review:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_BASE}/api/reviews/${id}`);
//       setReviews((prev) => prev.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error("Error deleting review:", err);
//     }
//   };

//   // Decide which reviews to show
//   const displayedReviews = showAll ? reviews : reviews.slice(0, 4);

//   return (
//     <section className="py-20 bg-[#f7faf8]">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <AnimatedText>
//             <Badge className="mx-auto bg-[#ef9343]/20 text-[#603202]">
//               Client Stories
//             </Badge>
//           </AnimatedText>
//           <h2 className="text-4xl font-bold text-[#603202]">
//             What Our Clients Say
//           </h2>
//         </div>

//         {/* Reviews */}
//         <div className="grid md:grid-cols-2 gap-8">
//           {displayedReviews.map((review) => (
//             <Card
//               key={review._id}
//               className="relative border-0 shadow-lg bg-white"
//             >
//               {isAdmin && (
//                 <button
//                   onClick={() => handleDelete(review._id)}
//                   className="absolute top-3 right-3 text-red-500 hover:text-red-700"
//                 >
//                   <Trash size={20} />
//                 </button>
//               )}
//               <CardContent className="p-8 space-y-4">
//                 <div className="flex space-x-1">
//                   {[...Array(review.rating || 0)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-5 h-5 text-[#ef9343] fill-current"
//                     />
//                   ))}
//                 </div>
//                 <blockquote className="italic text-lg">
//                   "{review.content}"
//                 </blockquote>
//                 <div className="flex items-center gap-4">
//                   <Image
//                     src={review.image || "/placeholder.svg"}
//                     width={60}
//                     height={60}
//                     className="rounded-full"
//                     alt={review.name || "Reviewer"}
//                   />
//                   <div>
//                     <p className="font-bold">{review.name}</p>
//                     <p className="text-sm">
//                       {review.role} — {review.location}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Load More Button */}
//         {reviews.length > 4 && !showAll && (
//           <div className="text-center mt-10">
//             <button
//               onClick={() => setShowAll(true)}
//               className="bg-[#ef9343] text-white px-6 py-3 rounded-lg shadow hover:bg-[#d87d33]"
//             >
//               Load More
//             </button>
//           </div>
//         )}

//         {/* Add Review Button */}
//         <div className="text-center mt-10">
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-[#ef9343] text-white px-6 py-3 rounded-lg shadow hover:bg-[#d87d33]"
//           >
//             Add Your Review
//           </button>
//         </div>

//         {/* Review Form Modal */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//               <h3 className="text-xl font-bold mb-4">
//                 Share Your Experience
//               </h3>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={formData.name}
//                 className="border p-2 w-full mb-2"
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Role"
//                 value={formData.role}
//                 className="border p-2 w-full mb-2"
//                 onChange={(e) =>
//                   setFormData({ ...formData, role: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Location"
//                 value={formData.location}
//                 className="border p-2 w-full mb-2"
//                 onChange={(e) =>
//                   setFormData({ ...formData, location: e.target.value })
//                 }
//               />
//               <textarea
//                 placeholder="Your review"
//                 value={formData.content}
//                 className="border p-2 w-full mb-2"
//                 onChange={(e) =>
//                   setFormData({ ...formData, content: e.target.value })
//                 }
//               ></textarea>
//               <input
//                 type="text"
//                 placeholder="Image URL (optional)"
//                 value={formData.image}
//                 className="border p-2 w-full mb-2"
//                 onChange={(e) =>
//                   setFormData({ ...formData, image: e.target.value })
//                 }
//               />
//               <button
//                 onClick={handleAddReview}
//                 className="bg-[#ef9343] text-white px-4 py-2 rounded"
//               >
//                 Submit Review
//               </button>
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="ml-2 text-gray-500"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
