import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Script from "next/script"

// ✅ Auth context
import { AuthProvider } from "../contexts/AuthContext"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

// export const metadata: Metadata = {
//   title: "SPARSH DESIGN - Luxury Fashion Boutique | Coimbatore",
//   description:
//     "Premium luxury fashion boutique in Coimbatore since 2003. Bespoke tailoring, personal styling, bridal couture. 2K+ happy clients, 99% satisfaction rate.",
//   keywords:
//     "luxury fashion boutique, bespoke tailoring, personal styling, bridal couture, Coimbatore, Tamil Nadu, custom clothing, premium fashion",
//   generator: "v0.dev",
// }
export const metadata: Metadata = {
  title:
    "SPARSH DESIGN | Luxury Boutique in Coimbatore | Custom Bridal & Designer Wear",
  description:
    "Discover SPARSH DESIGN, Coimbatore’s leading luxury fashion boutique since 2003. Specializing in bespoke tailoring, bridal couture, designer sarees, and premium ethnic wear. Experience personalized styling, custom fits, and timeless elegance loved by 2K+ clients with 99% satisfaction.",
  keywords:
    "SPARSH DESIGN, luxury boutique Coimbatore, designer boutique Tamil Nadu, bridal couture Coimbatore, custom bridal wear, bespoke tailoring, designer sarees, ethnic fashion, women's designer wear, luxury fashion Coimbatore, personalized styling, designer lehenga, premium clothing store, wedding outfit design, couture boutique",
  openGraph: {
    title:
      "SPARSH DESIGN | Premium Luxury Boutique in Coimbatore for Bridal & Designer Wear",
    description:
      "Premium fashion boutique in Coimbatore offering custom bridal couture, designer sarees, and bespoke tailoring. Trusted by 2000+ clients since 2003.",
    url: "https://sparshdesign.com",
    siteName: "SPARSH DESIGN",
    images: [
      {
        url: "/images/sparsh-banner.jpg",
        width: 1200,
        height: 630,
        alt: "SPARSH DESIGN Luxury Boutique Coimbatore",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "SPARSH DESIGN | Luxury Fashion Boutique in Coimbatore | Bridal & Designer Wear",
    description:
      "Explore Coimbatore’s most loved luxury boutique for custom bridal couture, designer wear, and personalized styling. Elegance redefined since 2003.",
    images: ["/images/sparsh-banner.jpg"],
    creator: "@sparshdesign",
  },
  alternates: {
    canonical: "https://sparshdesign.com",
  },
  category: "Fashion & Lifestyle",
  authors: [{ name: "SPARSH DESIGN Team", url: "https://sparshdesign.com" }],
  creator: "SPARSH DESIGN",
  publisher: "SPARSH DESIGN",
  generator: "v0.dev",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ✅ Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2NJFE2BQG0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2NJFE2BQG0');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {/* ✅ Wrap children with AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
