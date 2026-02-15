import type React from "react"
import type { Metadata } from "next"

import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Press_Start_2P, Cinzel, Great_Vibes, Rozha_One, Laila, Crimson_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start-2p",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
})

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
})

const rozhaOne = Rozha_One({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-rozha-one",
  display: "swap",
})

const laila = Laila({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
  variable: "--font-laila",
  display: "swap",
})

const crimsonPro = Crimson_Pro({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
})


export const metadata: Metadata = {
  title: "A StoryTelling Web",
  description: "An interactive storytelling experience",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${pressStart2P.variable} ${cinzel.variable} ${greatVibes.variable} ${rozhaOne.variable} ${laila.variable} ${crimsonPro.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
