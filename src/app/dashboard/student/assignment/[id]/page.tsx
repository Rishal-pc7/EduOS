"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Upload, CheckCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AssignmentPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Assignment Submitted!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md text-center">
          Great job! Your assignment has been successfully uploaded to the faculty portal. Your teacher will grade it shortly.
        </p>
        <Link href="/dashboard/student">
          <Button className="bg-indigo-600 hover:bg-indigo-700">Return to Dashboard</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Link href="/dashboard/student">
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-500 -ml-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-indigo-500 text-white border-0 hover:bg-indigo-600">Mathematics</Badge>
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-900/20">Due Tomorrow</Badge>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Algebra Fundamentals</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Assigned by Mr. Sreekumar • 40 Total Marks</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300">
          <Clock className="w-4 h-4 text-slate-500" /> Time Remaining: 14h 22m
        </div>
      </div>

      <Card className="border-0 shadow-sm mt-8">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <CardTitle>Instructions</CardTitle>
          <CardDescription>Please read carefully before starting.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 prose dark:prose-invert prose-indigo max-w-none text-slate-700 dark:text-slate-300">
          <p>Please complete exercises 1 through 15 from Chapter 4 of your textbook. Focus primarily on:</p>
          <ul>
            <li>Solving linear equations with two variables.</li>
            <li>Graphing polynomials on the Cartesian plane.</li>
            <li>Factoring quadratic equations using the AC method.</li>
          </ul>
          <p>You must show <strong>all your working steps</strong> to receive full credit. Submit your work by uploading a scanned PDF of your notebook or by typing it in a document.</p>
        </CardContent>
      </Card>

      <Card className="border-2 border-dashed border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-slate-900/50 shadow-none">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 bg-white dark:bg-slate-950 rounded-full flex items-center justify-center shadow-sm mb-4 border border-slate-200 dark:border-slate-800">
            <Upload className="w-6 h-6 text-indigo-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Upload your submission</h3>
          <p className="text-sm text-slate-500 mt-1 mb-6 max-w-xs">Drag and drop your PDF or Word document here, or click to browse files.</p>
          
          <Button onClick={() => setIsSubmitted(true)} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto px-8 gap-2">
            <FileText className="w-4 h-4" /> Finalize & Submit Assignment
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
