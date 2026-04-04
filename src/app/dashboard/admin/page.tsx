"use client"

import { useState } from "react"
import { FileCheck, Users, Banknote, Calendar, Zap, RefreshCw, Loader2, Check } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), 2000)
  }

  const handleSchedule = () => {
    setIsScheduling(true)
    setTimeout(() => setIsScheduling(false), 3000)
  }
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Administration Desk</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage school operations, admissions, and schedules.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleSync} disabled={isSyncing}>
            {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {isSyncing ? "Syncing Data..." : "Sync Data"}
          </Button>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700 border-none gap-2" onClick={handleSchedule} disabled={isScheduling}>
            {isScheduling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
            {isScheduling ? "Processing..." : "Auto-Schedule Timetable"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm border-l-4 border-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Admissions</CardTitle>
            <FileCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">Require document verification</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm border-l-4 border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground mt-1">3 on leave today</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm border-l-4 border-indigo-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
            <Banknote className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground mt-1">Current term</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm border-l-4 border-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Actions</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Pending timetable conflicts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Admission Leads</CardTitle>
            <CardDescription>Review and approve new student applications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Vihaan Kumar", grade: "Class 6", status: "Pending Docs", date: "Today" },
                { name: "Ananya Singh", grade: "Class 11", status: "Ready for Review", date: "Yesterday" },
                { name: "Rohan Das", grade: "Class 9", status: "Fee Pending", date: "2 days ago" }
              ].map((lead, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">{lead.name}</h4>
                    <p className="text-sm text-slate-500">{lead.grade} • Applied: {lead.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="border-slate-200 text-slate-600 bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-300">
                      {lead.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-7 text-indigo-600 hover:text-indigo-700 p-0">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>System Automations</CardTitle>
            <CardDescription>Manually trigger system-wide tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 mx-[-24px] px-6 py-4 border-y border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80">
              <div>
                <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">Send Fee Reminders</p>
                <p className="text-xs text-slate-500 mt-1">Dispatches emails to pending accounts</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2" onClick={handleSync}>
                {isSyncing ? <><RefreshCw className="w-3 h-3 animate-spin"/> Running</> : 'Run Now'}
              </Button>
            </div>
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 mx-[-24px] px-6 py-4 border-b border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80">
              <div>
                <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">Timetable Conflict Resolver</p>
                <p className="text-xs text-slate-500 mt-1">Uses AI to balance staff loads</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2" onClick={handleSchedule}>
                {isScheduling ? <><Loader2 className="w-3 h-3 animate-spin"/> Resolving</> : 'Run Now'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
