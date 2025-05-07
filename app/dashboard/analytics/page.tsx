"use client"

import { useState } from "react"
import {
  BarChart3,
  Download,
  Calendar,
  ChevronDown,
  RefreshCw,
  Printer,
  FileSpreadsheet,
  FileIcon,
  Users,
  BookOpen,
  Award,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  Cell,
} from "recharts"

// Mock analytics data
const overviewData = [
  { month: "Jan", users: 420, enrollments: 780, completions: 320, resources: 1200 },
  { month: "Feb", users: 450, enrollments: 820, completions: 350, resources: 1300 },
  { month: "Mar", users: 480, enrollments: 880, completions: 390, resources: 1450 },
  { month: "Apr", users: 520, enrollments: 950, completions: 420, resources: 1600 },
  { month: "May", users: 550, enrollments: 1020, completions: 460, resources: 1750 },
  { month: "Jun", users: 590, enrollments: 1100, completions: 510, resources: 1900 },
  { month: "Jul", users: 620, enrollments: 1180, completions: 550, resources: 2050 },
  { month: "Aug", users: 650, enrollments: 1220, completions: 580, resources: 2200 },
  { month: "Sep", users: 680, enrollments: 1280, completions: 610, resources: 2350 },
  { month: "Oct", users: 710, enrollments: 1340, completions: 640, resources: 2500 },
  { month: "Nov", users: 740, enrollments: 1400, completions: 670, resources: 2650 },
  { month: "Dec", users: 780, enrollments: 1480, completions: 710, resources: 2800 },
]

const usersByRegion = [
  { name: "Africa", value: 35 },
  { name: "Asia", value: 25 },
  { name: "Europe", value: 20 },
  { name: "North America", value: 15 },
  { name: "South America", value: 5 },
]

const courseCompletionData = [
  { name: "Introduction to Disability Inclusion", completion: 76 },
  { name: "Inclusive WASH Programming", completion: 72 },
  { name: "Disability Data Collection", completion: 67 },
  { name: "Inclusive Education in Emergencies", completion: 63 },
  { name: "Disability-Inclusive Shelter Design", completion: 66 },
]

