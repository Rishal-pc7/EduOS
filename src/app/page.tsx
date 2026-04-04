import Link from "next/link"
import { School, User, LogIn, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[100px]" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-primary/10 p-3 rounded-full mb-2">
            <School className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">EduOS</h1>
          <p className="text-slate-500 dark:text-slate-400">The intelligent school management platform</p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <Tabs defaultValue="teacher" className="w-full">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-semibold text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">Select your role to access the dashboard</CardDescription>
              <TabsList className="grid w-full grid-cols-4 mt-4 text-xs h-10">
                <TabsTrigger value="student" className="text-xs">Student</TabsTrigger>
                <TabsTrigger value="teacher" className="text-xs">Teacher</TabsTrigger>
                <TabsTrigger value="admin" className="text-xs">Admin</TabsTrigger>
                <TabsTrigger value="principal" className="text-xs">Principal</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="space-y-4">
              <TabsContent value="student" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="email-s">Email / Username</Label>
                  <Input id="email-s" type="text" placeholder="aryan.sharma@eduos.ai" defaultValue="aryan.sharma@eduos.ai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-s">Password</Label>
                  <Input id="password-s" type="password" defaultValue="pass1234" />
                </div>
              </TabsContent>
              <TabsContent value="teacher" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="email-t">Email</Label>
                  <Input id="email-t" type="email" placeholder="john.smith@eduos.ai" defaultValue="john.smith@eduos.ai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-t">Password</Label>
                  <Input id="password-t" type="password" defaultValue="pass1234" />
                </div>
              </TabsContent>
              <TabsContent value="admin" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="email-a">Email</Label>
                  <Input id="email-a" type="email" placeholder="admin.desk@eduos.ai" defaultValue="admin.desk@eduos.ai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-a">Password</Label>
                  <Input id="password-a" type="password" defaultValue="pass1234" />
                </div>
              </TabsContent>
              <TabsContent value="principal" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="email-p">Email</Label>
                  <Input id="email-p" type="email" placeholder="principal.patel@eduos.ai" defaultValue="principal.patel@eduos.ai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-p">Password</Label>
                  <Input id="password-p" type="password" defaultValue="pass1234" />
                </div>
              </TabsContent>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <TabsContent value="student" className="w-full m-0">
                <Link href="/dashboard/student" className="w-full block">
                  <Button className="w-full group bg-blue-600 hover:bg-blue-700">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In as Student
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
              </TabsContent>
              <TabsContent value="teacher" className="w-full m-0">
                <Link href="/dashboard/teacher" className="w-full block">
                  <Button className="w-full group">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In as Teacher
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
              </TabsContent>
              <TabsContent value="admin" className="w-full m-0">
                <Link href="/dashboard/admin" className="w-full block">
                  <Button variant="secondary" className="w-full group">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In as Admin
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
              </TabsContent>
              <TabsContent value="principal" className="w-full m-0">
                <Link href="/dashboard/principal" className="w-full block">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 group">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In as Principal
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
              </TabsContent>
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
