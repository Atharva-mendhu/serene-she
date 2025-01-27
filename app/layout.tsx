import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/app/components/theme-provider"
import { Header } from "@/app/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SereneShe - Your Personal Growth & Wellness Space",
  description: "Empowering women to thrive in their careers while maintaining mental wellness through AI-powered support and a nurturing community.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <div className="container mx-auto py-6">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


