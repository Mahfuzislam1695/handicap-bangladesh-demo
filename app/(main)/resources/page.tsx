"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Search,
  Filter,
  FileText,
  FileType,
  Video,
  AudioLines,
  Download,
  Eye,
  ChevronDown,
  ChevronRight,
  Star,
  Clock,
  LanguagesIcon,
  BookOpen,
  FileCheck,
  Accessibility,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { AccessibilityControls } from "@/components/accessibility-controls"

// Sample resource data
const resourcesData = [
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
  },
  {
    id: 7,
    title: "Mental Health and Psychosocial Support for Persons with Disabilities",
    description: "Research report on the mental health needs of persons with disabilities in humanitarian contexts.",
    type: "pdf",
    category: "research",
    sector: "health",
    language: ["english"],
    downloads: 201,
    popularity: 4.7,
    dateAdded: "2023-09-05",
    fileSize: "4.2 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: true,
  },
  {
    id: 8,
    title: "Inclusive Nutrition Programs",
    description: "Guidelines for making nutrition programs accessible to persons with disabilities.",
    type: "word",
    category: "guidelines",
    sector: "nutrition",
    language: ["english", "bangla"],
    downloads: 112,
    popularity: 4.1,
    dateAdded: "2023-11-10",
    fileSize: "2.9 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: false,
  },
  {
    id: 9,
    title: "Disability Inclusion in Camp Coordination",
    description: "Video training on ensuring disability inclusion in camp coordination and management.",
    type: "video",
    category: "training",
    sector: "cccm",
    language: ["english"],
    downloads: 87,
    popularity: 4.4,
    dateAdded: "2024-01-20",
    fileSize: "38 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: false,
  },
  {
    id: 10,
    title: "Accessible Communication Materials",
    description:
      "Templates and guidelines for creating accessible communication materials for persons with different types of disabilities.",
    type: "pdf",
    category: "tools",
    sector: "communication",
    language: ["english", "bangla"],
    downloads: 267,
    popularity: 4.6,
    dateAdded: "2023-10-25",
    fileSize: "3.5 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: true,
  },
  {
    id: 11,
    title: "Disability Inclusion in Disaster Risk Reduction",
    description:
      "Audio training on including persons with disabilities in disaster risk reduction planning and implementation.",
    type: "audio",
    category: "training",
    sector: "drr",
    language: ["english"],
    downloads: 76,
    popularity: 4.2,
    dateAdded: "2023-12-05",
    fileSize: "22 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: false,
  },
  {
    id: 12,
    title: "Inclusive Livelihoods Programming",
    description: "Guidelines for ensuring livelihood programs are accessible to persons with disabilities.",
    type: "pdf",
    category: "guidelines",
    sector: "livelihoods",
    language: ["english", "bangla"],
    downloads: 145,
    popularity: 4.5,
    dateAdded: "2024-02-01",
    fileSize: "2.7 MB",
    thumbnailUrl: "/placeholder.svg?height=200&width=150",
    fileUrl: "#",
    featured: false,
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

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [filteredResources, setFilteredResources] = useState(resourcesData)
  const [sortBy, setSortBy] = useState("popularity")
  const [showFilters, setShowFilters] = useState(false)
  const [previewResource, setPreviewResource] = useState(null)

  // Filter resources based on search and filter criteria
  useEffect(() => {
    let results = resourcesData

    // Search term filter
    if (searchTerm) {
      results = results.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      results = results.filter((resource) => resource.category === selectedCategory)
    }

    // Type filter
    if (selectedType !== "all") {
      results = results.filter((resource) => resource.type === selectedType)
    }

    // Sector filter
    if (selectedSector !== "all") {
      results = results.filter((resource) => resource.sector === selectedSector)
    }

    // Language filter
    if (selectedLanguage !== "all") {
      results = results.filter((resource) => resource.language.includes(selectedLanguage))
    }

    // Sort results
    if (sortBy === "popularity") {
      results = [...results].sort((a, b) => b.popularity - a.popularity)
    } else if (sortBy === "downloads") {
      results = [...results].sort((a, b) => b.downloads - a.downloads)
    } else if (sortBy === "newest") {
      results = [...results].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    } else if (sortBy === "oldest") {
      results = [...results].sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded))
    }

    setFilteredResources(results)
  }, [searchTerm, selectedCategory, selectedType, selectedSector, selectedLanguage, sortBy])

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedType("all")
    setSelectedSector("all")
    setSelectedLanguage("all")
    setSortBy("popularity")
  }

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

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-inclusion-blue/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-inclusion-blue">
                Resource Library
              </h1>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Access our comprehensive collection of disability inclusion resources, including guidelines, training
                materials, research reports, and tools.
              </p>

              {/* Search Bar */}
              <div className="w-full max-w-2xl mt-6">
                <div className="flex w-full items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search for resources by title, keyword, or description..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      aria-label="Search resources"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                    aria-expanded={showFilters}
                    aria-controls="filter-panel"
                  >
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                    {showFilters ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sort by</SelectLabel>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="downloads">Most Downloads</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Panel */}
        {showFilters && (
          <section className="w-full py-6 bg-muted/30 border-y" id="filter-panel">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Resource Type</h3>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
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
                  <h3 className="text-sm font-medium">Category</h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <h3 className="text-sm font-medium">Sector</h3>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      <SelectItem value="wash">WASH</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="protection">Protection</SelectItem>
                      <SelectItem value="shelter">Shelter</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                      <SelectItem value="cccm">Camp Coordination</SelectItem>
                      <SelectItem value="livelihoods">Livelihoods</SelectItem>
                      <SelectItem value="drr">Disaster Risk Reduction</SelectItem>
                      <SelectItem value="cash">Cash-Based Interventions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Language</h3>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="bangla">Bangla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button variant="outline" className="mr-2" onClick={resetFilters}>
                  Reset Filters
                </Button>
                <Button className="bg-inclusion-blue hover:bg-inclusion-blue/90" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Resource Categories Tabs */}
        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <ResourceGrid
                  resources={filteredResources}
                  getResourceTypeIcon={getResourceTypeIcon}
                  getResourceTypeLabel={getResourceTypeLabel}
                  setPreviewResource={setPreviewResource}
                />
              </TabsContent>

              <TabsContent value="guidelines" className="mt-6">
                <ResourceGrid
                  resources={filteredResources.filter((r) => r.category === "guidelines")}
                  getResourceTypeIcon={getResourceTypeIcon}
                  getResourceTypeLabel={getResourceTypeLabel}
                  setPreviewResource={setPreviewResource}
                />
              </TabsContent>

              <TabsContent value="training" className="mt-6">
                <ResourceGrid
                  resources={filteredResources.filter((r) => r.category === "training")}
                  getResourceTypeIcon={getResourceTypeIcon}
                  getResourceTypeLabel={getResourceTypeLabel}
                  setPreviewResource={setPreviewResource}
                />
              </TabsContent>

              <TabsContent value="research" className="mt-6">
                <ResourceGrid
                  resources={filteredResources.filter((r) => r.category === "research")}
                  getResourceTypeIcon={getResourceTypeIcon}
                  getResourceTypeLabel={getResourceTypeLabel}
                  setPreviewResource={setPreviewResource}
                />
              </TabsContent>

              <TabsContent value="tools" className="mt-6">
                <ResourceGrid
                  resources={filteredResources.filter((r) => r.category === "tools")}
                  getResourceTypeIcon={getResourceTypeIcon}
                  getResourceTypeLabel={getResourceTypeLabel}
                  setPreviewResource={setPreviewResource}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Featured Resources Section */}
        <section className="w-full py-12 bg-inclusion-yellow/10">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-6 text-inclusion-orange">
              Featured Resources
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resourcesData
                .filter((resource) => resource.featured)
                .slice(0, 3)
                .map((resource) => (
                  <Card key={resource.id} className="overflow-hidden border-l-4 border-inclusion-orange">
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-inclusion-orange/10 text-inclusion-orange">
                          Featured
                        </Badge>
                        <div className="flex items-center">
                          {getResourceTypeIcon(resource.type)}
                          <span className="ml-1 text-xs text-muted-foreground">
                            {getResourceTypeLabel(resource.type)}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          <span>{resource.downloads} downloads</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-inclusion-yellow" />
                          <span>{resource.popularity.toFixed(1)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-inclusion-blue"
                            onClick={() => setPreviewResource(resource)}
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <ResourcePreview resource={resource} />
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" className="bg-inclusion-teal hover:bg-inclusion-teal/90">
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Accessibility Features Section */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-6 text-inclusion-purple text-center">
                Accessible Resources
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Our resources are designed to be accessible to all users, including persons with disabilities.
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-inclusion-purple/10 flex items-center justify-center">
                      <Accessibility className="h-6 w-6 text-inclusion-purple" />
                    </div>
                    <CardTitle className="text-lg mt-2">Multiple Formats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Resources are available in multiple formats (PDF, Word, Video, Audio) to accommodate different
                      accessibility needs.
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-inclusion-blue/10 flex items-center justify-center">
                      <FileCheck className="h-6 w-6 text-inclusion-blue" />
                    </div>
                    <CardTitle className="text-lg mt-2">Screen Reader Compatible</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      All documents are optimized for screen readers, with proper headings, alternative text, and
                      document structure.
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-inclusion-teal/10 flex items-center justify-center">
                      <LanguagesIcon className="h-6 w-6 text-inclusion-teal" />
                    </div>
                    <CardTitle className="text-lg mt-2">Multilingual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Many resources are available in both English and Bangla to ensure accessibility for local and
                      international users.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Preview Dialog */}
        <Dialog>
          <DialogContent className="max-w-4xl">
            {previewResource && <ResourcePreview resource={previewResource} />}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

// Resource Grid Component
function ResourceGrid({ resources, getResourceTypeIcon, getResourceTypeLabel, setPreviewResource }) {
  return (
    <div>
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {resources.length} {resources.length === 1 ? "resource" : "resources"}
      </div>
      {resources.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No resources found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden">
              <div className="aspect-[3/2] relative">
                <Image
                  src={resource.thumbnailUrl || "/placeholder.svg"}
                  alt={`Thumbnail for ${resource.title}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {getResourceTypeIcon(resource.type)}
                    {getResourceTypeLabel(resource.type)}
                  </Badge>
                </div>
                {resource.featured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-inclusion-orange">Featured</Badge>
                  </div>
                )}
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    <span>{resource.downloads} downloads</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 mr-1 text-inclusion-yellow" />
                    <span>{resource.popularity.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{new Date(resource.dateAdded).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    <span>{resource.fileSize}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {resource.language.map((lang) => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang === "english" ? "English" : "বাংলা"}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-inclusion-blue"
                      onClick={() => setPreviewResource(resource)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      Preview
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button size="sm" className="bg-inclusion-teal hover:bg-inclusion-teal/90">
                  <Download className="mr-1 h-3 w-3" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// Resource Preview Component
function ResourcePreview({ resource }) {
  const getPreviewContent = () => {
    switch (resource.type) {
      case "pdf":
        return (
          <div className="bg-muted rounded-md p-4 flex flex-col items-center justify-center min-h-[400px]">
            <FileText className="h-16 w-16 text-inclusion-red mb-4" />
            <h3 className="text-lg font-medium mb-2">PDF Preview</h3>
            <p className="text-muted-foreground text-center mb-4">
              This is a preview of the PDF document. Download the full document for better viewing.
            </p>
            <Image
              src="/placeholder.svg?height=300&width=500&text=PDF Preview"
              alt="PDF preview"
              width={500}
              height={300}
              className="rounded-md border"
            />
          </div>
        )
      case "word":
        return (
          <div className="bg-muted rounded-md p-4 flex flex-col items-center justify-center min-h-[400px]">
            <FileType className="h-16 w-16 text-inclusion-blue mb-4" />
            <h3 className="text-lg font-medium mb-2">Word Document Preview</h3>
            <p className="text-muted-foreground text-center mb-4">
              This is a preview of the Word document. Download the full document for better viewing.
            </p>
            <Image
              src="/placeholder.svg?height=300&width=500&text=Word Document Preview"
              alt="Word document preview"
              width={500}
              height={300}
              className="rounded-md border"
            />
          </div>
        )
      case "video":
        return (
          <div className="bg-muted rounded-md p-4 flex flex-col items-center justify-center min-h-[400px]">
            <Video className="h-16 w-16 text-inclusion-purple mb-4" />
            <h3 className="text-lg font-medium mb-2">Video Preview</h3>
            <p className="text-muted-foreground text-center mb-4">
              This is a preview of the video. Download the full video for better viewing.
            </p>
            <div className="relative w-full max-w-[500px] aspect-video rounded-md border overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=500&text=Video Preview"
                alt="Video preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="icon" className="rounded-full bg-inclusion-purple/90 hover:bg-inclusion-purple">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        )
      case "audio":
        return (
          <div className="bg-muted rounded-md p-4 flex flex-col items-center justify-center min-h-[400px]">
            <AudioLines className="h-16 w-16 text-inclusion-green mb-4" />
            <h3 className="text-lg font-medium mb-2">Audio Preview</h3>
            <p className="text-muted-foreground text-center mb-4">
              This is a preview of the audio file. Download the full audio for better listening.
            </p>
            <div className="w-full max-w-[500px] p-4 bg-background rounded-md border">
              <div className="flex items-center gap-4">
                <Button size="icon" className="rounded-full bg-inclusion-green/90 hover:bg-inclusion-green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </Button>
                <div className="w-full">
                  <Slider defaultValue={[33]} max={100} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0:33</span>
                    <span>1:45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <div>No preview available</div>
    }
  }

  return (
    <DialogHeader>
      <DialogTitle className="text-xl">{resource.title}</DialogTitle>
      <DialogDescription>{resource.description}</DialogDescription>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr] mt-4">
        <div>{getPreviewContent()}</div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Resource Details</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Type:</dt>
                <dd className="font-medium flex items-center">
                  {getResourceTypeIcon(resource.type)}
                  <span className="ml-1">{getResourceTypeLabel(resource.type)}</span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Category:</dt>
                <dd className="font-medium capitalize">{resource.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Sector:</dt>
                <dd className="font-medium capitalize">{resource.sector}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">File Size:</dt>
                <dd className="font-medium">{resource.fileSize}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Date Added:</dt>
                <dd className="font-medium">{new Date(resource.dateAdded).toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Downloads:</dt>
                <dd className="font-medium">{resource.downloads}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Rating:</dt>
                <dd className="font-medium flex items-center">
                  {resource.popularity.toFixed(1)}
                  <Star className="h-4 w-4 ml-1 text-inclusion-yellow" />
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Languages:</dt>
                <dd className="font-medium">
                  <div className="flex gap-1">
                    {resource.language.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang === "english" ? "English" : "বাংলা"}
                      </Badge>
                    ))}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Accessibility Features</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Checkbox id="screen-reader" defaultChecked />
                <label htmlFor="screen-reader" className="text-sm">
                  Screen Reader Compatible
                </label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="alt-text" defaultChecked />
                <label htmlFor="alt-text" className="text-sm">
                  Alternative Text for Images
                </label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="keyboard" defaultChecked />
                <label htmlFor="keyboard" className="text-sm">
                  Keyboard Navigation
                </label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="captions" defaultChecked={resource.type === "video"} />
                <label htmlFor="captions" className="text-sm">
                  Closed Captions (for videos)
                </label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="transcripts" defaultChecked={resource.type === "audio" || resource.type === "video"} />
                <label htmlFor="transcripts" className="text-sm">
                  Transcripts (for audio/video)
                </label>
              </div>
            </div>
          </div>
          <Button className="w-full bg-inclusion-teal hover:bg-inclusion-teal/90">
            <Download className="mr-2 h-4 w-4" />
            Download Resource
          </Button>
        </div>
      </div>
    </DialogHeader>
  )
}
