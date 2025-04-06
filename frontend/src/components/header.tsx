"use client"

import { Bell, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  pageName?: string
}

export function Header({ pageName = "Dashboard" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-3 border-b border-border bg-card px-4 md:px-6 shadow-sm">
      <SidebarTrigger className="md:hidden" />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-primary md:text-2xl hidden md:block">Elderly Care</h1>
          </div>
          <div className="hidden md:block h-8 w-px bg-border mx-2"></div>
          <h2 className="text-xl font-semibold">{pageName}</h2>
        </div>
        <div className="flex items-center gap-4">
        <Button
  variant="destructive"
  size="default"
  className="rounded-full font-bold transition-all hover:scale-105 shadow-md hover:shadow-lg animate-pulse-slow"
  onClick={async () => {
    try {
      const res = await fetch("http://localhost:5001/sos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ SOS Alert Sent: " + data.message);
      } else {
        alert("⚠️ Failed to send SOS: " + data.message);
      }
    } catch (error) {
      console.error("Error sending SOS:", error);
      alert("❌ Error sending SOS alert.");
    }
  }}
>
  SOS
</Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  3
                </span>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex items-start gap-2">
                    <div className="icon-circle-secondary h-8 w-8">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Reminder: Take blood pressure medication</p>
                      <p className="text-xs text-muted-foreground">10 minutes ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-primary text-white">RP</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ramesh Patel</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}