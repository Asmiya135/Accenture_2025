"use client"
// Triggering new Vercel build
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { SidebarInset } from "@/components/ui/sidebar"
import { DrSahyogiButton } from "@/components/dr-sahyogi-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Calendar, Heart, Target, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function Home() {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <SidebarInset className="relative flex-1 w-full">
        <Header />
        <div className="w-full">
          <div className="py-6 px-4 md:px-6">
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
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Today's Goals
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
                    Health & Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">Monitor your vital signs and track your daily goals.</p>
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
                      <span className="text-base">Steps Today</span>
                      <span className="text-base font-medium">6,540 / 10,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base">Water Intake</span>
                      <span className="text-base font-medium">5 / 8 glasses</span>
                    </div>
                  </div>
                  <Link href="/health-goals">
                    <Button className="w-full text-lg mt-4 h-12">
                      View Health & Goals
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-secondary" />
                    Location & Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">Manage your appointments and find nearby hospitals.</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-md bg-muted p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Dr. Sharma - Regular Checkup</h3>
                        <p className="text-muted-foreground">Tomorrow, 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-md bg-muted p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                        <MapPin className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">City Hospital</h3>
                        <p className="text-muted-foreground">1.2 km away</p>
                      </div>
                    </div>
                  </div>
                  <Link href="/location-calendar">
                    <Button className="w-full text-lg mt-4 h-12" variant="outline">
                      View Location & Calendar
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <DrSahyogiButton />
      </SidebarInset>
    </div>
  )
}

