import { type Metadata } from 'next'
import {
  ClerkProvider,
  
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ToastProvider } from '@/components/ToastProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MathByte',
  description: 'Korepetcje z matematyki i informatyki | Ustróń | online',
  icons: '/favicon.ico',
  other: {
    'preconnect-clerk': 'https://clerk.mathbyte.pl',
    'preconnect-next-image': '/_next/image',
    'preconnect-google': 'https://fonts.googleapis.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
    >
      <html lang="pl">
      <head>
          <link rel="preconnect" href="https://clerk.mathbyte.pl" />
          <link rel="preconnect" href="/_next/image" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  )
}