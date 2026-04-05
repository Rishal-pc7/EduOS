"use client"

import { useState } from "react"
import { UserCog, Pencil, AlertCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialTeachers = [
  { name: "Mr. Krishnan",  subject: "Mathematics",   classes: ["9A","9B","10A"], department: "Science", constraint: "Mon aftn free" },
  { name: "Ms. Lakshmi",    subject: "Physics",        classes: ["9B","10B"],      department: "Science", constraint: "" },
  { name: "Mr. Varghese",  subject: "Computer Sci",   classes: ["9A","11A"],      department: "Technology", constraint: "Prefers lab slot AM" },
  { name: "Ms. Nair",      subject: "English Lit",    classes: ["9B","10A","11B"],department: "Humanities", constraint: "" },
  { name: "Mr. Menon",     subject: "Chemistry",      classes: ["10A","11A"],     department: "Science", constraint: "Fri unavailable" },
]

const deptColors: Record<string, string> = {
  Science: "bg-blue-100 text-blue-700 border-blue-200",
  Technology: "bg-purple-100 text-purple-700 border-purple-200",
  Humanities: "bg-amber-100 text-amber-700 border-amber-200",
  Commerce: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Arts: "bg-pink-100 text-pink-700 border-pink-200",
}

export function TeacherAllocationPanel() {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [editingIdx, setEditingIdx] = useState<number | null>(null)
  const [editData, setEditData] = useState({ subject: "", classes: "", department: "" })

  const startEdit = (idx: number) => {
    const t = teachers[idx]
    setEditingIdx(idx)
    setEditData({ subject: t.subject, classes: t.classes.join(", "), department: t.department })
  }

  const saveEdit = () => {
    if (editingIdx === null) return
    const updated = [...teachers]
    updated[editingIdx] = {
      ...updated[editingIdx],
      subject: editData.subject,
      classes: editData.classes.split(",").map(s => s.trim()).filter(Boolean),
      department: editData.department
    }
    setTeachers(updated)
    setEditingIdx(null)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">Staff & Department Allocation</h3>
        <p className="text-sm text-slate-500 mt-0.5">Assign teachers to classes, subjects, and departments.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {teachers.map((t, idx) => (
              <div key={idx} className="p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                {editingIdx === idx ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-indigo-50/30 dark:bg-indigo-950/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/40 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <p className="text-xs text-slate-500 font-bold">Editing: {t.name}</p>
                      <Label className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Subject</Label>
                      <Input value={editData.subject} onChange={e => setEditData({...editData, subject: e.target.value})} className="h-9 bg-white dark:bg-slate-950" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Classes (comma separated)</Label>
                      <Input value={editData.classes} onChange={e => setEditData({...editData, classes: e.target.value})} className="h-9 bg-white dark:bg-slate-950" placeholder="9A, 9B, 10A" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Department</Label>
                      <Input value={editData.department} onChange={e => setEditData({...editData, department: e.target.value})} className="h-9 bg-white dark:bg-slate-950" placeholder="Science, Humanities..." />
                    </div>
                    <div className="md:col-span-3 flex gap-2 justify-end pt-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingIdx(null)} className="h-8 text-xs">Cancel</Button>
                      <Button size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={saveEdit}>Save Changes</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        <UserCog className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{t.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge className={`text-[10px] px-1.5 py-0 h-4 hover:opacity-100 border ${deptColors[t.department] || "bg-slate-100 text-slate-700 border-slate-200"}`}>{t.department}</Badge>
                          <span className="text-xs text-slate-400">·</span>
                          <p className="text-xs text-slate-500">{t.subject}</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {t.classes.map(cls => (
                            <Badge key={cls} variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-slate-100 dark:bg-slate-800 border-none">Class {cls}</Badge>
                          ))}
                        </div>
                        {t.constraint && (
                          <p className="text-[10px] text-amber-600 dark:text-amber-500 mt-2 flex items-center gap-1 font-medium bg-amber-50 dark:bg-amber-900/10 w-fit px-1.5 py-0.5 rounded border border-amber-100 dark:border-amber-900/30">
                            <AlertCircle className="w-3 h-3" /> {t.constraint}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 gap-2 text-indigo-600 border-indigo-100 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 shrink-0" onClick={() => startEdit(idx)}>
                      <Pencil className="w-3.5 h-3.5" /> Edit Assignment
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
