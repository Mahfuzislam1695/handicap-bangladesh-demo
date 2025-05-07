"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  Users,
  FileText,
  BookOpen,
  BarChart3,
  Settings,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Eye,
  UserPlus,
  FileUp,
  Server,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock user data - in a real app, this would come from authentication
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "super-admin", // Options: super-admin, admin, user
  avatar: "/placeholder.svg?height=40&width=40",
  organization: "Humanity & Inclusion",
}

export default function DashboardPage() {
  const [user, setUser] = useState(mockUser)
  const [timeRange, setTimeRange] = useState("7d")

  // Simulate fetching user data
  useEffect(() => {
    // In a real app, you would fetch the user data from an API
    setUser(mockUser)
  }, [])

  // Render dashboard based on user role
  const renderDashboard = (role) => {
    if (role === "super-admin") {
      return <SuperAdminDashboard timeRange={timeRange} setTimeRange={setTimeRange} />
    } else if (role === "admin") {
      return <AdminDashboard timeRange={timeRange} setTimeRange={setTimeRange} />
    } else {
      return <UserDashboard timeRange={timeRange} setTimeRange={setTimeRange} />
    }
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}. Here's what's happening with your platform.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Report</Button>
        </div>
      </div>

      {renderDashboard(user.role)}
    </div>
  )
}

