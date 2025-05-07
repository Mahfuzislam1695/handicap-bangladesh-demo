"use client"

import { useState } from "react"
import {
  BarChart3,
  Download,
  Filter,
  Calendar,
  Users,
  FileText,
  BookOpen,
  Award,
  ChevronDown,
  RefreshCw,
  Printer,
  FileSpreadsheet,
  FileIcon as FilePdf,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock report data
const trainingData = [
  {
    id: 1,
    title: "Introduction to Disability Inclusion",
    enrollments: 245,
    completions: 187,
    completionRate: 76,
    averageScore: 85,
    certificatesIssued: 187,
  },
  {
    id: 2,
    title: "Inclusive WASH Programming",
    enrollments: 198,
    completions: 142,
    completionRate: 72,
    averageScore: 82,
    certificatesIssued: 142,
  },
  {
    id: 3,
    title: "Disability Data Collection",
    enrollments: 176,
    completions: 118,
    completionRate: 67,
    averageScore: 79,
    certificatesIssued: 118,
  },
  {
    id: 4,
    title: "Inclusive Education in Emergencies",
    enrollments: 156,
    completions: 98,
    completionRate: 63,
    averageScore: 81,
    certificatesIssued: 98,
  },
  {
    id: 5,
    title: "Disability-Inclusive Shelter Design",
    enrollments: 132,
    completions: 87,
    completionRate: 66,
    averageScore: 84,
    certificatesIssued: 87,
  },
]

const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    organization: "Humanity & Inclusion",
    coursesEnrolled: 5,
    coursesCompleted: 3,
    certificatesEarned: 3,
    lastActive: "2024-03-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    organization: "Save the Children",
    coursesEnrolled: 4,
    coursesCompleted: 4,
    certificatesEarned: 4,
    lastActive: "2024-03-10",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    organization: "UNHCR",
    coursesEnrolled: 3,
    coursesCompleted: 2,
    certificatesEarned: 2,
    lastActive: "2024-03-05",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    organization: "World Vision",
    coursesEnrolled: 6,
    coursesCompleted: 5,
    certificatesEarned: 5,
    lastActive: "2024-03-12",
  },
  {
    id: 5,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    organization: "UNICEF",
    coursesEnrolled: 4,
    coursesCompleted: 3,
    certificatesEarned: 3,
    lastActive: "2024-03-08",
  },
]

