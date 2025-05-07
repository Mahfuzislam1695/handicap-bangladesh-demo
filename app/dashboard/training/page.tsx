"use client"

import { useState } from "react"
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  FileText,
  Video,
  Headphones,
  FileQuestion,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock training data
const trainingModules = [
  {
    id: 1,
    title: "Introduction to Disability Inclusion",
    description: "Learn the fundamentals of disability inclusion in humanitarian contexts.",
    status: "published",
    enrollments: 245,
    completions: 187,
    lastUpdated: "2024-03-15",
    duration: "2 hours",
    level: "Beginner",
    sections: [
      { id: 1, title: "Understanding Disability", type: "video" },
      { id: 2, title: "Inclusion Principles", type: "pdf" },
      { id: 3, title: "Accessibility Basics", type: "video" },
      { id: 4, title: "Module Assessment", type: "quiz" },
    ],
  },
  {
    id: 2,
    title: "Inclusive WASH Programming",
    description: "Strategies for making water, sanitation, and hygiene programs accessible to all.",
    status: "published",
    enrollments: 198,
    completions: 142,
    lastUpdated: "2024-02-20",
    duration: "3 hours",
    level: "Intermediate",
    sections: [
      { id: 1, title: "WASH Basics", type: "video" },
      { id: 2, title: "Inclusive Design", type: "pdf" },
      { id: 3, title: "Case Studies", type: "audio" },
      { id: 4, title: "Module Assessment", type: "quiz" },
    ],
  },
  {
    id: 3,
    title: "Disability Data Collection",
    description: "Methods and tools for collecting disability-disaggregated data in programs.",
    status: "draft",
    enrollments: 0,
    completions: 0,
    lastUpdated: "2024-03-10",
    duration: "2.5 hours",
    level: "Advanced",
    sections: [
      { id: 1, title: "Data Collection Methods", type: "video" },
      { id: 2, title: "Washington Group Questions", type: "pdf" },
      { id: 3, title: "Data Analysis", type: "video" },
      { id: 4, title: "Module Assessment", type: "quiz" },
    ],
  },
  {
    id: 4,
    title: "Inclusive Education in Emergencies",
    description: "Ensuring education programs in emergency settings are accessible to children with disabilities.",
    status: "published",
    enrollments: 156,
    completions: 98,
    lastUpdated: "2024-01-25",
    duration: "4 hours",
    level: "Intermediate",
    sections: [
      { id: 1, title: "Education in Emergencies", type: "video" },
      { id: 2, title: "Inclusive Classrooms", type: "pdf" },
      { id: 3, title: "Teacher Training", type: "video" },
      { id: 4, title: "Module Assessment", type: "quiz" },
    ],
  },
  {
    id: 5,
    title: "Disability-Inclusive Shelter Design",
    description: "Principles and practices for designing accessible shelter solutions in humanitarian response.",
    status: "review",
    enrollments: 0,
    completions: 0,
    lastUpdated: "2024-03-05",
    duration: "3 hours",
    level: "Intermediate",
    sections: [
      { id: 1, title: "Universal Design Principles", type: "video" },
      { id: 2, title: "Accessibility Standards", type: "pdf" },
      { id: 3, title: "Case Studies", type: "audio" },
      { id: 4, title: "Module Assessment", type: "quiz" },
    ],
  },
]

export default function TrainingManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter training modules based on search query and active tab
  const filteredModules = trainingModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "published") return matchesSearch && module.status === "published"
    if (activeTab === "draft") return matchesSearch && module.status === "draft"
    if (activeTab === "review") return matchesSearch && module.status === "review"

    return matchesSearch
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

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "review":
        return <Badge className="bg-yellow-500">In Review</Badge>
      default:
        return <Badge variant="outline">Draft</Badge>
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-inclusion-blue" />
            Training Management
          </h1>
          <p className="text-muted-foreground">Create, edit, and manage training modules and courses.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Module
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search training modules..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Modules</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="review">In Review</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredModules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getStatusBadge(module.status)}
                    <Badge variant="outline">{module.level}</Badge>
                    <Badge variant="outline">{module.duration}</Badge>
                  </div>

                  {module.status === "published" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion Rate</span>
                        <span>
                          {module.enrollments > 0 ? Math.round((module.completions / module.enrollments) * 100) : 0}%
                        </span>
                      </div>
                      <Progress
                        value={module.enrollments > 0 ? (module.completions / module.enrollments) * 100 : 0}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{module.completions} completions</span>
                        <span>{module.enrollments} enrollments</span>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between">
                  <div className="text-xs text-muted-foreground">
                    Last updated: {new Date(module.lastUpdated).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`publish-${module.id}`} className="text-xs cursor-pointer">
                      {module.status === "published" ? "Published" : "Publish"}
                    </Label>
                    <Switch id={`publish-${module.id}`} checked={module.status === "published"} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredModules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getStatusBadge(module.status)}
                    <Badge variant="outline">{module.level}</Badge>
                    <Badge variant="outline">{module.duration}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion Rate</span>
                      <span>
                        {module.enrollments > 0 ? Math.round((module.completions / module.enrollments) * 100) : 0}%
                      </span>
                    </div>
                    <Progress
                      value={module.enrollments > 0 ? (module.completions / module.enrollments) * 100 : 0}
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{module.completions} completions</span>
                      <span>{module.enrollments} enrollments</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between">
                  <div className="text-xs text-muted-foreground">
                    Last updated: {new Date(module.lastUpdated).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`publish-${module.id}-pub`} className="text-xs cursor-pointer">
                      Published
                    </Label>
                    <Switch id={`publish-${module.id}-pub`} checked={true} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredModules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getStatusBadge(module.status)}
                    <Badge variant="outline">{module.level}</Badge>
                    <Badge variant="outline">{module.duration}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between">
                  <div className="text-xs text-muted-foreground">
                    Last updated: {new Date(module.lastUpdated).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`publish-${module.id}-draft`} className="text-xs cursor-pointer">
                      Publish
                    </Label>
                    <Switch id={`publish-${module.id}-draft`} checked={false} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredModules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getStatusBadge(module.status)}
                    <Badge variant="outline">{module.level}</Badge>
                    <Badge variant="outline">{module.duration}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between">
                  <div className="text-xs text-muted-foreground">
                    Last updated: {new Date(module.lastUpdated).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`publish-${module.id}-review`} className="text-xs cursor-pointer">
                      Publish
                    </Label>
                    <Switch id={`publish-${module.id}-review`} checked={false} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Module Content Structure</CardTitle>
          <CardDescription>View and manage the content structure of each training module.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingModules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell className="font-medium">{module.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {module.sections.map((section) => (
                        <div key={section.id} className="flex items-center gap-2 text-sm">
                          {getContentTypeIcon(section.type)}
                          <span>{section.title}</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(module.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Preview</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