// Super Admin Dashboard Component
function SuperAdminDashboard({ timeRange, setTimeRange }) {
  return (
    <div className="space-y-8">
      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value="1,234"
          change="+12%"
          trend="up"
          description="vs. previous period"
          icon={<Users className="h-5 w-5" />}
          color="blue"
        />
        <MetricCard
          title="Resources Uploaded"
          value="245"
          change="+8%"
          trend="up"
          description="vs. previous period"
          icon={<FileText className="h-5 w-5" />}
          color="teal"
        />
        <MetricCard
          title="Training Completions"
          value="567"
          change="-3%"
          trend="down"
          description="vs. previous period"
          icon={<BookOpen className="h-5 w-5" />}
          color="purple"
        />
        <MetricCard
          title="System Uptime"
          value="99.9%"
          change="+0.2%"
          trend="up"
          description="vs. previous period"
          icon={<Server className="h-5 w-5" />}
          color="orange"
        />
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Recent Activity */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-full bg-inclusion-blue/10 flex items-center justify-center shrink-0">
                        {i % 3 === 0 ? (
                          <UserPlus className="h-4 w-4 text-inclusion-blue" />
                        ) : i % 3 === 1 ? (
                          <FileUp className="h-4 w-4 text-inclusion-teal" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-inclusion-purple" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">
                            {i % 3 === 0
                              ? "New user registered"
                              : i % 3 === 1
                                ? "New resource uploaded"
                                : "Training module completed"}
                          </p>
                          <span className="text-xs text-muted-foreground">{i * 2}h ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {i % 3 === 0
                            ? `User ${i} (user${i}@example.com) registered and completed profile setup.`
                            : i % 3 === 1
                              ? `Admin uploaded "Resource Title ${i}" to the platform.`
                              : `User completed "Training Module ${i}" with a score of ${85 + i}%.`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New User
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload Resource
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create Training Module
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Send Notification
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current platform health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>API Services</span>
                    </div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Database</span>
                    </div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Storage</span>
                    </div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Search Index</span>
                    </div>
                    <span className="text-sm font-medium">Degraded</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Authentication</span>
                    </div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  View Security Logs
                </Button>
              </CardFooter>
            </Card>

            {/* Top Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Top Resources</CardTitle>
                <CardDescription>Most downloaded materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-inclusion-blue/10 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-inclusion-blue" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Resource Title {i}</p>
                          <p className="text-xs text-muted-foreground">PDF Document</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-xs">{300 - i * 30}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-xs">{500 - i * 40}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Resources
                </Button>
              </CardFooter>
            </Card>

            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Newly registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-inclusion-purple/10 flex items-center justify-center">
                          <Users className="h-4 w-4 text-inclusion-purple" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">User Name {i}</p>
                          <p className="text-xs text-muted-foreground">user{i}@example.com</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{i}d ago</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Users
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage platform users and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <p>User management content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage resources and training modules</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content management interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure platform settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p>System settings and configuration options will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Admin Dashboard Component
function AdminDashboard({ timeRange, setTimeRange }) {
  return (
    <div className="space-y-8">
      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Organization Users"
          value="87"
          change="+5%"
          trend="up"
          description="vs. previous period"
          icon={<Users className="h-5 w-5" />}
          color="blue"
        />
        <MetricCard
          title="Resources Uploaded"
          value="42"
          change="+12%"
          trend="up"
          description="vs. previous period"
          icon={<FileText className="h-5 w-5" />}
          color="teal"
        />
        <MetricCard
          title="Training Completions"
          value="156"
          change="+8%"
          trend="up"
          description="vs. previous period"
          icon={<BookOpen className="h-5 w-5" />}
          color="purple"
        />
        <MetricCard
          title="Avg. Completion Rate"
          value="78%"
          change="+2%"
          trend="up"
          description="vs. previous period"
          icon={<BarChart3 className="h-5 w-5" />}
          color="orange"
        />
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Recent Activity */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Organization Activity</CardTitle>
                <CardDescription>Recent activity in your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-full bg-inclusion-blue/10 flex items-center justify-center shrink-0">
                        {i % 3 === 0 ? (
                          <UserPlus className="h-4 w-4 text-inclusion-blue" />
                        ) : i % 3 === 1 ? (
                          <FileUp className="h-4 w-4 text-inclusion-teal" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-inclusion-purple" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">
                            {i % 3 === 0
                              ? "User completed training"
                              : i % 3 === 1
                                ? "Resource accessed"
                                : "Training module updated"}
                          </p>
                          <span className="text-xs text-muted-foreground">{i}h ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {i % 3 === 0
                            ? `User ${i} completed "Training Module ${i}" with a score of ${85 + i}%.`
                            : i % 3 === 1
                              ? `User accessed "Resource Title ${i}" and downloaded it.`
                              : `Admin updated content in "Training Module ${i}".`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload Resource
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create Training
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Send Notification
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Management</CardTitle>
              <CardDescription>Upload and manage organization resources</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Resource management interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Progress</CardTitle>
              <CardDescription>Track training completion for your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Training progress tracking interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Reports</CardTitle>
              <CardDescription>View and generate organization-specific reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Reporting interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// User Dashboard Component
function UserDashboard({ timeRange, setTimeRange }) {
  return (
    <div className="space-y-8">
      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Completed Trainings"
          value="5"
          change="+2"
          trend="up"
          description="since last login"
          icon={<BookOpen className="h-5 w-5" />}
          color="purple"
        />
        <MetricCard
          title="Resources Accessed"
          value="12"
          change="+4"
          trend="up"
          description="since last login"
          icon={<FileText className="h-5 w-5" />}
          color="teal"
        />
        <MetricCard
          title="Certificates Earned"
          value="3"
          change="+1"
          trend="up"
          description="since last login"
          icon={<FileText className="h-5 w-5" />}
          color="blue"
        />
        <MetricCard
          title="Learning Progress"
          value="68%"
          change="+5%"
          trend="up"
          description="since last login"
          icon={<BarChart3 className="h-5 w-5" />}
          color="orange"
        />
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="learning">My Learning</TabsTrigger>
          <TabsTrigger value="resources">My Resources</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Learning Path */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>My Learning Path</CardTitle>
                <CardDescription>Your personalized learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-full bg-inclusion-purple/10 flex items-center justify-center shrink-0">
                        <BookOpen className="h-4 w-4 text-inclusion-purple" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">Training Module {i}</p>
                          <span className="text-xs text-muted-foreground">
                            {i === 1 ? "Completed" : i === 2 ? "In Progress" : "Not Started"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {i === 1
                            ? "You've completed this module with a score of 92%."
                            : i === 2
                              ? "You're 45% through this module."
                              : "This module is part of your learning path."}
                        </p>
                        <div className="w-full bg-muted rounded-full h-2 mt-2">
                          <div
                            className="bg-inclusion-purple h-2 rounded-full"
                            style={{
                              width: i === 1 ? "100%" : i === 2 ? "45%" : "0%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Full Learning Path
                </Button>
              </CardFooter>
            </Card>

            {/* Recently Accessed */}
            <Card>
              <CardHeader>
                <CardTitle>Recently Accessed</CardTitle>
                <CardDescription>Materials you've recently viewed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-inclusion-teal/10 flex items-center justify-center">
                        {i % 2 === 0 ? (
                          <FileText className="h-4 w-4 text-inclusion-teal" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-inclusion-purple" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{i % 2 === 0 ? `Resource ${i}` : `Training Module ${i}`}</p>
                        <p className="text-xs text-muted-foreground">{i * 2}h ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Resources
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Training modules due soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-inclusion-orange/10 flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-inclusion-orange" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Training Module {i + 5}</p>
                          <p className="text-xs text-muted-foreground">Required for certification</p>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-inclusion-red">Due in {i * 3} days</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Deadlines
                </Button>
              </CardFooter>
            </Card>

            {/* Recommended Resources */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Recommended Resources</CardTitle>
                <CardDescription>Based on your learning path and interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-inclusion-blue/10 flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-inclusion-blue" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Recommended Resource {i}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          This resource is recommended based on your interest in disability inclusion in
                          {i === 1
                            ? " education"
                            : i === 2
                              ? " healthcare"
                              : i === 3
                                ? " employment"
                                : " community services"}
                          .
                        </p>
                        <Button variant="link" className="h-auto p-0 text-xs text-inclusion-blue">
                          View Resource
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Recommendations
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Learning</CardTitle>
              <CardDescription>Track your progress through training modules</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Learning progress tracking interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Resources</CardTitle>
              <CardDescription>Resources you've saved or accessed</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Saved resources interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Certificates</CardTitle>
              <CardDescription>Certificates you've earned through training</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Certificates interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Metric Card Component
function MetricCard({ title, value, change, trend, description, icon, color }) {
  const colorClasses = {
    blue: "text-inclusion-blue",
    teal: "text-inclusion-teal",
    purple: "text-inclusion-purple",
    orange: "text-inclusion-orange",
    red: "text-inclusion-red",
    green: "text-inclusion-green",
  }

  const bgColorClasses = {
    blue: "bg-inclusion-blue/10",
    teal: "bg-inclusion-teal/10",
    purple: "bg-inclusion-purple/10",
    orange: "bg-inclusion-orange/10",
    red: "bg-inclusion-red/10",
    green: "bg-inclusion-green/10",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`w-8 h-8 rounded-full ${bgColorClasses[color]} flex items-center justify-center`}>
          {React.cloneElement(icon, { className: `h-4 w-4 ${colorClasses[color]}` })}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs">
          {trend === "up" ? (
            <ArrowUpRight className="mr-1 h-3 w-3 text-inclusion-green" />
          ) : (
            <ArrowDownRight className="mr-1 h-3 w-3 text-inclusion-red" />
          )}
          <span className={trend === "up" ? "text-inclusion-green" : "text-inclusion-red"}>{change}</span>
          <span className="text-muted-foreground ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}
