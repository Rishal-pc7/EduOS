"use client"

import { useState } from "react"
import { BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function ExtracurricularPrototype({ role }: { role: string }) {
  const [activities, setActivities] = useState<{id: number, name: string, scope: string, enrolled: boolean, members: number, instructor: string}[]>([
    { id: 1, name: "Debate Society", scope: "Public Speaking & Argumentation", enrolled: false, members: 24, instructor: "Mr. Sharma" },
    { id: 2, name: "Varsity Football", scope: "Daily afternoon training & inter-school trials.", enrolled: true, members: 45, instructor: "Coach Davis" },
    { id: 3, name: "Robotics Club", scope: "Learn embedded systems and build competition units.", enrolled: false, members: 16, instructor: "Ms. Gupta" }
  ]);
  const [newActivityName, setNewActivityName] = useState("");

  const handleEnroll = (id: number) => {
    setActivities(activities.map(a => a.id === id ? { ...a, enrolled: true, members: a.members + 1 } : a))
  }

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newActivityName.trim() === '') return;
    setActivities([...activities, { id: Date.now(), name: newActivityName, scope: "Newly created club pending description.", enrolled: false, members: 0, instructor: "TBD" }]);
    setNewActivityName("");
  }

  const canCreate = role === 'admin' || role === 'teacher';

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Extracurricular Activities</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Enroll in clubs and manage extra-curricular life.</p>
        </div>
      </div>

      {canCreate && (
        <Card className="border-indigo-100 bg-indigo-50/50 dark:border-indigo-900/50 dark:bg-indigo-950/20 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-indigo-800 dark:text-indigo-400 text-lg flex items-center gap-2">
              <span className="p-1 bg-indigo-600 rounded text-white"><BookOpen className="w-4 h-4"/></span> Create New Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddActivity} className="flex gap-2">
              <Input 
                placeholder="Name of the new club or team..." 
                value={newActivityName} 
                onChange={(e) => setNewActivityName(e.target.value)}
                className="bg-white dark:bg-slate-950 max-w-md"
              />
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">Add Club</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((a) => (
          <Card key={a.id} className="border border-slate-200 dark:border-slate-800 flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg leading-tight">{a.name}</CardTitle>
                {a.enrolled && <Badge className="bg-green-500">Enrolled</Badge>}
              </div>
              <p className="text-xs font-semibold text-slate-500">Instructor: {a.instructor}</p>
            </CardHeader>
            <CardContent className="flex-1 text-sm text-slate-600 dark:text-slate-400">
              {a.scope}
            </CardContent>
            <CardFooter className="pt-0 flex justify-between items-center border-t border-slate-100 dark:border-slate-800 mt-4 py-3 bg-slate-50/50 dark:bg-slate-900/20 rounded-b-lg">
              <span className="text-xs text-slate-500 font-medium">{a.members} Participants</span>
              {!a.enrolled ? (
                <Button size="sm" onClick={() => handleEnroll(a.id)} className="shrink-0 bg-indigo-600 hover:bg-indigo-700">Enroll Me</Button>
              ) : (
                <Button size="sm" variant="outline" className="shrink-0 text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20" disabled>Registered</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
