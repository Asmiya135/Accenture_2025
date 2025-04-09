"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Calendar, FileText, Heart, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export function Dashboard() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, Ramesh</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-card shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">72</div>
              <div className="text-lg text-muted-foreground">BPM</div>
            </div>
            <div className="text-sm text-green-500 mt-2">Normal</div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Blood Pressure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">120/80</div>
              <div className="text-lg text-muted-foreground">mmHg</div>
            </div>
            <div className="text-sm text-green-500 mt-2">Normal</div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="h-5 w-5 text-secondary" />
              Today&apos;s Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-4xl font-bold">75%</div>
              <div className="text-lg text-muted-foreground">Complete</div>
            </div>
            <Progress value={75} className="h-2 bg-muted" />
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Next Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Dr. Sharma</div>
            <div className="text-muted-foreground">Tomorrow, 10:00 AM</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Health Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">Monitor your vital signs and health metrics in real-time.</p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base">Heart Rate</span>
                <span className="text-base font-medium">72 BPM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base">Blood Pressure</span>
                <span className="text-base font-medium">120/80 mmHg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base">Glucose Level</span>
                <span className="text-base font-medium">110 mg/dL</span>
              </div>
            </div>
            <Link href="/health">
              <Button className="w-full text-lg mt-4 h-12">
                View Health Details
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="h-6 w-6 text-secondary" />
              Weekly Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">Your health summary for this week.</p>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-base font-medium">Overall Health</span>
                  <span className="text-base font-medium">85%</span>
                </div>
                <Progress value={85} className="h-3 bg-muted" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-base font-medium">Medication Adherence</span>
                  <span className="text-base font-medium">92%</span>
                </div>
                <Progress value={92} className="h-3 bg-muted" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-base font-medium">Activity Goals</span>
                  <span className="text-base font-medium">78%</span>
                </div>
                <Progress value={78} className="h-3 bg-muted" />
              </div>
            </div>
            <Button className="w-full text-lg mt-4 h-12" variant="outline">
              View Full Report
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Calendar className="h-6 w-6 text-purple-500" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Dr. Sharma - Regular Checkup</h3>
                <p className="text-lg text-muted-foreground">Tomorrow, 10:00 AM</p>
                <p className="text-base mt-1">City Hospital, 123 Main St</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Dr. Patel - Eye Examination</h3>
                <p className="text-lg text-muted-foreground">April 15, 2:30 PM</p>
                <p className="text-base mt-1">Apollo Medical Center, 456 Park Ave</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

