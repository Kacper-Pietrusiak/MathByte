"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  
  // Hide navbar on student and admin pages
  if (pathname === "/student" || pathname === "/admin") {
    return null;
  }

  const handleDashboardClick = () => {
    if (!user) return;
    
    const role = user.publicMetadata.role as string;
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/student");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-700">
          <Image src="/LOGOTYP.svg" alt="Logo" width={400} height={100} />
        </Link>

        {/* Nawigacja */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link href="#pricing" className="hover:text-blue-600 transition">Cennik</Link>
          <Link href="#how" className="hover:text-blue-600 transition">Jak to działa</Link>
          <Link href="#testimonials" className="hover:text-blue-600 transition">Opinie</Link>
        </nav>

        {/* Prawa strona: Rezerwacja / Logowanie */}
        <div className="flex items-center gap-4">
          {isSignedIn && (
            <Button 
              variant="outline" 
              className="hidden md:inline-flex"
              onClick={handleDashboardClick}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          )}
          <Button asChild className="hidden md:inline-flex">
            <Link href="/book">Umów lekcję</Link>
          </Button>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline">Zaloguj się</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
