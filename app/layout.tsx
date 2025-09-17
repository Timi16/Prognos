import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { FlowWrapper } from "@/components/FlowWrapper"

export const metadata: Metadata = {
  title: "Prognos -Predict the Future. Get Paid.",
  description: "Decentralized prediction markets on Flow. Trade on real-world events and earn rewards.",
  generator: "Prognos",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <FlowWrapper>
          <Navigation />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Analytics />
        </FlowWrapper>
      </body>
    </html>
  )
}