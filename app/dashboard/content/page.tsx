"use client"

import { useState } from "react"
import {
  FileText,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Download,
  Filter,
  FileUp,
  Video,
  AudioLines,
  FileType,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

// Mock resource data
const mockResources = [
  {
    id: 1,
    title: "Disability Inclusion in WASH Programs",
    description:
      "Comprehensive guidelines for making WASH facilities accessible for persons with disabilities in humanitarian settings.",
    type: "pdf",
    category: "guidelines",
    sector: "wash",
    language: ["english", "bangla"],
    downloads: 245,
    popularity: 4.8,
    dateAdded: "2023-10-15",
    fileSize: "2.4 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: true,
    status: "published",
    uploadedBy: "John Doe",
  },
  {
    id: 2,
    title: "Inclusive Education Training Manual",
    description:
      "Training manual for teachers and education staff on inclusive education practices for children with disabilities.",
    type: "word",
    category: "training",
    sector: "education",
    language: ["english"],
    downloads: 187,
    popularity: 4.5,
    dateAdded: "2023-11-20",
    fileSize: "3.1 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: false,
    status: "published",
    uploadedBy: "Jane Smith",
  },
  {
    id: 3,
    title: "Disability Data Collection Methods",
    description:
      "Video tutorial on using the Washington Group Questions for disability data collection in humanitarian contexts.",
    type: "video",
    category: "training",
    sector: "protection",
    language: ["english", "bangla"],
    downloads: 312,
    popularity: 4.9,
    dateAdded: "2024-01-05",
    fileSize: "45 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: true,
    status: "published",
    uploadedBy: "Robert Johnson",
  },
  {
    id: 4,
    title: "Accessible Shelter Design",
    description: "Technical specifications and blueprints for designing accessible shelters in refugee camps.",
    type: "pdf",
    category: "guidelines",
    sector: "shelter",
    language: ["english"],
    downloads: 156,
    popularity: 4.2,
    dateAdded: "2023-08-30",
    fileSize: "5.7 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: false,
    status: "published",
    uploadedBy: "Emily Davis",
  },
  {
    id: 5,
    title: "Disability Awareness Audio Guide",
    description:
      "Audio guide for humanitarian staff on disability awareness and etiquette when working with persons with disabilities.",
    type: "audio",
    category: "training",
    sector: "protection",
    language: ["english", "bangla"],
    downloads: 98,
    popularity: 4.0,
    dateAdded: "2023-12-10",
    fileSize: "18 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: false,
    status: "published",
    uploadedBy: "David Miller",
  },
  {
    id: 6,
    title: "Inclusive Cash-Based Interventions",
    description: "Guidelines for ensuring cash-based interventions are accessible to persons with disabilities.",
    type: "pdf",
    category: "guidelines",
    sector: "cash",
    language: ["english"],
    downloads: 134,
    popularity: 4.3,
    dateAdded: "2024-02-15",
    fileSize: "1.8 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: false,
    status: "draft",
    uploadedBy: "Sarah Brown",
  },
]

// Get resource type icon
const getResourceTypeIcon = (type) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-5 w-5 text-inclusion-red" />
    case "word":
      return <FileType className="h-5 w-5 text-inclusion-blue" />
    case "video":
      return <Video className="h-5 w-5 text-inclusion-purple" />
    case "audio":
      return <AudioLines className="h-5 w-5 text-inclusion-green" />
    default:
      return <FileText className="h-5 w-5" />
  }
}

// Get resource type label
const getResourceTypeLabel = (type) => {
  switch (type) {
    case "pdf":
      return "PDF Document"
    case "word":
      return "Word Document"
    case "video":
      return "Video"
    case "audio":
      return "Audio"
    default:
      return "Document"
  }
}

