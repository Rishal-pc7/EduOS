"use client"

import { useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { School, LayoutDashboard, Users, BookOpen, Settings, Bell, Search, Menu, LogOut, Bus, Trophy, FileCheck, UserCog, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Extract role from the pathname (e.g., "/dashboard/teacher" -> "teacher")
  const roleMatch = pathname.match(/\/dashboard\/([^\/]+)/)
  const currentRole = roleMatch ? roleMatch[1] : ""
  
  const dashboardLink = `/dashboard/${currentRole}`
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeClass, setActiveClass] = useState("9B");
  const [showClassDropdown, setShowClassDropdown] = useState(false);

  const availableClasses = ["6A", "7A", "7B", "8A", "9A", "9B", "10A", "10B", "11A", "11B"];

  // Helper: returns active classes if the current path matches the href
  // Uses EXACT match for the dashboard root link to prevent it staying highlighted on sub-pages
  const navClass = (href: string) => {
    const isDashboardRoot = href === dashboardLink
    const isActive = isDashboardRoot
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/")
    return `flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium ${
      isActive
        ? "bg-indigo-500/20 text-indigo-400"
        : "hover:bg-slate-800 text-slate-300"
    }`
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 dark:bg-slate-950 dark:border-r dark:border-slate-800 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        <div className="p-4 flex items-center justify-between space-x-3 text-white m-2">
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-1.5 rounded-lg">
              <School className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">EduOS</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>
            x
          </Button>
        </div>
        
        <nav className="flex-1 space-y-1 px-3 py-4">
          {/* Dashboard — always shown */}
          <Link href={dashboardLink || "#"} className={navClass(dashboardLink)}>
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>

          {/* Students Hub — not for student role */}
          {currentRole !== 'student' && (
            <Link href={`${dashboardLink}/students`} className={navClass(`${dashboardLink}/students`)}>
              <Users className="w-5 h-5 mr-3" />
              Students Hub
            </Link>
          )}

          {/* Academics — not for admin */}
          {currentRole !== 'admin' && (
            <Link href={`${dashboardLink}/academics`} className={navClass(`${dashboardLink}/academics`)}>
              <BookOpen className="w-5 h-5 mr-3" />
              Academics
            </Link>
          )}

          {/* Admin-only links */}
          {currentRole === 'admin' && (
            <>
              <Link href={`${dashboardLink}/admissions`} className={navClass(`${dashboardLink}/admissions`)}>
                <FileCheck className="w-5 h-5 mr-3" />
                Admissions
              </Link>
              <Link href={`${dashboardLink}/teachers`} className={navClass(`${dashboardLink}/teachers`)}>
                <UserCog className="w-5 h-5 mr-3" />
                Teacher Allocation
              </Link>
            </>
          )}

          {/* Student-only links */}
          {currentRole === 'student' && (
            <>
              <Link href={`${dashboardLink}/transport`} className={navClass(`${dashboardLink}/transport`)}>
                <Bus className="w-5 h-5 mr-3" />
                Bus Tracker
              </Link>
              <Link href={`${dashboardLink}/announcements`} className={navClass(`${dashboardLink}/announcements`)}>
                <Bell className="w-5 h-5 mr-3" />
                Announcements
              </Link>
            </>
          )}

          <Link href={`${dashboardLink}/extracurricular`} className={navClass(`${dashboardLink}/extracurricular`)}>
            <Trophy className="w-5 h-5 mr-3" />
            Extracurriculars
          </Link>

          <Link href={`${dashboardLink}/settings`} className={navClass(`${dashboardLink}/settings`)}>
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>

        <div className="p-4 mb-4">
          <Link href="/" className="flex items-center px-3 py-2.5 hover:bg-slate-800 text-red-400 hover:text-red-300 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-10 w-full">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative max-w-md hidden sm:flex items-center">
              <Search className="w-4 h-4 absolute left-3 text-slate-400" />
              <Input 
                type="search" 
                placeholder="Search students, classes..." 
                className="pl-9 bg-slate-100 dark:bg-slate-800 border-none w-[300px] h-9 focus-visible:ring-1"
              />
            </div>

            {/* Active Class Selector — only for teachers */}
            {currentRole === 'teacher' && (
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs font-semibold border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/30"
                  onClick={() => setShowClassDropdown(!showClassDropdown)}
                >
                  Class {activeClass}
                  <ChevronDown className="w-3 h-3" />
                </Button>
                {showClassDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-50 p-1 min-w-[120px]">
                    {availableClasses.map(cls => (
                      <button
                        key={cls}
                        className={`w-full text-left text-xs px-3 py-1.5 rounded-md transition-colors ${cls === activeClass ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                        onClick={() => { setActiveClass(cls); setShowClassDropdown(false); }}
                      >
                        Class {cls}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex text-slate-600 dark:text-slate-300">
              EN / മലയാളം
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-500 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </Button>
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/50 transition-all">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
