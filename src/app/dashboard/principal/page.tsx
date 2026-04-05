"use client"

import { useState } from "react"
import { TrendingUp, Users, DollarSign, BrainCircuit, CreditCard, CheckCircle2, Loader2, Calendar, Pencil, Check, X } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Subject-teacher mapping for the editor dropdown
const subjectTeacherMap: Record<string, string> = {
  "Mathematics": "Mr. Krishnan",
  "Physics": "Ms. Lakshmi",
  "Chemistry": "Mr. Menon",
  "English": "Ms. Nair",
  "Comp. Sci": "Mr. Varghese",
  "Sports": "Coach Nair",
  "Library": "—",
  "Arts": "Ms. Devika",
  "Assembly": "—",
}

const allSubjects = Object.keys(subjectTeacherMap)

type CellData = { sub: string; teacher: string }
type RowData = { period: string; cells: CellData[] }

const initialTimetable: RowData[] = [
  { period: "Period 1\n8:30 – 9:15",  cells: [{ sub: "Mathematics", teacher: "Mr. Krishnan" }, { sub: "English", teacher: "Ms. Nair" }, { sub: "Physics", teacher: "Ms. Lakshmi" }, { sub: "Mathematics", teacher: "Mr. Krishnan" }, { sub: "Comp. Sci", teacher: "Mr. Varghese" }] },
  { period: "Period 2\n9:15 – 10:00", cells: [{ sub: "Physics", teacher: "Ms. Lakshmi" }, { sub: "Mathematics", teacher: "Mr. Krishnan" }, { sub: "Chemistry", teacher: "Mr. Menon" }, { sub: "English", teacher: "Ms. Nair" }, { sub: "Mathematics", teacher: "Mr. Krishnan" }] },
  { period: "Period 3\n10:15 – 11:00", cells: [{ sub: "English", teacher: "Ms. Nair" }, { sub: "Chemistry", teacher: "Mr. Menon" }, { sub: "Mathematics", teacher: "Mr. Krishnan" }, { sub: "Comp. Sci", teacher: "Mr. Varghese" }, { sub: "Physics", teacher: "Ms. Lakshmi" }] },
  { period: "Period 4\n11:00 – 11:45", cells: [{ sub: "Chemistry", teacher: "Mr. Menon" }, { sub: "Physics", teacher: "Ms. Lakshmi" }, { sub: "English", teacher: "Ms. Nair" }, { sub: "Chemistry", teacher: "Mr. Menon" }, { sub: "English", teacher: "Ms. Nair" }] },
  { period: "Period 5\n12:30 – 1:15",  cells: [{ sub: "Comp. Sci", teacher: "Mr. Varghese" }, { sub: "Comp. Sci", teacher: "Mr. Varghese" }, { sub: "Comp. Sci", teacher: "Mr. Varghese" }, { sub: "Physics", teacher: "Ms. Lakshmi" }, { sub: "Chemistry", teacher: "Mr. Menon" }] },
  { period: "Period 6\n1:15 – 2:00",   cells: [{ sub: "Sports", teacher: "Coach Nair" }, { sub: "Library", teacher: "—" }, { sub: "Sports", teacher: "Coach Nair" }, { sub: "Arts", teacher: "Ms. Devika" }, { sub: "Assembly", teacher: "—" }] },
]

const subjectColors: Record<string, string> = {
  "Mathematics": "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-300",
  "Physics": "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950/30 dark:border-orange-800 dark:text-orange-300",
  "Chemistry": "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300",
  "English": "bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-950/30 dark:border-indigo-800 dark:text-indigo-300",
  "Comp. Sci": "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950/30 dark:border-purple-800 dark:text-purple-300",
  "Sports": "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-800 dark:text-red-300",
  "Library": "bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-900/30 dark:border-slate-700 dark:text-slate-400",
  "Arts": "bg-pink-50 border-pink-200 text-pink-800 dark:bg-pink-950/30 dark:border-pink-800 dark:text-pink-300",
  "Assembly": "bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-900/30 dark:border-slate-700 dark:text-slate-400",
}

