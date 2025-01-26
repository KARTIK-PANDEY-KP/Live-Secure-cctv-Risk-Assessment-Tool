import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import ThemeToggle from "../components/ThemeToggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Risk Assessment Tool",
  description: "Determining risks through AI and image classification by assessing available CCTV and security sources",
}

import Navigation from '@/components/Navigation'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import ChatWidget from '@/components/ChatWidget/ChatWidget'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// In your RootLayout component:
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
    <body className={inter.className}>
      <AuthProvider>
        <ThemeProvider>
          <Navigation />
          <main>
            {children}
          </main>
          <ChatWidget />
        </ThemeProvider>
      </AuthProvider>
    </body>
    </html>
  )
}
// Add this to your head section
<link 
  rel="stylesheet" 
  href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
  crossOrigin=""
/>

