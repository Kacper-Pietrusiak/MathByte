"use client"

import { usePathname } from 'next/navigation'
import { Footer } from './Footer'

export function FooterWrapper() {
  const pathname = usePathname()
  const showFooter = !pathname?.startsWith('/student')

  if (!showFooter) return null
  return <Footer />
} 