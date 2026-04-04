"use client"

import { useState } from "react"
import { Users, FileText, CheckCircle, Sparkles, Plus, Loader2, BrainCircuit, ChevronRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TeacherDashboard() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResult, setGeneratedResult] = useState<string | null>(null)

  const [attendance, setAttendance] = useState([
    { id: 1, name: "Rohan Das", roll: "2001", status: "Present" },
    { id: 2, name: "Ananya Singh", roll: "2002", status: "Present" },
    { id: 3, name: "Vihaan Kumar", roll: "2003", status: "Present" },
    { id: 4, name: "Priya Patel", roll: "2004", status: "Absent" },
  ]);

  const [leaves, setLeaves] = useState([
    { id: 101, name: "Aryan Sharma", date: "Tomorrow", reason: "Family Function", status: "pending" },
    { id: 102, name: "Sneha Reddy", date: "12-Oct to 14-Oct", reason: "Viral Fever", status: "pending" },
  ]);

  const toggleAttendance = (id: number) => {
    setAttendance(attendance.map(s => s.id === id ? { ...s, status: s.status === "Present" ? "Absent" : "Present" } : s));
  }

  const handleLeave = (id: number, action: "Approved" | "Rejected") => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: action } : l));
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setGeneratedResult(null)
    setTimeout(() => {
      setGeneratedResult(`**Photosynthesis & Cellular Respiration (Medium Difficulty)**

1. **Critical Thinking:** Explain how a decrease in global sunlight from a volcanic eruption would impact the balance of oxygen and carbon dioxide over 6 months.

2. **Analysis:** Compare the energy efficiency between aerobic cellular respiration and lactic acid fermentation. Why do humans rely on both?

3. **Application:** If a plant is placed in a totally dark room but supplied with endless glucose, can it survive? Justify your answer using the equations of both processes.`)
      setIsGenerating(false)
    }, 2500)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Welcome back, Mr. Smith</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here is the overview for your classes today.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none gap-2 px-6">
          <Sparkles className="w-4 h-4" /> Wait, Ask AI Copilot
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">4 need immediate grading</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Attendance (9B)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <Progress value={92} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaves to Approve</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="mb-4 text-xs sm:text-sm">
          <TabsTrigger value="attendance">Daily Attendance</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
          <TabsTrigger value="tasks">Pending Tasks</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="ai-generator">AI Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="mt-0">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Attendance Register</CardTitle>
                <CardDescription>Class 9B - Today</CardDescription>
              </div>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Submit Registry</Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-slate-200 dark:border-slate-800">
                {attendance.map((student, i) => (
                  <div key={student.id} className={`flex items-center justify-between p-4 ${i !== attendance.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-sm text-slate-500 w-8">{student.roll}</div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{student.name}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => toggleAttendance(student.id)}
                        variant={student.status === "Present" ? "default" : "outline"} 
                        className={student.status === "Present" ? "bg-emerald-500 hover:bg-emerald-600 w-24" : "w-24 border-emerald-200 text-emerald-600 hover:bg-emerald-50"}
                      >
                        Present
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => toggleAttendance(student.id)}
                        variant={student.status === "Absent" ? "destructive" : "outline"}
                        className={student.status === "Absent" ? "w-20" : "w-20 border-red-200 text-red-600 hover:bg-red-50"}
                      >
                        Absent
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves" className="mt-0">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Student Leave Applications</CardTitle>
              <CardDescription>Review and approve absence requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaves.map((leave) => (
                  <div key={leave.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border ${leave.status === 'pending' ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800' : 'bg-white border-slate-100 opacity-60'}`}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{leave.name}</span>
                        {leave.status !== 'pending' && <Badge variant="outline" className={leave.status === 'Approved' ? 'text-emerald-600 border-emerald-200' : 'text-red-600 border-red-200'}>{leave.status}</Badge>}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400"><span className="font-medium mr-1">Reason:</span>{leave.reason}</p>
                      <p className="text-xs text-slate-500 mt-1">Requested Dates: {leave.date}</p>
                    </div>
                    {leave.status === 'pending' && (
                      <div className="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                        <Button size="sm" onClick={() => handleLeave(leave.id, "Approved")} className="bg-emerald-600 hover:bg-emerald-700 flex-1">Approve</Button>
                        <Button size="sm" onClick={() => handleLeave(leave.id, "Rejected")} variant="destructive" className="flex-1">Reject</Button>
                      </div>
                    )}
                  </div>
                ))}
                {leaves.filter(l => l.status === 'pending').length === 0 && (
                  <div className="text-center py-6 text-slate-500 text-sm border border-dashed rounded-lg">
                    No pending leave applications.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-0 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Needs Attention</CardTitle>
              <CardDescription>Your tasks organized by priority.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Grade Midterm Submissions</p>
                        <p className="text-sm text-slate-500">Class 10A Science - 34 pending</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Review</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-generator" className="mt-4">
          <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-md bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-950 dark:to-indigo-950/20">
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-xs">AI Copilot</span>
              </div>
              <CardTitle>Generate Smart Assignment</CardTitle>
              <CardDescription>Instantly create assignments customized for your class's pacing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 max-w-md">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic Context</label>
                  <input type="text" placeholder="e.g. Photosynthesis and cellular respiration" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950" />
                </div>
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Difficulty</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-950">
                      <option>Medium</option>
                      <option>Easy</option>
                      <option>Hard</option>
                    </select>
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Question Type</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-950">
                      <option>Critical Thinking</option>
                      <option>Multiple Choice</option>
                      <option>Short Answer</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
              <Button disabled={isGenerating} onClick={handleGenerate} className="bg-indigo-600 hover:bg-indigo-700">
                {isGenerating ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <>Generate with AI <Sparkles className="w-4 h-4 ml-2" /></>
                )}
              </Button>
              {generatedResult && (
                <div className="w-full mt-4 p-4 rounded-md bg-white border border-indigo-100 dark:bg-slate-900 dark:border-indigo-900 shadow-sm animate-in fade-in slide-in-from-top-2">
                  <h4 className="text-sm font-semibold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center"><Sparkles className="w-3 h-3 mr-1" /> AI Output Generated:</h4>
                  <div className="text-sm whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                    {generatedResult}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">Save to Drafts</Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Publish to Class</Button>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="mt-0">
          <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-t-xl border-b border-indigo-50 dark:border-indigo-900/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-md bg-indigo-600">
                  <BrainCircuit className="w-4 h-4 text-white" />
                </div>
                <CardTitle>AI Student Insights Panel</CardTitle>
              </div>
              <CardDescription>Predictive analytics for your homeroom class based on recent data.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {/* Insight Item 1 */}
                <div className="p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <img src="https://ui-avatars.com/api/?name=Aryan+Sharma&background=random" className="w-10 h-10 rounded-full" alt="Aryan" />
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Aryan Sharma</h4>
                        <p className="text-sm text-slate-500">Class 9B • ID: ST-2401</p>
                      </div>
                    </div>
                    <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 dark:bg-red-900/30 dark:text-red-400">High Risk</Badge>
                  </div>
                  <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg p-3 mt-3 shadow-sm">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">AI Analysis:</span> Aryan's attendance has dropped by 18% over 3 weeks concurrently with a sharp decline in Math scores. High probability of academic failure this semester.
                    </p>
                    <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">
                      <span className="font-medium text-slate-900 dark:text-slate-200">Recommended Action:</span> Schedule a 1-on-1 parent meeting immediately and assign peer mentorship.
                    </p>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" className="text-indigo-600 hover:text-indigo-700">
                      Take Action <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>

                {/* Insight Item 2 */}
                <div className="p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <img src="https://ui-avatars.com/api/?name=Priya+Patel&background=random" className="w-10 h-10 rounded-full" alt="Priya" />
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Priya Patel</h4>
                        <p className="text-sm text-slate-500">Class 9B • ID: ST-1830</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400">Medium Risk</Badge>
                  </div>
                  <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg p-3 mt-3 shadow-sm">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">AI Analysis:</span> Behavior flags raised during recent assignments indicating mounting stress levels or disengagement from the current curriculum.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
