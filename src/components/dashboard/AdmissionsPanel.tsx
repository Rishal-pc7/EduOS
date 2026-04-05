"use client"

import { useState } from "react"
import { FileCheck, ChevronRight, Plus, X, AlertCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialAdmissionLeads = [
  { name: "Vihaan Kumar",  grade: "Class 6",  stage: "Applied",   date: "Today",     id: "ADM-001", parentName: "Rajesh Kumar", phone: "9876543210" },
  { name: "Ananya Singh",  grade: "Class 11", stage: "Verified",  date: "Yesterday", id: "ADM-002", parentName: "Sunita Singh", phone: "9812345678" },
  { name: "Rohan Das",     grade: "Class 9",  stage: "Fee Paid",  date: "2 days ago",id: "ADM-003", parentName: "Amit Das",     phone: "9856781234" },
  { name: "Priya Patel",   grade: "Class 9",  stage: "Assigned",  date: "3 days ago",id: "ADM-004", parentName: "Meena Patel",  phone: "9834567890" },
  { name: "Kiran Menon",   grade: "Class 7",  stage: "Applied",   date: "Today",     id: "ADM-005", parentName: "Suresh Menon", phone: "9867890123" },
]

const stageColors: Record<string, string> = {
  Applied:  "bg-yellow-100 text-yellow-800 border-yellow-200",
  Verified: "bg-blue-100 text-blue-800 border-blue-200",
  "Fee Paid": "bg-emerald-100 text-emerald-800 border-emerald-200",
  Assigned: "bg-indigo-100 text-indigo-800 border-indigo-200",
}

export function AdmissionsPanel() {
  const [admissionStages, setAdmissionStages] = useState(initialAdmissionLeads)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", parentName: "", phone: "", grade: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.grade) return
    const newEntry = {
      ...form,
      stage: "Applied",
      date: "Just now",
      id: `ADM-${String(admissionStages.length + 1).padStart(3, "0")}`
    }
    setAdmissionStages([newEntry, ...admissionStages])
    setForm({ name: "", parentName: "", phone: "", grade: "" })
    setShowForm(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">Admissions Management</h3>
          <p className="text-sm text-slate-500 mt-0.5">Add new applications and advance them through the pipeline.</p>
        </div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 gap-1.5 shrink-0" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "New Admission"}
        </Button>
      </div>

      {/* ── Admission Form ── */}
      {showForm && (
        <Card className="border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-sm animate-in slide-in-from-top-2 duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">New Admission Application</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="space-y-1.5">
                <Label htmlFor="adm-name" className="text-xs font-semibold text-slate-600 dark:text-slate-400">Student Name *</Label>
                <Input id="adm-name" placeholder="e.g. Aarya Nair" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="h-9 bg-white dark:bg-slate-950" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="adm-parent" className="text-xs font-semibold text-slate-600 dark:text-slate-400">Parent / Guardian</Label>
                <Input id="adm-parent" placeholder="e.g. Sunil Nair" value={form.parentName} onChange={e => setForm({...form, parentName: e.target.value})} className="h-9 bg-white dark:bg-slate-950" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="adm-phone" className="text-xs font-semibold text-slate-600 dark:text-slate-400">Contact Number</Label>
                <Input id="adm-phone" placeholder="9876543210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="h-9 bg-white dark:bg-slate-950" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="adm-grade" className="text-xs font-semibold text-slate-600 dark:text-slate-400">Target Grade *</Label>
                <div className="flex gap-2">
                  <Input id="adm-grade" placeholder="e.g. Class 9" value={form.grade} onChange={e => setForm({...form, grade: e.target.value})} className="h-9 bg-white dark:bg-slate-950 flex-1" required />
                  <Button type="submit" size="sm" className="h-9 bg-indigo-600 hover:bg-indigo-700 px-4 shrink-0">Submit</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ── Kanban Pipeline ── */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Pipeline Overview</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[650px]">
            {["Applied", "Verified", "Fee Paid", "Assigned"].map(stage => (
              <div key={stage} className="flex-1 min-w-[150px] bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stage}</h4>
                  <Badge variant="secondary" className="text-[10px] h-4 px-1.5">{admissionStages.filter(a => a.stage === stage).length}</Badge>
                </div>
                <div className="space-y-2">
                  {admissionStages.filter(a => a.stage === stage).map(lead => (
                    <div key={lead.id} className="bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:ring-1 hover:ring-indigo-500/30">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{lead.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{lead.grade} · {lead.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Applicant List ── */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">All Applicants</CardTitle>
          <CardDescription>Review details and advance each application.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {admissionStages.map(lead => (
              <div key={lead.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 uppercase shrink-0">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.grade} · {lead.parentName ? `Parent: ${lead.parentName}` : ""} · {lead.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={`text-[10px] px-2 h-5 border ${stageColors[lead.stage]}`}>{lead.stage}</Badge>
                  {lead.stage !== "Assigned" && (
                    <Button size="sm" variant="ghost" className="text-indigo-600 hover:text-indigo-700 h-8 text-[11px] font-medium gap-1 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      onClick={() => {
                        const order = ["Applied","Verified","Fee Paid","Assigned"]
                        const next = order[order.indexOf(lead.stage) + 1]
                        setAdmissionStages(prev => prev.map(a => a.id === lead.id ? { ...a, stage: next } : a))
                      }}
                    >
                      Next Stage <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
