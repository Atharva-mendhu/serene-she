import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NavigationBar } from "./components/navigation-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SereneShe - Mental Wellness Companion",
  description: "Your personal mental wellness companion with AI support.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <NavigationBar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}

