"use client"

import { useState } from "react"
import {
  BookOpen,
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Users,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock training progress data
const trainingModules = [
  {
    id: 1,
    title: "Introduction to Disability Inclusion",
    enrollments: 45,
    completions: 32,
    inProgress: 10,
    notStarted: 3,
    averageScore: 85,
    certificatesIssued: 32,
  },
  {
    id: 2,
    title: "Inclusive WASH Programming",
    enrollments: 38,
    completions: 25,
    inProgress: 8,
    notStarted: 5,
    averageScore: 82,
    certificatesIssued: 25,
  },
  {
    id: 3,
    title: "Disability Data Collection",
    enrollments: 30,
    completions: 18,
    inProgress: 7,
    notStarted: 5,
    averageScore: 79,
    certificatesIssued: 18,
  },
  {
    id: 4,
    title: "Inclusive Education in Emergencies",
    enrollments: 25,
    completions: 15,
    inProgress: 6,
    notStarted: 4,
    averageScore: 81,
    certificatesIssued: 15,
  },
  {
    id: 5,
    title: "Disability-Inclusive Shelter Design",
    enrollments: 20,
    completions: 12,
    inProgress: 5,
    notStarted: 3,
    averageScore: 84,
    certificatesIssued: 12,
  },
]

const userProgress = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Program Manager",
    coursesEnrolled: 5,
    coursesCompleted: 4,
    certificatesEarned: 4,
    lastActive: "2024-03-15",
    progress: [
      { courseId: 1, status: "completed", score: 92 },
      { courseId: 2, status: "completed", score: 88 },
      { courseId: 3, status: "completed", score: 85 },
      { courseId: 4, status: "completed", score: 90 },
      { courseId: 5, status: "in-progress", score: null },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Field Officer",
    coursesEnrolled: 4,
    coursesCompleted: 3,
    certificatesEarned: 3,
    lastActive: "2024-03-10",
    progress: [
      { courseId: 1, status: "completed", score: 85 },
      { courseId: 2, status: "completed", score: 80 },
      { courseId: 3, status: "completed", score: 78 },
      { courseId: 4, status: "in-progress", score: null },
    ],
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "WASH Specialist",
    coursesEnrolled: 3,
    coursesCompleted: 2,
    certificatesEarned: 2,
    lastActive: "2024-03-12",
    progress: [
      { courseId: 1, status: "completed", score: 88 },
      { courseId: 2, status: "completed", score: 90 },
      { courseId: 3, status: "in-progress", score: null },
    ],
  },
  {
    id: 4,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Education Coordinator",
    coursesEnrolled: 4,
    coursesCompleted: 2,
    certificatesEarned: 2,
    lastActive: "2024-03-08",
    progress: [
      { courseId: 1, status: "completed", score: 82 },
      { courseId: 2, status: "not-started", score: null },
      { courseId: 3, status: "not-started", score: null },
      { courseId: 4, status: "completed", score: 85 },
    ],
  },
  {
    id: 5,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Shelter Specialist",
    coursesEnrolled: 3,
    coursesCompleted: 1,
    certificatesEarned: 1,
    lastActive: "2024-03-05",
    progress: [
      { courseId: 1, status: "completed", score: 80 },
      { courseId: 2, status: "in-progress", score: null },
      { courseId: 5, status: "in-progress", score: null },
    ],
  },
]

export default function TrainingProgressPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCourse, setSelectedCourse] = useState("all")

  // Filter users based on search query
  const filteredUsers = userProgress.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedCourse === "all") return matchesSearch

    const courseId = Number.parseInt(selectedCourse)
    return matchesSearch && user.progress.some((p) => p.courseId === courseId)
  })

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "not-started":
        return <XCircle className="h-4 w-4 text-muted-foreground" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-inclusion-blue" />
            Training Progress
          </h1>
          <p className="text-muted-foreground">Monitor and track training progress for your organization.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">158</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">102</div>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">65% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">102</div>
              <Award className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">100% of completions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">82%</div>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Passing score: 70%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Course Overview</TabsTrigger>
          <TabsTrigger value="users">User Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Completion Rates</CardTitle>
              <CardDescription>Progress and completion rates for all training modules.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Title</TableHead>
                      <TableHead className="text-right">Enrollments</TableHead>
                      <TableHead className="text-right">Completions</TableHead>
                      <TableHead className="text-right">In Progress</TableHead>
                      <TableHead className="text-right">Not Started</TableHead>
                      <TableHead className="text-right">Avg. Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainingModules.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell className="text-right">{course.enrollments}</TableCell>
                        <TableCell className="text-right">{course.completions}</TableCell>
                        <TableCell className="text-right">{course.inProgress}</TableCell>
                        <TableCell className="text-right">{course.notStarted}</TableCell>
                        <TableCell className="text-right">{course.averageScore}%</TableCell>
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
                  {trainingModules.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{course.title}</span>
                        <span className="text-sm">{Math.round((course.completions / course.enrollments) * 100)}%</span>
                      </div>
                      <Progress value={(course.completions / course.enrollments) * 100} className="h-2" />
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
                  {trainingModules.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{course.title}</span>
                        <span className="text-sm">{course.averageScore}%</span>
                      </div>
                      <Progress value={course.averageScore} className="h-2" />
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Passing score: 70%</span>
                        <span>{course.averageScore >= 80 ? "Above" : "Below"} target</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {trainingModules.map((course) => (
                  <SelectItem key={course.id} value={course.id.toString()}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Progress</CardTitle>
              <CardDescription>Detailed progress for each user in your organization.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-center">Enrolled</TableHead>
                      <TableHead className="text-center">Completed</TableHead>
                      <TableHead className="text-center">Certificates</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">{user.name}</span>
                              <span className="text-xs text-muted-foreground">{user.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-center">{user.coursesEnrolled}</TableCell>
                        <TableCell className="text-center">{user.coursesCompleted}</TableCell>
                        <TableCell className="text-center">{user.certificatesEarned}</TableCell>
                        <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Full Profile</DropdownMenuItem>
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              <DropdownMenuItem>Download Progress Report</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Course Progress</CardTitle>
              <CardDescription>Course-by-course progress for each user.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      {trainingModules.map((course) => (
                        <TableHead key={course.id} className="text-center">
                          {course.title.split(" ").slice(0, 2).join(" ")}...
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        {trainingModules.map((course) => {
                          const progress = user.progress.find((p) => p.courseId === course.id)
                          return (
                            <TableCell key={course.id} className="text-center">
                              {progress ? (
                                <div className="flex flex-col items-center gap-1">
                                  {getStatusIcon(progress.status)}
                                  {progress.score && <span className="text-xs">{progress.score}%</span>}
                                </div>
                              ) : (
                                <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />
                              )}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
