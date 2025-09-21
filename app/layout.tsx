import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Script from "next/script"

// ✅ Add this line
import { AuthProvider } from "../contexts/AuthContext"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "SPARSH DESIGN - Luxury Fashion Boutique | Coimbatore",
  description:
    "Premium luxury fashion boutique in Coimbatore since 2003. Bespoke tailoring, personal styling, bridal couture. 2K+ happy clients, 99% satisfaction rate.",
  keywords:
    "luxury fashion boutique, bespoke tailoring, personal styling, bridal couture, Coimbatore, Tamil Nadu, custom clothing, premium fashion",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ✅ Google Analytics */}
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
