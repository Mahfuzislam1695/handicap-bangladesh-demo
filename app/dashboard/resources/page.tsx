"use client"

import { useState } from "react"
import {
  FileText,
  Search,
  MoreHorizontal,
  Download,
  BookmarkPlus,
  Share2,
  FileIcon,
  Video,
  Headphones,
  FileQuestion,
  Grid,
  List,
  Clock,
  Eye,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Mock resources data
const resourcesData = [
  {
    id: 1,
    title: "Disability Inclusion in WASH Programs",
    description: "A comprehensive guide to making water, sanitation, and hygiene programs accessible to all.",
    type: "pdf",
    category: "guidelines",
    tags: ["wash", "inclusion", "accessibility"],
    size: "2.5 MB",
    uploadDate: "2024-02-15",
    downloads: 245,
    views: 412,
    isSaved: true,
  },
  {
    id: 2,
    title: "Inclusive Education Training Manual",
    description:
      "Training materials for educators on creating inclusive learning environments for children with disabilities.",
    type: "word",
    category: "training",
    tags: ["education", "training", "inclusion"],
    size: "3.8 MB",
    uploadDate: "2024-01-20",
    downloads: 187,
    views: 356,
    isSaved: true,
  },
  {
    id: 3,
    title: "Disability Data Collection Methods",
    description: "Video tutorial on methods for collecting disability-disaggregated data in humanitarian programs.",
    type: "video",
    category: "training",
    tags: ["data", "research", "methods"],
    size: "45 MB",
    uploadDate: "2024-03-05",
    downloads: 312,
    views: 578,
    isSaved: false,
  },
  {
    id: 4,
    title: "Accessible Shelter Design",
    description:
      "Guidelines for designing shelters that are accessible to persons with disabilities in humanitarian contexts.",
    type: "pdf",
    category: "guidelines",
    tags: ["shelter", "design", "accessibility"],
    size: "4.2 MB",
    uploadDate: "2023-12-10",
    downloads: 156,
    views: 289,
    isSaved: false,
  },
  {
    id: 5,
    title: "Disability Awareness Audio Guide",
    description: "Audio guide for field staff on disability awareness and inclusion principles.",
    type: "audio",
    category: "training",
    tags: ["awareness", "inclusion", "field-staff"],
    size: "28 MB",
    uploadDate: "2024-02-28",
    downloads: 98,
    views: 203,
    isSaved: true,
  },
  {
    id: 6,
    title: "Inclusive Cash-Based Interventions",
    description: "Best practices for ensuring cash-based interventions are accessible to persons with disabilities.",
    type: "pdf",
    category: "guidelines",
    tags: ["cash", "interventions", "inclusion"],
    size: "3.1 MB",
    uploadDate: "2024-01-05",
    downloads: 142,
    views: 267,
    isSaved: false,
  },
  {
    id: 7,
    title: "Disability Inclusion Assessment Tool",
    description:
      "Interactive tool for assessing the inclusivity of humanitarian programs for persons with disabilities.",
    type: "quiz",
    category: "tools",
    tags: ["assessment", "tools", "inclusion"],
    size: "1.5 MB",
    uploadDate: "2024-02-20",
    downloads: 203,
    views: 345,
    isSaved: false,
  },
  {
    id: 8,
    title: "Sign Language Basics for Humanitarian Workers",
    description: "Video tutorial on basic sign language for humanitarian workers in the field.",
    type: "video",
    category: "training",
    tags: ["sign-language", "communication", "field-staff"],
    size: "60 MB",
    uploadDate: "2024-03-10",
    downloads: 175,
    views: 320,
    isSaved: false,
  },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  // Filter resources based on search query, active tab, and filters
  const filteredResources = resourcesData.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab = activeTab === "all" || (activeTab === "saved" && resource.isSaved)

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory

    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesTab && matchesCategory && matchesType
  })

  // Get icon based on resource type
  const getResourceTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "quiz":
        return <FileQuestion className="h-4 w-4" />
      case "word":
        return <FileIcon className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-inclusion-blue" />
            My Resources
          </h1>
          <p className="text-muted-foreground">Access and manage your learning resources.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <BookmarkPlus className="h-4 w-4" />
            Saved Resources
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download History
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="guidelines">Guidelines</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
              <SelectItem value="research">Research</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="word">Word</SelectItem>
              <SelectItem value="quiz">Interactive</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${viewMode === "grid" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${viewMode === "list" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="saved">Saved Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredResources.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No resources found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  We couldn't find any resources matching your search criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedType("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-2">
                        {getResourceTypeIcon(resource.type)}
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </div>
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
                          <DropdownMenuItem className="flex items-center">
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <BookmarkPlus className="mr-2 h-4 w-4" />
                            <span>{resource.isSaved ? "Remove from Saved" : "Save Resource"}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Share2 className="mr-2 h-4 w-4" />
                            <span>Share</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="capitalize">
                        {resource.category}
                      </Badge>
                      <Badge variant="outline" className="uppercase">
                        {resource.type}
                      </Badge>
                      {resource.isSaved && <Badge className="bg-inclusion-blue">Saved</Badge>}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{resource.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{resource.downloads} downloads</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
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
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30px]">
                      <Checkbox id="select-all" />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <Checkbox id={`select-${resource.id}`} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getResourceTypeIcon(resource.type)}
                          <div>
                            <div className="font-medium">{resource.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{resource.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{resource.category}</TableCell>
                      <TableCell className="uppercase">{resource.type}</TableCell>
                      <TableCell>{resource.size}</TableCell>
                      <TableCell>{new Date(resource.uploadDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <BookmarkPlus className="h-4 w-4" />
                            <span className="sr-only">Save</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {filteredResources.filter((r) => r.isSaved).length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <BookmarkPlus className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No saved resources</h3>
                <p className="text-muted-foreground text-center mb-4">
                  You haven't saved any resources yet. Save resources to access them quickly later.
                </p>
                <Button onClick={() => setActiveTab("all")}>Browse Resources</Button>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources
                .filter((r) => r.isSaved)
                .map((resource) => (
                  <Card key={resource.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-2">
                          {getResourceTypeIcon(resource.type)}
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </div>
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
                            <DropdownMenuItem className="flex items-center">
                              <Download className="mr-2 h-4 w-4" />
                              <span>Download</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <BookmarkPlus className="mr-2 h-4 w-4" />
                              <span>Remove from Saved</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <Share2 className="mr-2 h-4 w-4" />
                              <span>Share</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="capitalize">
                          {resource.category}
                        </Badge>
                        <Badge variant="outline" className="uppercase">
                          {resource.type}
                        </Badge>
                        <Badge className="bg-inclusion-blue">Saved</Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{resource.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          <span>{resource.downloads} downloads</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3 flex justify-between">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
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
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30px]">
                      <Checkbox id="select-all-saved" />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources
                    .filter((r) => r.isSaved)
                    .map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <Checkbox id={`select-saved-${resource.id}`} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getResourceTypeIcon(resource.type)}
                            <div>
                              <div className="font-medium">{resource.title}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1">{resource.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{resource.category}</TableCell>
                        <TableCell className="uppercase">{resource.type}</TableCell>
                        <TableCell>{resource.size}</TableCell>
                        <TableCell>{new Date(resource.uploadDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <BookmarkPlus className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
