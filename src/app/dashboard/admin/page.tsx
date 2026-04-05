"use client"

import { useState } from "react"
import { FileCheck, Users, Banknote, Calendar, Zap, RefreshCw, Loader2, Check, UserCog, Smartphone } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

import { AdmissionsPanel } from "@/components/dashboard/AdmissionsPanel"
import { TeacherAllocationPanel } from "@/components/dashboard/TeacherAllocationPanel"

// ── Fee data ──────────────────────────────────────────────────────────────

const feeRecords = [
  { name: "Aryan Sharma",   class: "9B", amount: 12500, paid: true,  method: "UPI",  date: "01-Apr" },
  { name: "Rohan Das",      class: "9A", amount: 12500, paid: false, method: "",     date: "" },
  { name: "Priya Patel",    class: "9B", amount: 12500, paid: false, method: "",     date: "" },
  { name: "Sneha Reddy",    class: "10A",amount: 14000, paid: true,  method: "GPay", date: "28-Mar" },
  { name: "Vihaan Kumar",   class: "6A", amount: 9500,  paid: true,  method: "NEFT", date: "02-Apr" },
  { name: "Kiran Menon",    class: "7B", amount: 9500,  paid: false, method: "",     date: "" },
]

// ──────────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const [feeReminders, setFeeReminders] = useState<string[]>([])

  const handleSync = () => { setIsSyncing(true); setTimeout(() => setIsSyncing(false), 2000) }
  const handleSchedule = () => { setIsScheduling(true); setTimeout(() => setIsScheduling(false), 3000) }
  const sendReminder = (name: string) => setFeeReminders(prev => [...prev, name])

  const totalFees = feeRecords.reduce((s, r) => s + r.amount, 0)
  const collectedFees = feeRecords.filter(r => r.paid).reduce((s, r) => s + r.amount, 0)
  const collectionPct = Math.round((collectedFees / totalFees) * 100)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Administration Desk</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage school operations, admissions, and schedules.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleSync} disabled={isSyncing}>
            {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {isSyncing ? "Syncing..." : "Sync Data"}
          </Button>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700 gap-2" onClick={handleSchedule} disabled={isScheduling}>
            {isScheduling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
            {isScheduling ? "Processing..." : "Auto-Schedule"}
          </Button>
        </div>
      </div>

      {/* ── KPI strip ── */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm border-l-4 border-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Admissions</CardTitle>
            <FileCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">In application pipeline</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm border-l-4 border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">Teachers allocated</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm border-l-4 border-indigo-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
            <Banknote className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collectionPct}%</div>
            <p className="text-xs text-muted-foreground mt-1">Current collection rate</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm border-l-4 border-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Actions</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Tabbed panels ── */}
      <Tabs defaultValue="admissions" className="w-full">
        <TabsList className="mb-4 text-xs sm:text-sm flex-wrap h-auto gap-1">
          <TabsTrigger value="admissions" className="gap-1.5"><FileCheck className="w-3.5 h-3.5" />Admissions</TabsTrigger>
          <TabsTrigger value="teachers"   className="gap-1.5"><UserCog   className="w-3.5 h-3.5" />Teacher Allocation</TabsTrigger>
          <TabsTrigger value="fees"       className="gap-1.5"><Banknote  className="w-3.5 h-3.5" />Fee Payments</TabsTrigger>
          <TabsTrigger value="system"     className="gap-1.5"><Zap       className="w-3.5 h-3.5" />System</TabsTrigger>
        </TabsList>

        {/* ── ADMISSIONS TAB ── */}
        <TabsContent value="admissions" className="mt-0">
          <AdmissionsPanel />
        </TabsContent>

        {/* ── TEACHER ALLOCATION TAB ── */}
        <TabsContent value="teachers" className="mt-0">
          <TeacherAllocationPanel />
        </TabsContent>

        {/* ── FEE PAYMENTS TAB ── */}
        <TabsContent value="fees" className="mt-0 space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-0 shadow-sm border-l-4 border-emerald-500">
              <CardContent className="pt-4">
                <p className="text-xs text-slate-500 font-medium">Collected</p>
                <p className="text-2xl font-bold text-emerald-600">₹{collectedFees.toLocaleString('en-IN')}</p>
                <Progress value={collectionPct} className="mt-2 h-1.5" />
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm border-l-4 border-red-400">
              <CardContent className="pt-4">
                <p className="text-xs text-slate-500 font-medium">Outstanding</p>
                <p className="text-2xl font-bold text-red-500">₹{(totalFees - collectedFees).toLocaleString('en-IN')}</p>
                <p className="text-xs text-slate-400 mt-1">{feeRecords.filter(r => !r.paid).length} students pending</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm border-l-4 border-indigo-500">
              <CardContent className="pt-4">
                <p className="text-xs text-slate-500 font-medium">Collection Rate</p>
                <p className="text-2xl font-bold">{collectionPct}%</p>
                <p className="text-xs text-slate-400 mt-1">Current term</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Fee Records</CardTitle>
              <CardDescription>Send WhatsApp UPI payment links to pending accounts.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {feeRecords.map(r => (
                  <div key={r.name} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{r.name}</p>
                      <p className="text-xs text-slate-500">Class {r.class} · ₹{r.amount.toLocaleString('en-IN')}</p>
                      {r.paid && (
                        <p className="text-[10px] text-emerald-600 mt-0.5 flex items-center gap-1 font-medium">
                          <Check className="w-3 h-3" /> Paid via {r.method} on {r.date}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {r.paid ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] h-5 hover:bg-emerald-50">Paid</Badge>
                      ) : (
                        <>
                          <Badge className="bg-red-50 text-red-700 border-red-100 text-[10px] h-5 hover:bg-red-50 font-bold uppercase tracking-wider">Pending</Badge>
                          {feeReminders.includes(r.name) ? (
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] h-5 hover:bg-emerald-50">
                              <Check className="w-3 h-3 mr-1" /> WhatsApp Sent
                            </Badge>
                          ) : (
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 text-[11px] gap-1 px-3"
                              onClick={() => sendReminder(r.name)}
                            >
                              <Smartphone className="w-3.5 h-3.5" /> Send UPI Link
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── SYSTEM TAB ── */}
        <TabsContent value="system" className="mt-0">
          <Card className="border-0 shadow-sm border-t-2 border-indigo-500">
            <CardHeader>
              <CardTitle>System Automations</CardTitle>
              <CardDescription>Manually trigger automated tasks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 mx-[-24px] px-6 py-4 border-y border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">Send WhatsApp Reminders</p>
                  <p className="text-xs text-slate-500 mt-1">Dispatches bulk payment links</p>
                </div>
                <Button size="sm" variant="outline" className="gap-2 h-8 text-xs" onClick={handleSync}>
                  {isSyncing ? <><RefreshCw className="w-3 h-3 animate-spin" />Running</> : "Run Now"}
                </Button>
              </div>
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 mx-[-24px] px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">AI Conflict Resolver</p>
                  <p className="text-xs text-slate-500 mt-1">Uses AI to balance staff loads</p>
                </div>
                <Button size="sm" variant="outline" className="gap-2 h-8 text-xs" onClick={handleSchedule}>
                  {isScheduling ? <><Loader2 className="w-3 h-3 animate-spin" />Resolving</> : "Run Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
