"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Shield,
  Home,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { AccessibilityControls } from "@/components/accessibility-controls"

// Mock user data - in a real app, this would come from authentication
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "super-admin", // Options: super-admin, admin, user
  avatar: "/placeholder.svg?height=40&width=40",
  organization: "Humanity & Inclusion",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(mockUser)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [selectedRole, setSelectedRole] = useState(user.role)

  // Simulate fetching user data
  useEffect(() => {
    // In a real app, you would fetch the user data from an API
    setUser(mockUser)
  }, [])

  // Update user when role changes
  useEffect(() => {
    setUser({
      ...user,
      role: selectedRole,
    })
  }, [selectedRole])

  // Get navigation items based on user role
  const getNavItems = (role) => {
    const commonItems = [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ]

    if (role === "super-admin") {
      return [
        ...commonItems,
        {
          name: "User Management",
          href: "/dashboard/users",
          icon: Users,
        },
        {
          name: "Content Management",
          href: "/dashboard/content",
          icon: FileText,
        },
        {
          name: "Training Management",
          href: "/dashboard/training",
          icon: BookOpen,
        },
        {
          name: "Analytics",
          href: "/dashboard/analytics",
          icon: BarChart3,
        },
        {
          name: "System Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
        {
          name: "Notifications",
          href: "/dashboard/notifications",
          icon: Bell,
          badge: "12",
        },
      ]
    } else if (role === "admin") {
      return [
        ...commonItems,
        {
          name: "Content Management",
          href: "/dashboard/content",
          icon: FileText,
        },
        {
          name: "Training Progress",
          href: "/dashboard/training-progress",
          icon: BookOpen,
        },
        {
          name: "Organization Reports",
          href: "/dashboard/reports",
          icon: BarChart3,
        },
        {
          name: "Organization Profile",
          href: "/dashboard/organization",
          icon: Settings,
        },
        {
          name: "Notifications",
          href: "/dashboard/notifications",
          icon: Bell,
          badge: "5",
        },
      ]
    } else {
      // Regular user
      return [
        ...commonItems,
        {
          name: "My Learning Path",
          href: "/dashboard/learning-path",
          icon: BookOpen,
        },
        {
          name: "My Resources",
          href: "/dashboard/resources",
          icon: FileText,
        },
        {
          name: "Certificates",
          href: "/dashboard/certificates",
          icon: FileText,
        },
        {
          name: "Support",
          href: "/dashboard/support",
          icon: Bell,
        },
      ]
    }
  }

  const navItems = getNavItems(user.role)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* Accessibility Controls */}
      <AccessibilityControls />

      {/* Dashboard Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Humanity & Inclusion Logo"
                width={40}
                height={40}
                className="rounded"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight">Disability Inclusion Hub</span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-inclusion-orange text-white">
                    {user.role === "super-admin" ? "12" : user.role === "admin" ? "5" : "2"}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-auto">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <DropdownMenuItem key={i} className="cursor-pointer p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Notification Title {i}</span>
                          <span className="text-xs text-muted-foreground">2h ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This is a notification message that provides some information about an event or action.
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer justify-center">
                  <Link href="/dashboard/notifications" className="w-full text-center">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 flex items-center gap-2" aria-label="User menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{user.role.replace("-", " ")}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                {user.role === "super-admin" && (
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Home className="mr-2 h-4 w-4" />
                  <Link href="/">Back to Website</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2">
                  <span className="capitalize mr-2">{selectedRole.replace("-", " ")}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Switch Role View</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedRole("super-admin")}>Super Admin</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedRole("admin")}>Admin</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedRole("user")}>General User</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <SidebarProvider>
          <Sidebar className="hidden md:flex">
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      className="justify-start"
                      tooltip={item.name}
                    >
                      <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                        {item.badge && <Badge className="ml-auto bg-inclusion-orange text-white">{item.badge}</Badge>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="justify-start text-destructive hover:text-destructive">
                    <Link href="/auth" className="flex items-center gap-2">
                      <LogOut className="h-5 w-5" />
                      <span>Log out</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
              <div className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background p-6 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Humanity & Inclusion Logo"
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <span className="text-lg font-bold">Dashboard</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 text-sm font-medium ${
                        pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                      {item.badge && <Badge className="ml-auto bg-inclusion-orange text-white">{item.badge}</Badge>}
                    </Link>
                  ))}
                  <div className="border-t pt-6 mt-6">
                    <Link
                      href="/auth"
                      className="flex items-center gap-3 text-sm font-medium text-destructive"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Log out</span>
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          )}

          <main id="main-content" className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarProvider>
      </div>
    </div>
  )
}