const resourceDownloadData = [
  { name: "Disability Inclusion in WASH Programs", downloads: 245 },
  { name: "Inclusive Education Training Manual", downloads: 187 },
  { name: "Disability Data Collection Methods", downloads: 312 },
  { name: "Accessible Shelter Design", downloads: 156 },
  { name: "Disability Awareness Audio Guide", downloads: 98 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("last-30-days")

  // Get date range label
  const getDateRangeLabel = () => {
    switch (dateRange) {
      case "last-7-days":
        return "Last 7 Days"
      case "last-30-days":
        return "Last 30 Days"
      case "last-90-days":
        return "Last 90 Days"
      case "year-to-date":
        return "Year to Date"
      case "all-time":
        return "All Time"
      default:
        return "Custom Range"
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-inclusion-blue" />
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights for the Disability Inclusion Hub.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {getDateRangeLabel()}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-2">
                <h3 className="font-medium">Select Date Range</h3>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setDateRange("last-7-days")}>
                    Last 7 Days
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setDateRange("last-30-days")}>
                    Last 30 Days
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setDateRange("last-90-days")}>
                    Last 90 Days
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setDateRange("year-to-date")}>
                    Year to Date
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setDateRange("all-time")}>
                    All Time
                  </Button>
                </div>
                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium mb-2">Custom Range</h4>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="from" className="sr-only">
                          From
                        </Label>
                        <Input id="from" type="date" placeholder="From" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="to" className="sr-only">
                          To
                        </Label>
                        <Input id="to" type="date" placeholder="To" className="h-8" />
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      Apply Custom Range
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <FileIcon className="mr-2 h-4 w-4" />
                Export to PDF
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <Printer className="mr-2 h-4 w-4" />
                Print Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">780</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Course Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,480</div>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">+8% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">710</div>
              <Award className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">+15% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resource Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2,800</div>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">+23% from last period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>
                Monthly growth in users, enrollments, completions, and resource downloads.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    users: {
                      label: "Users",
                      color: "hsl(var(--chart-1))",
                    },
                    enrollments: {
                      label: "Enrollments",
                      color: "hsl(var(--chart-2))",
                    },
                    completions: {
                      label: "Completions",
                      color: "hsl(var(--chart-3))",
                    },
                    resources: {
                      label: "Resource Downloads",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={overviewData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
                      <Line type="monotone" dataKey="enrollments" stroke="var(--color-enrollments)" strokeWidth={2} />
                      <Line type="monotone" dataKey="completions" stroke="var(--color-completions)" strokeWidth={2} />
                      <Line type="monotone" dataKey="resources" stroke="var(--color-resources)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Users by Region</CardTitle>
                <CardDescription>Distribution of users across different regions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usersByRegion} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8">
                        {usersByRegion.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>The most recent user activities across the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Jane Smith", org: "Save the Children", activity: "Completed course", time: "2h ago" },
                    { user: "Michael Chen", org: "UNICEF", activity: "Downloaded resource", time: "3h ago" },
                    { user: "Emily Davis", org: "World Vision", activity: "Enrolled in course", time: "5h ago" },
                    { user: "Robert Johnson", org: "UNHCR", activity: "Earned certificate", time: "1d ago" },
                    { user: "John Doe", org: "Humanity & Inclusion", activity: "Viewed resource", time: "1d ago" },
                  ].map((activity, i) => (
                    <div key={i} className="flex justify-between items-start border-b pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-muted-foreground">{activity.org}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{activity.activity}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly growth in user registrations and active users.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    newUsers: {
                      label: "New Users",
                      color: "hsl(var(--chart-1))",
                    },
                    activeUsers: {
                      label: "Active Users",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={overviewData.map((d) => ({
                        month: d.month,
                        newUsers: Math.round(d.users * 0.2),
                        activeUsers: Math.round(d.users * 0.8),
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="newUsers" stroke="var(--color-newUsers)" strokeWidth={2} />
                      <Line type="monotone" dataKey="activeUsers" stroke="var(--color-activeUsers)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>User activity and engagement metrics.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Average Session Duration</h3>
                    <div className="flex justify-between items-center">
                      <span>12 minutes</span>
                      <span className="text-green-500 text-sm">+8% from last period</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Average Courses per User</h3>
                    <div className="flex justify-between items-center">
                      <span>2.8 courses</span>
                      <span className="text-green-500 text-sm">+12% from last period</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Completion Rate</h3>
                    <div className="flex justify-between items-center">
                      <span>68%</span>
                      <span className="text-green-500 text-sm">+5% from last period</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Distribution of users by organization type.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "NGOs", value: 45 },
                        { name: "Government", value: 25 },
                        { name: "UN Agencies", value: 15 },
                        { name: "Academic", value: 10 },
                        { name: "Other", value: 5 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8">
                        {usersByRegion.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Completion Rates</CardTitle>
              <CardDescription>Percentage of users who complete each course after enrollment.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseCompletionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="completion" fill="#8884d8">
                      {courseCompletionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Enrollments</CardTitle>
                <CardDescription>Monthly course enrollments by course category.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      inclusion: {
                        label: "Inclusion Basics",
                        color: "hsl(var(--chart-1))",
                      },
                      technical: {
                        label: "Technical Skills",
                        color: "hsl(var(--chart-2))",
                      },
                      management: {
                        label: "Management",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Jan", inclusion: 300, technical: 200, management: 100 },
                          { month: "Feb", inclusion: 320, technical: 220, management: 110 },
                          { month: "Mar", inclusion: 340, technical: 240, management: 120 },
                          { month: "Apr", inclusion: 360, technical: 260, management: 130 },
                          { month: "May", inclusion: 380, technical: 280, management: 140 },
                          { month: "Jun", inclusion: 400, technical: 300, management: 150 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="inclusion" stroke="var(--color-inclusion)" strokeWidth={2} />
                        <Line type="monotone" dataKey="technical" stroke="var(--color-technical)" strokeWidth={2} />
                        <Line type="monotone" dataKey="management" stroke="var(--color-management)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Performance</CardTitle>
                <CardDescription>Average assessment scores by course.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseCompletionData.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{course.name}</span>
                        <span className="text-sm">{Math.round(70 + Math.random() * 15)}%</span>
                      </div>
                      <Progress value={70 + Math.random() * 15} className="h-2" />
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Passing score: 70%</span>
                        <span>{course.completion}% completion rate</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Downloads</CardTitle>
              <CardDescription>Top downloaded resources on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resourceDownloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="downloads" fill="#8884d8">
                      {resourceDownloadData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resources by Type</CardTitle>
                <CardDescription>Distribution of resources by file type.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "PDF", value: 45 },
                        { name: "Video", value: 25 },
                        { name: "Audio", value: 15 },
                        { name: "Word", value: 10 },
                        { name: "Other", value: 5 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8">
                        {usersByRegion.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
                <CardDescription>Monthly resource views and downloads.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      views: {
                        label: "Views",
                        color: "hsl(var(--chart-1))",
                      },
                      downloads: {
                        label: "Downloads",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Jan", views: 1200, downloads: 600 },
                          { month: "Feb", views: 1300, downloads: 650 },
                          { month: "Mar", views: 1450, downloads: 725 },
                          { month: "Apr", views: 1600, downloads: 800 },
                          { month: "May", views: 1750, downloads: 875 },
                          { month: "Jun", views: 1900, downloads: 950 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} />
                        <Line type="monotone" dataKey="downloads" stroke="var(--color-downloads)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between">
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  )
}
