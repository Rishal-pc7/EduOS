"use client"

import { useState } from "react"
import { TrendingUp, Users, DollarSign, BrainCircuit, ChevronRight, CreditCard, CheckCircle2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PrincipalDashboard() {
  const [isPaid, setIsPaid] = useState(false)
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">School Overview</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">High-level metrics and AI-driven insights for EduOS.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (Monthly)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,45,000</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center text-emerald-500">
              <TrendingUp className="w-3 h-3 mr-1" /> +4.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">+12 admissions this week</p>
          </CardContent>
        </Card>

      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>System Health & Automation</CardTitle>
            <CardDescription>Status of automated workflows.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 mx-[-24px] px-6 py-3 border-y border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-medium text-sm">Fee Reminders (Cron)</p>
                <p className="text-xs text-slate-500">Triggered 40 emails today</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:text-green-400 dark:bg-green-900/20 dark:border-green-900/50">Healthy</Badge>
            </div>
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 mx-[-24px] px-6 py-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-medium text-sm">Timetable Auto-Resolver</p>
                <p className="text-xs text-slate-500">0 conflicts detected</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:text-green-400 dark:bg-green-900/20 dark:border-green-900/50">Healthy</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Payment Card */}
        <Card className={`border-0 shadow-sm transition-all duration-500 ${isPaid ? 'bg-emerald-50 dark:bg-emerald-950/20' : ''}`}>
          <CardHeader>
            <CardTitle>EduOS Subscription</CardTitle>
            <CardDescription>Manage your school's platform billing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isPaid ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400'}`}>
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Enterprise Plan</p>
                  <p className="text-xs text-slate-500">2,500 Student Capacity</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">₹49,900</p>
                <p className="text-xs text-slate-500">{isPaid ? 'Paid for Oct' : 'Due Oct 31'}</p>
              </div>
            </div>

            {isPaid ? (
              <div className="flex flex-col items-center justify-center p-4 py-6 border border-emerald-200 dark:border-emerald-800 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-lg animate-in zoom-in duration-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                <p className="font-semibold text-emerald-700 dark:text-emerald-400">Payment Successful</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500 text-center mt-1">Receipt emailed to accounts@school.edu. Your subscription is active.</p>
              </div>
            ) : (
              <div className="pt-2">
                <Button onClick={() => setIsPaid(true)} className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2">
                  <CreditCard className="w-4 h-4" /> Securely Pay Now
                </Button>
                <p className="text-xs text-center text-slate-500 mt-3 flex items-center justify-center gap-1">
                  Powered by <span className="font-bold text-slate-700 dark:text-slate-300">Stripe</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
