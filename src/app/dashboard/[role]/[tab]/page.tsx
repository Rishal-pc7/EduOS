import { BookOpen, GraduationCap, FileText, Bell, Shield, User, ArrowLeft, Users, LogOut, CheckCircle2, ChevronRight, Bus, MapPin, Search, Send } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { StudentsHub } from "@/components/dashboard/StudentsHub"
import { ExtracurricularPrototype } from "@/components/dashboard/ExtracurricularPrototype"

function AcademicsHubPrototype({ role }: { role: string }) {
  if (role === 'student') {
    return (
      <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Enrolled Classes</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Access all your subject materials, syllabus, and resources.</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { sub: "Mathematics", teacher: "Mr. Sharma", code: "MAT-901", progress: 85, mats: 24, icon: "➗", color: "text-blue-600 bg-blue-100" },
            { sub: "Physics", teacher: "Ms. Gupta", code: "PHY-902", progress: 60, mats: 16, icon: "⚡", color: "text-orange-600 bg-orange-100" },
            { sub: "Computer Science", teacher: "Mr. Davis", code: "CS-903", progress: 40, mats: 12, icon: "💻", color: "text-emerald-600 bg-emerald-100" },
            { sub: "English Literature", teacher: "Mrs. Smith", code: "ENG-904", progress: 90, mats: 31, icon: "📚", color: "text-indigo-600 bg-indigo-100" }
          ].map((c, i) => (
            <Card key={i} className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${c.color} dark:bg-opacity-20`}>
                      {c.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{c.sub}</CardTitle>
                      <CardDescription className="text-xs">{c.code} • {c.teacher}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium whitespace-nowrap">Course Progress</span>
                  <span className="font-bold">{c.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${c.progress}%` }}></div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="secondary" className="font-normal text-xs bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    <FileText className="w-3 h-3 mr-1" /> {c.mats} Resources
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">View Syllabus</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Academic Curriculum</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Syllabus, examinations, and departmental tracking.</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Module Cards */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle>Syllabus Manager</CardTitle>
            <CardDescription>Upload strictly formatted PDF syllabi to auto-generate timelines.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle>Examination Desk</CardTitle>
            <CardDescription>Configure upcoming unit tests, midterms, and finalize global report cards.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border border-indigo-100 dark:border-indigo-900/40 shadow-sm bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-slate-950 cursor-pointer group">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200 dark:shadow-none">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-indigo-900 dark:text-indigo-100">Question Paper AI</CardTitle>
            <CardDescription>Generate complex examination papers using the fine-tuned LLM engine.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

function SettingsHubPrototype({ role }: { role: string }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your profile, preferences, and notifications.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-1">
          <Button variant="ghost" className="w-full justify-start bg-slate-100 dark:bg-slate-800"><User className="w-4 h-4 mr-2" /> Profile</Button>
          <Button variant="ghost" className="w-full justify-start text-slate-500"><Bell className="w-4 h-4 mr-2" /> Notifications</Button>
          <Button variant="ghost" className="w-full justify-start text-slate-500"><Shield className="w-4 h-4 mr-2" /> Security</Button>
        </div>
        <div className="md:col-span-3 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your public facing profile on the portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue="Current" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue="User" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue={`contact@eduos.ai`} disabled />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}


function AnnouncementsPrototype() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Notice Board</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Official circulars, absence alerts, and upcoming events.</p>
      </div>

      <div className="grid gap-4">
        {[
          { type: 'Alert', title: "Unexplained Absence Warning", details: "You were marked absent for 'Physics' period 2 today. Please submit a leave request.", date: "Today, 10:30 AM", color: "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/10", tag: "bg-red-500 text-white" },
          { type: 'Event', title: "Annual Science Exhibition", details: "All projects must be submitted to the HOD by Friday. The exhibition runs next Monday.", date: "Yesterday, 3:00 PM", color: "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/10", tag: "bg-blue-500 text-white" },
          { type: 'Update', title: "Holiday Declared", details: "School will remain closed tomorrow due to heavy rainfall warnings. Online classes suspended.", date: "Mon, 1:15 PM", color: "border-indigo-200 bg-indigo-50 dark:border-indigo-900/50 dark:bg-indigo-900/10", tag: "bg-indigo-500 text-white" },
        ].map((notice, i) => (
          <Card key={i} className={`shadow-sm ${notice.color}`}>
            <CardContent className="p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={`${notice.tag} border-0 rounded hover:opacity-100`}>{notice.type}</Badge>
                  <span className="text-xs font-semibold text-slate-500">{notice.date}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">{notice.title}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{notice.details}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 bg-white dark:bg-slate-900">Mark as Read</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


function BusTrackingPrototype() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Live Bus Tracker</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time GPS tracking for your assigned school transport.</p>
      </div>
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="h-64 bg-slate-200 dark:bg-slate-800 relative w-full flex items-center justify-center">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Faked Bus Marker */}
          <div className="relative z-10 flex flex-col items-center animate-bounce">
            <div className="bg-indigo-600 text-white p-3 rounded-full shadow-lg shadow-indigo-500/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold px-2 py-1 rounded shadow-md mt-2">
              Route 4A • 12 MPH
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Status</p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">On Route</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Estimated Arrival (Stop: Main Gate)</p>
              <p className="text-xl font-bold mt-1">08:14 AM</p>
              <p className="text-xs text-orange-500 mt-0.5">~5 Mins away</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Driver Contact</p>
              <p className="font-semibold mt-1">Mr. Singh</p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5 cursor-pointer">+91 98765 43210</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default async function DynamicTabPage({ params }: { params: Promise<{ role: string, tab: string }> }) {
  const resolvedParams = await params
  
  const roleName = resolvedParams.role.charAt(0).toUpperCase() + resolvedParams.role.slice(1)
  const tabId = resolvedParams.tab.toLowerCase()

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center gap-2 mb-8">
        <Link href={`/dashboard/${resolvedParams.role}`}>
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-500">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </Link>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          Viewing as {roleName}
        </Badge>
      </div>

      {/* Dynamic Tab Renderer */}
      {tabId === 'students' && <StudentsHub role={resolvedParams.role} />}
      {tabId === 'academics' && <AcademicsHubPrototype role={resolvedParams.role} />}
      {tabId === 'settings' && <SettingsHubPrototype role={resolvedParams.role} />}
      {tabId === 'transport' && <BusTrackingPrototype />}
      {tabId === 'announcements' && <AnnouncementsPrototype />}
      {tabId === 'extracurricular' && <ExtracurricularPrototype role={resolvedParams.role} />}
      
      {/* Fallback for unknown tabs */}
      {['students', 'academics', 'settings', 'transport', 'announcements', 'extracurricular'].indexOf(tabId) === -1 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <BookOpen className="w-12 h-12 mb-4 opacity-50" />
          <p>Module configuration not found.</p>
        </div>
      )}
    </div>
  )
}
