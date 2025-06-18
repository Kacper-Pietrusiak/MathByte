"use client"

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'

export function NavbarWrapper() {
  const pathname = usePathname()
  const showNavbar = !pathname?.startsWith('/student')

  if (!showNavbar) return null
  return <Navbar />
} 