const resourceData = [
  {
    id: 1,
    title: "Disability Inclusion in WASH Programs",
    type: "pdf",
    category: "guidelines",
    downloads: 245,
    views: 412,
    lastUpdated: "2024-02-15",
  },
  {
    id: 2,
    title: "Inclusive Education Training Manual",
    type: "word",
    category: "training",
    downloads: 187,
    views: 356,
    lastUpdated: "2024-01-20",
  },
  {
    id: 3,
    title: "Disability Data Collection Methods",
    type: "video",
    category: "training",
    downloads: 312,
    views: 578,
    lastUpdated: "2024-03-05",
  },
  {
    id: 4,
    title: "Accessible Shelter Design",
    type: "pdf",
    category: "guidelines",
    downloads: 156,
    views: 289,
    lastUpdated: "2023-12-10",
  },
  {
    id: 5,
    title: "Disability Awareness Audio Guide",
    type: "audio",
    category: "training",
    downloads: 98,
    views: 203,
    lastUpdated: "2024-02-28",
  },
]

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState("last-30-days")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOrganizations, setSelectedOrganizations] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

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
            Reports
          </h1>
          <p className="text-muted-foreground">View and download reports on training, users, and resources.</p>
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
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
            Filters
          </Button>
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
                <FilePdf className="mr-2 h-4 w-4" />
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

      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle>Report Filters</CardTitle>
            <CardDescription>Filter the report data by organization, category, and other criteria.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label>Organizations</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-2">
                  {["Humanity & Inclusion", "Save the Children", "UNHCR", "UNICEF", "World Vision"].map((org) => (
                    <div key={org} className="flex items-center space-x-2">
                      <Checkbox
                        id={`org-${org}`}
                        checked={selectedOrganizations.includes(org)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedOrganizations([...selectedOrganizations, org])
                          } else {
                            setSelectedOrganizations(selectedOrganizations.filter((o) => o !== org))
                          }
                        }}
                      />
                      <Label htmlFor={`org-${org}`} className="text-sm cursor-pointer">
                        {org}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Categories</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-2">
                  {["guidelines", "training", "research", "tools", "iec"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category])
                          } else {
                            setSelectedCategories(selectedCategories.filter((c) => c !== category))
                          }
                        }}
                      />
                      <Label htmlFor={`cat-${category}`} className="text-sm cursor-pointer capitalize">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Other Filters</Label>
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="not-started">Not Started</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2">
                      Reset Filters
                    </Button>
                    <Button size="sm">Apply Filters</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">632</div>
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
                  <div className="text-2xl font-bold">1,245</div>
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
                  <div className="text-2xl font-bold">876</div>
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
                  <div className="text-2xl font-bold">3,421</div>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">+23% from last period</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Courses by Enrollment</CardTitle>
                <CardDescription>The most popular courses based on enrollment numbers.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingData.slice(0, 3).map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{course.title}</span>
                        <span className="text-sm">{course.enrollments} enrollments</span>
                      </div>
                      <Progress value={course.completionRate} className="h-2" />
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{course.completions} completions</span>
                        <span>{course.completionRate}% completion rate</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Resources by Downloads</CardTitle>
                <CardDescription>The most downloaded resources in the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceData.slice(0, 3).map((resource) => (
                    <div key={resource.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{resource.title}</span>
                        <span className="text-sm">{resource.downloads} downloads</span>
                      </div>
                      <Progress value={(resource.downloads / resourceData[0].downloads) * 100} className="h-2" />
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span className="capitalize">{resource.category}</span>
                        <span>{resource.views} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>The most recent user activities across the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>Save the Children</TableCell>
                    <TableCell>Completed "Inclusive WASH Programming"</TableCell>
                    <TableCell>{formatDate("2024-03-15")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Michael Chen</TableCell>
                    <TableCell>UNICEF</TableCell>
                    <TableCell>Downloaded "Disability Inclusion in WASH Programs"</TableCell>
                    <TableCell>{formatDate("2024-03-14")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Emily Davis</TableCell>
                    <TableCell>World Vision</TableCell>
                    <TableCell>Enrolled in "Disability-Inclusive Shelter Design"</TableCell>
                    <TableCell>{formatDate("2024-03-12")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Robert Johnson</TableCell>
                    <TableCell>UNHCR</TableCell>
                    <TableCell>Earned certificate for "Disability Data Collection"</TableCell>
                    <TableCell>{formatDate("2024-03-10")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>Humanity & Inclusion</TableCell>
                    <TableCell>Viewed "Accessible Shelter Design"</TableCell>
                    <TableCell>{formatDate("2024-03-08")}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Metrics</CardTitle>
              <CardDescription>Detailed metrics for all training modules on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Title</TableHead>
                      <TableHead className="text-right">Enrollments</TableHead>
                      <TableHead className="text-right">Completions</TableHead>
                      <TableHead className="text-right">Completion Rate</TableHead>
                      <TableHead className="text-right">Avg. Score</TableHead>
                      <TableHead className="text-right">Certificates</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainingData.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell className="text-right">{course.enrollments}</TableCell>
                        <TableCell className="text-right">{course.completions}</TableCell>
                        <TableCell className="text-right">{course.completionRate}%</TableCell>
                        <TableCell className="text-right">{course.averageScore}%</TableCell>
                        <TableCell className="text-right">{course.certificatesIssued}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Completion Rates</CardTitle>
                <CardDescription>Percentage of users who complete each course after enrollment.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingData.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{course.title}</span>
                        <span className="text-sm">{course.completionRate}%</span>
                      </div>
                      <Progress value={course.completionRate} className="h-2" />
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>
                          {course.completions} of {course.enrollments} users
                        </span>
                        <span>Target: 80%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Assessment Scores</CardTitle>
                <CardDescription>Average scores achieved by users in course assessments.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingData.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{course.title}</span>
                        <span className="text-sm">{course.averageScore}%</span>
                      </div>
                      <Progress value={course.averageScore} className="h-2" />
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Passing score: 80%</span>
                        <span>{course.averageScore >= 80 ? "Above" : "Below"} target</span>
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
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Detailed metrics for user engagement and activity on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead className="text-right">Courses Enrolled</TableHead>
                      <TableHead className="text-right">Courses Completed</TableHead>
                      <TableHead className="text-right">Certificates</TableHead>
                      <TableHead>Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.organization}</TableCell>
                        <TableCell className="text-right">{user.coursesEnrolled}</TableCell>
                        <TableCell className="text-right">{user.coursesCompleted}</TableCell>
                        <TableCell className="text-right">{user.certificatesEarned}</TableCell>
                        <TableCell>{formatDate(user.lastActive)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Users by Organization</CardTitle>
                <CardDescription>Distribution of users across different organizations.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Humanity & Inclusion", "Save the Children", "UNHCR", "UNICEF", "World Vision"].map(
                    (org, index) => {
                      const count = [45, 38, 32, 28, 25][index]
                      const percentage = Math.round((count / 168) * 100)

                      return (
                        <div key={org} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{org}</span>
                            <span className="text-sm">{count} users</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{percentage}% of total users</span>
                          </div>
                        </div>
                      )
                    },
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>User activity and engagement metrics.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Active Users</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">Active</Badge>
                        <span>Last 7 days</span>
                      </div>
                      <span className="font-medium">87 users</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500">Active</Badge>
                        <span>Last 30 days</span>
                      </div>
                      <span className="font-medium">142 users</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Completion Rates</h3>
                    <div className="flex items-center justify-between">
                      <span>Average courses completed per user</span>
                      <span className="font-medium">2.8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Users with at least one certificate</span>
                      <span className="font-medium">76%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage</CardTitle>
              <CardDescription>Detailed metrics for resource downloads and views.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resource Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Downloads</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resourceData.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.title}</TableCell>
                        <TableCell className="uppercase">{resource.type}</TableCell>
                        <TableCell className="capitalize">{resource.category}</TableCell>
                        <TableCell className="text-right">{resource.downloads}</TableCell>
                        <TableCell className="text-right">{resource.views}</TableCell>
                        <TableCell>{formatDate(resource.lastUpdated)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resources by Category</CardTitle>
                <CardDescription>Distribution of resources across different categories.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["guidelines", "training", "research", "tools", "iec"].map((category, index) => {
                    const count = [12, 18, 8, 10, 6][index]
                    const percentage = Math.round((count / 54) * 100)

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium capitalize">{category}</span>
                          <span className="text-sm">{count} resources</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{percentage}% of total resources</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Downloaded Resources</CardTitle>
                <CardDescription>The most downloaded resources in each category.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceData.slice(0, 3).map((resource) => (
                    <div key={resource.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{resource.title}</span>
                        <div className="flex items-center gap-2">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{resource.downloads}</span>
                        </div>
                      </div>
                      <Progress value={(resource.downloads / resourceData[0].downloads) * 100} className="h-2" />
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span className="capitalize">{resource.category}</span>
                        <span>Last updated: {formatDate(resource.lastUpdated)}</span>
                      </div>
                    </div>
                  ))}
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
