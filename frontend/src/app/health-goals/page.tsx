"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { SidebarInset } from "@/components/ui/sidebar"
import { DrSahyogiButton } from "@/components/dr-sahyogi-button"
import { HealthTracker } from "@/components/health-tracker"
import { GoalsTracker } from "@/components/goals-tracker"
import { MedicalDocuments } from "@/components/medical-documents"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, FileUp, Target } from "lucide-react"

export default function HealthGoalsPage() {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <SidebarInset className="relative flex-1 w-full">
        <Header pageName="Health & Goals" />
        <div className="w-full px-4 md:px-6">
          <Tabs defaultValue="health" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="health" className="text-lg py-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Health Tracker
                </div>
              </TabsTrigger>
              <TabsTrigger value="goals" className="text-lg py-3">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Goals Tracker
                </div>
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-lg py-3">
                <div className="flex items-center gap-2">
                  <FileUp className="h-5 w-5" />
                  Medical Documents
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="health" className="w-full">
              <HealthTracker />
            </TabsContent>

            <TabsContent value="goals" className="w-full">
              <GoalsTracker />
            </TabsContent>

            <TabsContent value="documents" className="w-full">
              <MedicalDocuments />
            </TabsContent>
          </Tabs>
        </div>
        <DrSahyogiButton />
      </SidebarInset>
    </div>
  )
}

