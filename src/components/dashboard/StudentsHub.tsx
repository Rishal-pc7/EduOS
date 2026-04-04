"use client"

import { useState } from "react"
import { Search, Plus, Filter, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const initialStudents = [
  "Rohan Das (9B)",
  "Ananya Singh (11A)", 
  "Vihaan Kumar (6C)",
  "Priya Patel (11A)",
  "Aryan Sharma (9B)"
]

export function StudentsHub({ role }: { role: string }) {
  const [students, setStudents] = useState<string[]>(initialStudents)
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState("")
  const [newClass, setNewClass] = useState("10A")
  
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName) return
    
    // Add to top of list as a faked addition
    setStudents([`${newName} (${newClass})`, ...students])
    setNewName("")
    setIsAdding(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Students Directory</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and view student profiles across the institution.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Filter className="w-4 h-4" /> Filter</Button>
          {role === 'admin' && (
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 gap-2"
              onClick={() => setIsAdding(!isAdding)}
            >
              {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isAdding ? "Cancel" : "Add Student"}
            </Button>
          )}
        </div>
      </div>

      {isAdding && role === 'admin' && (
        <Card className="border border-indigo-100 shadow-md bg-indigo-50/30 dark:bg-slate-900 animate-in fade-in slide-in-from-top-4">
          <CardContent className="pt-6">
            <form onSubmit={handleAddStudent} className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                  placeholder="e.g. Rahul Gupta" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  className="bg-white dark:bg-slate-950" 
                  autoFocus 
                />
              </div>
              <div className="space-y-2 w-32">
                <label className="text-sm font-medium">Class/Section</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-950"
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                >
                  <option>9A</option>
                  <option>9B</option>
                  <option>10A</option>
                  <option>11A</option>
                </select>
              </div>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                <Check className="w-4 h-4 mr-2" /> Save Student
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search by name or roll number..." className="pl-9 bg-slate-50 dark:bg-slate-900 border-none" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.map((student, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-semibold">
                    {student.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">{student.split(" ")[0]} {student.split(" ")[1] || ''}</h4>
                    <p className="text-sm text-slate-500">
                      Roll: {2001 + i} • Class {student.includes('(') ? student.split("(")[1].slice(0, -1) : 'Unknown'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900/50">Active</Badge>
                  <Button variant="ghost" size="sm" className="text-indigo-600 hidden sm:flex">View Data Profile</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 text-xs text-slate-500 justify-between">
          <span>Showing {students.length} of {1243 + students.length} students</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