export default function ContentPage() {
  const [resources, setResources] = useState(mockResources)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Filter resources based on search and filter criteria
  const filteredResources = resources.filter((resource) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Category filter
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory

    // Type filter
    const matchesType = selectedType === "all" || resource.type === selectedType

    // Status filter
    const matchesStatus = selectedStatus === "all" || resource.status === selectedStatus

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && resource.featured) ||
      (activeTab === "draft" && resource.status === "draft")

    return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesTab
  })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>
      case "draft":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Draft
          </Badge>
        )
      case "archived":
        return <Badge className="bg-inclusion-orange">Archived</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-inclusion-teal" />
            Content Management
          </h1>
          <p className="text-muted-foreground">Upload, edit, and manage resources and training materials.</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Upload Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Upload New Resource</DialogTitle>
                <DialogDescription>
                  Add a new resource to the platform. All resources will be reviewed before publishing.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input id="title" placeholder="Enter resource title" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea id="description" placeholder="Enter resource description" className="min-h-[100px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guidelines">Guidelines</SelectItem>
                        <SelectItem value="training">Training Materials</SelectItem>
                        <SelectItem value="research">Research Reports</SelectItem>
                        <SelectItem value="tools">Tools & Templates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="sector" className="text-sm font-medium">
                      Sector
                    </label>
                    <Select>
                      <SelectTrigger id="sector">
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wash">WASH</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="protection">Protection</SelectItem>
                        <SelectItem value="shelter">Shelter</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="type" className="text-sm font-medium">
                      Resource Type
                    </label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="word">Word Document</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="language" className="text-sm font-medium">
                      Language
                    </label>
                    <Select>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="bangla">Bangla</SelectItem>
                        <SelectItem value="both">Both English & Bangla</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="file" className="text-sm font-medium">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Drag and drop your file here, or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-1">Supports PDF, DOCX, MP4, MP3 (max 100MB)</p>
                    <Input id="file" type="file" className="hidden" />
                    <Button variant="outline" size="sm" className="mt-4">
                      Browse Files
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="thumbnail" className="text-sm font-medium">
                    Thumbnail Image (Optional)
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <Input id="thumbnail" type="file" className="hidden" />
                    <Button variant="outline" size="sm">
                      Upload Thumbnail
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" />
                  <label htmlFor="featured" className="text-sm font-medium">
                    Mark as featured resource
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="publish" defaultChecked />
                  <label htmlFor="publish" className="text-sm font-medium">
                    Publish immediately (otherwise save as draft)
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Upload Resource</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-10 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="grid gap-4 md:grid-cols-3 p-4 border rounded-lg bg-muted/30">
            <div className="space-y-2">
              <label htmlFor="category-filter" className="text-sm font-medium">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-filter">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="guidelines">Guidelines</SelectItem>
                  <SelectItem value="training">Training Materials</SelectItem>
                  <SelectItem value="research">Research Reports</SelectItem>
                  <SelectItem value="tools">Tools & Templates</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="type-filter" className="text-sm font-medium">
                Resource Type
              </label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pdf">PDF Documents</SelectItem>
                  <SelectItem value="word">Word Documents</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="status-filter" className="text-sm font-medium">
                Status
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <TabsContent value="all" className="space-y-4">
          <ResourceTable
            resources={filteredResources}
            getResourceTypeIcon={getResourceTypeIcon}
            getResourceTypeLabel={getResourceTypeLabel}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <ResourceTable
            resources={filteredResources.filter((r) => r.featured)}
            getResourceTypeIcon={getResourceTypeIcon}
            getResourceTypeLabel={getResourceTypeLabel}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <ResourceTable
            resources={filteredResources.filter((r) => r.status === "draft")}
            getResourceTypeIcon={getResourceTypeIcon}
            getResourceTypeLabel={getResourceTypeLabel}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Resource Table Component
function ResourceTable({ resources, getResourceTypeIcon, getResourceTypeLabel, getStatusBadge, formatDate }) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Resource</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Downloads</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <FileText className="h-12 w-12 mb-2" />
                  <h3 className="font-medium text-lg">No resources found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                      {getResourceTypeIcon(resource.type)}
                    </div>
                    <div>
                      <div className="font-medium">{resource.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{resource.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getResourceTypeLabel(resource.type)}</TableCell>
                <TableCell className="capitalize">{resource.category}</TableCell>
                <TableCell>{getStatusBadge(resource.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Download className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>{resource.downloads}</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(resource.dateAdded)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Resource
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Resource
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {resource.status === "draft" ? (
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Publish Resource
                        </DropdownMenuItem>
                      ) : resource.status === "published" ? (
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Unpublish Resource
                        </DropdownMenuItem>
                      ) : null}
                      {resource.featured ? (
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          Remove from Featured
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          Mark as Featured
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Resource
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
