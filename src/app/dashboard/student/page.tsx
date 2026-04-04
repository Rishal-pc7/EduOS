"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Target, Check, Calendar, MessageCircle, Bot, Utensils, Send, Clock, User, Award, Activity } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function StudentDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, subject: "Mathematics", topic: "Algebra Fundamentals", due: "Tomorrow", teacher: "Mr. Sharma", status: "pending" },
    { id: 2, subject: "Physics", topic: "Lab Report 2", due: "In 2 days", teacher: "Ms. Gupta", status: "pending" },
  ]);

  const [canteenNeeded, setCanteenNeeded] = useState(true);
  
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', text: "Hello Rohan! I'm your AI Mentor. Do you need help with your upcoming Algebra assignment?" }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleCompleteTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: "completed" } : t));
  }

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    setAiMessages([...aiMessages, { role: 'user', text: aiInput }]);
    setAiInput("");
    setIsAiTyping(true);
    
    setTimeout(() => {
      setIsAiTyping(false);
      setAiMessages(prev => [...prev, { 
        role: 'ai', 
        text: "Great question! To solve polynomial equations, you'll want to first group like terms. Would you like me to walk you through an exact example from chapter 4?" 
      }]);
    }, 2000);
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Welcome back, Rohan</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here is your daily school performance and agenda.</p>
        </div>
      </div>

      {/* Top Metrics: Performance, Attendance, Canteen */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -mr-4 -mt-4 opacity-50 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <Progress value={94.5} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2 text-green-600 font-medium">On track (Min required: 75%)</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-bl-full -mr-4 -mt-4 opacity-50 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A- (88%)</div>
            <Progress value={88} className="mt-2 h-2 bg-slate-100 dark:bg-slate-800" />
            <p className="text-xs text-muted-foreground mt-2 text-emerald-600 font-medium">Top 15% of your class</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">School Canteen Meal</CardTitle>
            <Utensils className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-slate-500 mb-3">Do you require a canteen meal today?</p>
            <div className="flex gap-2 w-full">
              <Button 
                variant={canteenNeeded ? "default" : "outline"} 
                className={`flex-1 ${canteenNeeded ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}`}
                onClick={() => setCanteenNeeded(true)}
              >
                Yes, Needed
              </Button>
              <Button 
                variant={!canteenNeeded ? "default" : "outline"}
                className={`flex-1 ${!canteenNeeded ? 'bg-slate-800 text-white dark:bg-white dark:text-black' : ''}`}
                onClick={() => setCanteenNeeded(false)}
              >
                No
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column: Assignments & Teachers */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>Do your upcoming tasks directly in the portal.</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">Class 9B</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className={`flex flex-col xl:flex-row xl:items-center justify-between p-3 rounded-lg border bg-slate-50 dark:bg-slate-900/50 gap-3 transition-all ${task.status === 'completed' ? 'border-green-200 dark:border-green-900/50 opacity-70' : 'border-slate-100 dark:border-slate-800'}`}>
                    <div>
                      <p className={`font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 ${task.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
                        {task.subject}
                        {task.status === 'pending' && <Badge className="bg-orange-500 text-[10px] px-1.5 py-0">Due</Badge>}
                        {task.status === 'completed' && <Badge className="bg-green-500 text-[10px] px-1.5 py-0">Done</Badge>}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{task.topic}</p>
                    </div>
                    {task.status === 'completed' ? (
                      <Button size="sm" variant="outline" className="w-full xl:w-auto text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 h-8" disabled>
                        <Check className="w-3 h-3 mr-2" /> Completed
                      </Button>
                    ) : (
                      <Link href={`/dashboard/student/assignment/${task.id}`} className="w-full xl:w-auto">
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 w-full h-8 text-xs">
                          Start Now
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>Chat with Teachers</CardTitle>
              <CardDescription>Direct messaging with your subject faculty.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Mr. Sharma", sub: "Mathematics", available: true },
                  { name: "Ms. Gupta", sub: "Physics", available: false }
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
                        <User className="w-5 h-5 text-slate-500" />
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 ${t.available ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.sub}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="h-8 gap-2">
                      <MessageCircle className="w-3 h-3" /> Chat
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Timetable & AI Mentor */}
        <div className="space-y-6 flex flex-col">
          <Card className="border-0 shadow-sm flex-shrink-0">
            <CardHeader className="pb-3">
              <CardTitle>Today's Timetable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { time: "08:30 AM", subject: "Mathematics", status: "completed" },
                  { time: "09:30 AM", subject: "Physics", status: "current" },
                  { time: "10:30 AM", subject: "Computer Science", status: "upcoming" },
                ].map((period, i) => (
                  <div key={i} className={`flex items-center p-2.5 rounded-lg border ${period.status === 'current' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-800'}`}>
                    <div className={`w-20 flex-shrink-0 text-xs font-semibold ${period.status === 'current' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
                      {period.time}
                    </div>
                    <div className="flex-1 border-l pl-3 border-slate-200 dark:border-slate-700">
                      <p className={`text-sm font-semibold ${period.status === 'current' ? 'text-blue-900 dark:text-blue-100' : 'text-slate-900 dark:text-slate-100'}`}>{period.subject}</p>
                    </div>
                    {period.status === 'current' && (
                      <Badge className="bg-blue-600 text-[10px] ml-auto animate-pulse flex gap-1">On Now</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-md bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-slate-950 flex-1 flex flex-col min-h-[300px]">
            <CardHeader className="pb-3 border-b border-indigo-100/50 dark:border-indigo-900/50">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                <Bot className="w-5 h-5" />
                <CardTitle>AI Student Mentor</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4 gap-4 overflow-hidden relative">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {aiMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col max-w-[85%] ${msg.role === 'ai' ? 'items-start mr-auto' : 'items-end ml-auto'}`}>
                    <div className={`text-sm p-3 rounded-lg ${msg.role === 'ai' ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none' : 'bg-indigo-600 text-white rounded-tr-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="flex flex-col items-start mr-auto max-w-[85%]">
                    <div className="text-sm p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-none flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleAiSubmit} className="flex gap-2 mt-auto">
                <Input 
                  placeholder="Ask a question about your syllabus..." 
                  value={aiInput} 
                  onChange={(e) => setAiInput(e.target.value)}
                  className="bg-white dark:bg-slate-950 border-indigo-200 dark:border-indigo-800"
                />
                <Button type="submit" disabled={!aiInput.trim() || isAiTyping} className="bg-indigo-600 hover:bg-indigo-700 px-3 shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
