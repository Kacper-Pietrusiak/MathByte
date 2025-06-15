"use client"

import { useState } from "react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import {
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  HelpCircle,
  BookOpenCheck,
  ArrowLeft,
  Bell,
  FileText,
  CreditCard,
  Medal,
  MessageCircle,
  Menu,
  X,
} from "lucide-react"

const sidebarLinks = [
  { label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, href: "/student" },
  { label: "My Courses", icon: <BookOpen className="w-4 h-4" />, href: "/student/courses" },
  { label: "My Lessons", icon: <BookOpenCheck className="w-4 h-4" />, href: "/student/lessons" },
  { label: "Resources", icon: <FileText className="w-4 h-4" />, href: "/student/resources" },
  { label: "AI Toolbox", icon: <GraduationCap className="w-4 h-4" />, href: "/student/ai" },
  { label: "Messages", icon: <MessageCircle className="w-4 h-4" />, href: "/student/messages" },
  { label: "Achievements", icon: <Medal className="w-4 h-4" />, href: "/student/achievements" },
  { label: "Payments", icon: <CreditCard className="w-4 h-4" />, href: "/student/payments" },
  { label: "Support", icon: <HelpCircle className="w-4 h-4" />, href: "/student/support" },
]

const studentNotices = [
  {
    title: "Upcoming Lesson",
    description: "Mathematics with Dr. Anna Kowalska in 30 minutes",
    type: "info",
  },
  {
    title: "New Materials Available",
    description: "Check your resources for new study materials",
    type: "info",
  },
]

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 sm:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed sm:static z-50 sm:z-0 top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between sm:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-400">MathByte</span>
            <span className="text-sm bg-blue-400 text-gray-900 px-2 py-0.5 rounded">Student</span>
          </Link>
          <button
            className="sm:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          {studentNotices.map((notice) => (
            <div
              key={notice.title}
              className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
            >
              <div className="flex gap-2">
                <Bell className="w-4 h-4 text-blue-500" />
                <div>
                  <h4 className="font-medium text-sm text-white">{notice.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{notice.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-800 space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
            <span>Student</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Platform
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen flex flex-col">
        {/* Top bar for mobile */}
        <div className="sm:hidden p-4 flex items-center justify-between border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-black"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-lg text-blue-600">MathByte</span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      </main>
    </div>
  )
}
