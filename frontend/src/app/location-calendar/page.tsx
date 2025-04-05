"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { SidebarInset } from "@/components/ui/sidebar"
import { DrSahyogiButton } from "@/components/dr-sahyogi-button"
import { MyLocation } from "@/components/my-location"
import { SetAlarms } from "@/components/set-alarms"
import { MyCalendar } from "@/components/my-calendar"
import { WeeklyReport } from "@/components/weekly-report"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Calendar, FileText } from "lucide-react"

export default function LocationCalendarPage() {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <SidebarInset className="relative flex-1 w-full">
        <Header pageName="Location & Calendar" />
        <div className="w-full px-4 md:px-6">
          <Tabs defaultValue="location" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="location" className="text-lg py-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  My Location
                </div>
              </TabsTrigger>
              <TabsTrigger value="alarms" className="text-lg py-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Set Alarms
                </div>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="text-lg py-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  My Calendar
                </div>
              </TabsTrigger>
              <TabsTrigger value="report" className="text-lg py-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Weekly Report
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="location" className="w-full">
              <MyLocation />
            </TabsContent>

            <TabsContent value="alarms" className="w-full">
              <SetAlarms />
            </TabsContent>

            <TabsContent value="calendar" className="w-full">
              <MyCalendar />
            </TabsContent>

            <TabsContent value="report" className="w-full">
              <WeeklyReport />
            </TabsContent>
          </Tabs>
        </div>
        <DrSahyogiButton />
      </SidebarInset>
    </div>
  )
}