export default function PrincipalDashboard() {
  const [isPaid, setIsPaid] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showTimetable, setShowTimetable] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [timetable, setTimetable] = useState<RowData[]>(initialTimetable)
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null)

  const handlePublish = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowTimetable(true)
    }, 2500)
  }

  const handleConfirm = () => {
    setIsConfirmed(true)
    setIsEditing(false)
    setEditingCell(null)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setIsConfirmed(false)
  }

  const handleCellClick = (rowIdx: number, colIdx: number) => {
    if (!isEditing) return
    setEditingCell({ row: rowIdx, col: colIdx })
  }

  const handleSubjectChange = (newSubject: string) => {
    if (!editingCell) return
    const updated = timetable.map((row, ri) => {
      if (ri !== editingCell.row) return row
      return {
        ...row,
        cells: row.cells.map((cell, ci) => {
          if (ci !== editingCell.col) return cell
          return { sub: newSubject, teacher: subjectTeacherMap[newSubject] || "—" }
        })
      }
    })
    setTimetable(updated)
    setEditingCell(null)
  }

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
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,45,000</div>
            <p className="text-xs mt-1 flex items-center text-emerald-500">
              <TrendingUp className="w-3 h-3 mr-1" /> +4.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
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

        <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-md bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-slate-950">
          <CardHeader>
            <CardTitle className="text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Timetable Generation
            </CardTitle>
            <CardDescription>
              {isConfirmed ? "Timetable confirmed and published to all staff." : showTimetable ? "Review the generated timetable below, then confirm or edit." : "AI Timetable Generation Complete"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {isConfirmed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Published & Confirmed — Scroll down to view</p>
              </div>
            ) : showTimetable ? (
              <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 animate-in zoom-in duration-300">
                <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Pending Review — Confirm or edit the timetable below</p>
              </div>
            ) : (
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-md shadow-lg shadow-indigo-200 dark:shadow-none font-semibold text-white gap-2"
                onClick={handlePublish}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating & Publishing...</>
                ) : (
                  <><Calendar className="w-4 h-4" /> Publish to School</>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Subscription Payment Card */}
        <Card className={`border-0 shadow-sm transition-all duration-500 ${isPaid ? 'bg-emerald-50 dark:bg-emerald-950/20' : ''}`}>
          <CardHeader>
            <CardTitle>EduOS Subscription</CardTitle>
            <CardDescription>Manage your school&apos;s platform billing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isPaid ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400'}`}>
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Annual School License</p>
                  <p className="text-xs text-slate-500">2,500 Student Capacity</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">₹4,55,520</p>
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
                  Powered by <span className="font-bold text-slate-700 dark:text-slate-300">Razorpay / UPI AutoPay</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── AI Generated Timetable ── */}
      {showTimetable && (
        <div className="animate-in slide-in-from-bottom-6 duration-700">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    AI-Generated Weekly Timetable — Class 9B
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {isEditing
                      ? "Click any cell to change the subject. Press Confirm when done."
                      : isConfirmed
                        ? "Timetable confirmed. Auto-generated by EduOS AI. 0 conflicts."
                        : "Auto-generated by EduOS AI. 0 conflicts detected. Review and confirm."
                    }
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs border-slate-300" onClick={() => { setIsEditing(false); setEditingCell(null) }}>
                        <X className="w-3.5 h-3.5" /> Cancel
                      </Button>
                      <Button size="sm" className="h-8 gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={handleConfirm}>
                        <Check className="w-3.5 h-3.5" /> Confirm & Publish
                      </Button>
                    </>
                  ) : isConfirmed ? (
                    <>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Confirmed</Badge>
                      <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50" onClick={handleEdit}>
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </Button>
                    </>
                  ) : (
                    <>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">Draft</Badge>
                      <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50" onClick={handleEdit}>
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </Button>
                      <Button size="sm" className="h-8 gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={handleConfirm}>
                        <Check className="w-3.5 h-3.5" /> Confirm
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              {isEditing && (
                <div className="mb-3 p-2.5 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-lg text-xs text-indigo-700 dark:text-indigo-300 font-medium flex items-center gap-2">
                  <Pencil className="w-3.5 h-3.5 shrink-0" />
                  Edit Mode — Click on any cell to change the subject. The teacher will be auto-assigned.
                </div>
              )}
              <table className="w-full text-sm border-collapse min-w-[700px]">
                <thead>
                  <tr>
                    <th className="p-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 w-[100px]">Time</th>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                      <th key={day} className="p-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx === 3 ? "border-b-2 border-dashed border-amber-300 dark:border-amber-700" : ""}>
                      <td className="p-2 text-[10px] font-semibold text-slate-500 whitespace-pre-line border-b border-slate-100 dark:border-slate-800 align-top">{row.period}</td>
                      {row.cells.map((cell, colIdx) => (
                        <td key={colIdx} className="p-1.5 border-b border-slate-100 dark:border-slate-800 relative">
                          {editingCell?.row === rowIdx && editingCell?.col === colIdx ? (
                            /* ── Subject picker dropdown ── */
                            <div className="absolute inset-0 z-20 p-1">
                              <div className="bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 rounded-lg shadow-xl p-1 max-h-[200px] overflow-y-auto animate-in zoom-in-95 duration-150">
                                {allSubjects.map(sub => (
                                  <button
                                    key={sub}
                                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition-colors ${sub === cell.sub ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                                    onClick={() => handleSubjectChange(sub)}
                                  >
                                    {sub} <span className="text-[10px] opacity-50 ml-1">({subjectTeacherMap[sub]})</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : null}
                          <div
                            className={`rounded-lg border p-2 text-center transition-all ${subjectColors[cell.sub] || "bg-slate-50 border-slate-200"} ${isEditing ? 'cursor-pointer hover:ring-2 hover:ring-indigo-400 hover:shadow-md' : 'hover:scale-[1.02] hover:shadow-sm'}`}
                            onClick={() => handleCellClick(rowIdx, colIdx)}
                          >
                            <p className="font-semibold text-xs">{cell.sub}</p>
                            <p className="text-[10px] opacity-70 mt-0.5">{cell.teacher}</p>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Break indicator */}
              <div className="flex items-center gap-2 mt-1 mb-0">
                <div className="flex-1 h-px bg-amber-200 dark:bg-amber-800"></div>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider px-2">☕ Lunch Break · 11:45 – 12:30</span>
                <div className="flex-1 h-px bg-amber-200 dark:bg-amber-800"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
