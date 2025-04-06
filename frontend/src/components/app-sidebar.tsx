"use client"

import { Activity, Heart, Home, MapPin } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Health & Goals",
      icon: Activity,
      href: "/health-goals",
    },
    {
      title: "Location & Calendar",
      icon: MapPin,
      href: "/location-calendar",
    },
  ]

  return (
    <Sidebar className="shrink-0 w-[var(--sidebar-width)]" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center p-4 bg-gradient-to-r from-primary to-primary/80">
        <div className="flex items-center gap-3 px-2 py-1 rounded-lg bg-white/10 backdrop-blur-sm shadow-inner">
          <div className="relative">
            <Heart className="h-8 w-8 text-white animate-pulse-slow" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Elderly <span className="text-secondary-foreground">Care</span>
            </h1>
            <div className="h-0.5 w-full bg-gradient-to-r from-white/80 to-transparent rounded-full"></div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-card">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
                className="text-base py-3"
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span className="text-lg">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t bg-card">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-primary text-white text-lg">RP</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-medium">Ramesh Patel</p>
            <p className="text-sm text-muted-foreground">View Profile</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}