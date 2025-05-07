"use client"

import { useState } from "react"
import {
  BookOpen,
  Search,
  Play,
  CheckCircle,
  Clock,
  Award,
  FileText,
  Video,
  Headphones,
  FileQuestion,
  BarChart,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Mock learning path data
const learningPathData = {
  enrolledCourses: [
    {
      id: 1,
      title: "Introduction to Disability Inclusion",
      description: "Learn the fundamentals of disability inclusion in humanitarian contexts.",
      progress: 100,
      status: "completed",
      completionDate: "2024-02-15",
      certificateIssued: true,
      duration: "2 hours",
      level: "Beginner",
      sections: [
        { id: 1, title: "Understanding Disability", type: "video", completed: true },
        { id: 2, title: "Inclusion Principles", type: "pdf", completed: true },
        { id: 3, title: "Accessibility Basics", type: "video", completed: true },
        { id: 4, title: "Module Assessment", type: "quiz", completed: true, score: 92 },
      ],
    },
    {
      id: 2,
      title: "Inclusive WASH Programming",
      description: "Strategies for making water, sanitation, and hygiene programs accessible to all.",
      progress: 75,
      status: "in-progress",
      completionDate: null,
      certificateIssued: false,
      duration: "3 hours",
      level: "Intermediate",
      sections: [
        { id: 1, title: "WASH Basics", type: "video", completed: true },
        { id: 2, title: "Inclusive Design", type: "pdf", completed: true },
        { id: 3, title: "Case Studies", type: "audio", completed: false },
        { id: 4, title: "Module Assessment", type: "quiz", completed: false },
      ],
    },
    {
      id: 3,
      title: "Disability Data Collection",
      description: "Methods and tools for collecting disability-disaggregated data in programs.",
      progress: 25,
      status: "in-progress",
      completionDate: null,
      certificateIssued: false,
      duration: "2.5 hours",
      level: "Advanced",
      sections: [
        { id: 1, title: "Data Collection Methods", type: "video", completed: true },
        { id: 2, title: "Washington Group Questions", type: "pdf", completed: false },
        { id: 3, title: "Data Analysis", type: "video", completed: false },
        { id: 4, title: "Module Assessment", type: "quiz", completed: false },
      ],
    },
    {
      id: 4,
      title: "Inclusive Education in Emergencies",
      description: "Ensuring education programs in emergency settings are accessible to children with disabilities.",
      progress: 0,
      status: "not-started",
      completionDate: null,
      certificateIssued: false,
      duration: "4 hours",
      level: "Intermediate",
      sections: [
        { id: 1, title: "Education in Emergencies", type: "video", completed: false },
        { id: 2, title: "Inclusive Classrooms", type: "pdf", completed: false },
        { id: 3, title: "Teacher Training", type: "video", completed: false },
        { id: 4, title: "Module Assessment", type: "quiz", completed: false },
      ],
    },
  ],
  recommendedCourses: [
    {
      id: 5,
      title: "Disability-Inclusive Shelter Design",
      description: "Principles and practices for designing accessible shelter solutions in humanitarian response.",
      duration: "3 hours",
      level: "Intermediate",
      popularity: "High",
    },
    {
      id: 6,
      title: "Mental Health and Psychosocial Support",
      description: "Approaches to providing mental health support for persons with disabilities in crisis settings.",
      duration: "3.5 hours",
      level: "Intermediate",
      popularity: "Medium",
    },
    {
      id: 7,
      title: "Inclusive Disaster Risk Reduction",
      description: "Strategies for including persons with disabilities in disaster preparedness and response.",
      duration: "2.5 hours",
      level: "Advanced",
      popularity: "Medium",
    },
  ],
  certificates: [
    {
      id: 1,
      title: "Introduction to Disability Inclusion",
      issueDate: "2024-02-15",
      expiryDate: "2026-02-15",
      credentialId: "DI-2024-12345",
    },
  ],
  learningStats: {
    coursesCompleted: 1,
    coursesInProgress: 2,
    totalHoursLearned: 5.5,
    certificatesEarned: 1,
    averageScore: 92,
  },
}

export default function LearningPathPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("enrolled")

  // Filter courses based on search query
  const filteredEnrolledCourses = learningPathData.enrolledCourses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const filteredRecommendedCourses = learningPathData.recommendedCourses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Get icon based on content type
  const getContentTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "quiz":
        return <FileQuestion className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "not-started":
        return <Play className="h-5 w-5 text-muted-foreground" />
      default:
        return <Play className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-inclusion-blue" />
            My Learning Path
          </h1>
          <p className="text-muted-foreground">Track your progress and continue your learning journey.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            View Learning Report
          </Button>
          <Button className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            View Certificates
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{learningPathData.learningStats.coursesCompleted}</div>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round(
                (learningPathData.learningStats.coursesCompleted / learningPathData.enrolledCourses.length) * 100,
              )}
              % of enrolled courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{learningPathData.learningStats.coursesInProgress}</div>
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round(
                (learningPathData.learningStats.coursesInProgress / learningPathData.enrolledCourses.length) * 100,
              )}
              % of enrolled courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{learningPathData.learningStats.totalHoursLearned}</div>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{learningPathData.learningStats.certificatesEarned}</div>
              <Award className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average score: {learningPathData.learningStats.averageScore}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="enrolled" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="certificates">My Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-4">
          {filteredEnrolledCourses.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  We couldn't find any courses matching your search criteria.
                </p>
                <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredEnrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-2">
                        {getStatusIcon(course.status)}
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge
                        variant={course.status === "completed" ? "default" : "outline"}
                        className={course.status === "completed" ? "bg-green-500" : ""}
                      >
                        {course.status === "completed"
                          ? "Completed"
                          : course.status === "in-progress"
                            ? "In Progress"
                            : "Not Started"}
                      </Badge>
                      <Badge variant="outline">{course.level}</Badge>
                      <Badge variant="outline">{course.duration}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    {course.status !== "not-started" && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Course Content</h4>
                        <div className="space-y-2">
                          {course.sections.map((section) => (
                            <div key={section.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                {getContentTypeIcon(section.type)}
                                <span>{section.title}</span>
                              </div>
                              {section.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <Clock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    {course.status === "completed" ? (
                      <div className="text-xs text-muted-foreground">
                        Completed on: {new Date(course.completionDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        {course.status === "in-progress" ? "Continue where you left off" : "Start learning"}
                      </div>
                    )}
                    <Button variant={course.status === "completed" ? "outline" : "default"} size="sm">
                      {course.status === "completed"
                        ? "Review Course"
                        : course.status === "in-progress"
                          ? "Continue"
                          : "Start"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          {filteredRecommendedCourses.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  We couldn't find any recommended courses matching your search criteria.
                </p>
                <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecommendedCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{course.level}</Badge>
                      <Badge variant="outline">{course.duration}</Badge>
                      <Badge variant="outline">Popularity: {course.popularity}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="text-xs text-muted-foreground">Recommended based on your learning history</div>
                    <Button size="sm">Enroll</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          {learningPathData.certificates.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Award className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No certificates yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Complete courses to earn certificates that showcase your skills.
                </p>
                <Button onClick={() => setActiveTab("enrolled")}>Browse Courses</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {learningPathData.certificates.map((certificate) => (
                <Card key={certificate.id} className="overflow-hidden">
                  <CardHeader className="pb-3 text-center">
                    <Award className="h-12 w-12 mx-auto text-inclusion-orange mb-2" />
                    <CardTitle>{certificate.title}</CardTitle>
                    <CardDescription>Certificate of Completion</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Issue Date:</span>
                        <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Expiry Date:</span>
                        <span>{new Date(certificate.expiryDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Credential ID:</span>
                        <span>{certificate.credentialId}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="text-center text-sm">
                        <p>This certificate verifies the completion of the course.</p>
                        <p className="font-medium mt-2">Issued by Disability Inclusion Hub</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
