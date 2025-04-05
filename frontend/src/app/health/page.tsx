"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { SidebarInset } from "@/components/ui/sidebar"
import { HealthTracker } from "@/components/health-tracker"
import { DrSahyogiButton } from "@/components/dr-sahyogi-button"

export default function HealthPage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <SidebarInset className="relative">
        <Header pageName="Health Tracker" />
        <div className="dashboard-container">
          <HealthTracker />
        </div>
        <DrSahyogiButton />
      </SidebarInset>
    </div>
  )
}

