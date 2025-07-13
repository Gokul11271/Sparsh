import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "SPARSH DESIGN - Luxury Fashion Boutique | Coimbatore",
  description:
    "Premium luxury fashion boutique in Coimbatore since 2003. Bespoke tailoring, personal styling, bridal couture. 2K+ happy clients, 99% satisfaction rate.",
  keywords:
    "luxury fashion boutique, bespoke tailoring, personal styling, bridal couture, Coimbatore, Tamil Nadu, custom clothing, premium fashion",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
