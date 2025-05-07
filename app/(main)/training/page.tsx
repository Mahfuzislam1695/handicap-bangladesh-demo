"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  ChevronRight,
  Filter,
  Search,
  FileText,
  BarChart,
  Download,
  Play,
  Users,
  Star,
  Calendar,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AccessibilityControls } from "@/components/accessibility-controls"

// Mock training data
const trainingModules = [
  {
    id: 1,
    title: "Introduction to Disability Inclusion",
    description:
      "This foundational course introduces key concepts of disability inclusion in humanitarian contexts, covering disability models, barriers, and inclusive approaches.",
    level: "beginner",
    duration: "2 hours",
    modules: 5,
    category: "foundation",
    image: "/placeholder.svg?height=200&width=350&text=Disability+Inclusion",
    progress: 100,
    completed: true,
    certificate: true,
    featured: true,
    enrolledUsers: 245,
    rating: 4.8,
    lastUpdated: "2023-12-10",
  },
  {
    id: 2,
    title: "Inclusive WASH Programming",
    description:
      "Learn how to design and implement inclusive water, sanitation, and hygiene (WASH) programs that are accessible to persons with disabilities.",
    level: "intermediate",
    duration: "3 hours",
    modules: 6,
    category: "sector",
    image: "/placeholder.svg?height=200&width=350&text=Inclusive+WASH",
    progress: 75,
    completed: false,
    certificate: true,
    featured: true,
    enrolledUsers: 187,
    rating: 4.6,
    lastUpdated: "2024-01-15",
  },
  {
    id: 3,
    title: "Disability Data Collection",
    description:
      "This course covers methods for collecting data on persons with disabilities using the Washington Group Questions and other tools.",
    level: "intermediate",
    duration: "2.5 hours",
    modules: 4,
    category: "technical",
    image: "/placeholder.svg?height=200&width=350&text=Data+Collection",
    progress: 50,
    completed: false,
    certificate: true,
    featured: false,
    enrolledUsers: 156,
    rating: 4.7,
    lastUpdated: "2024-02-05",
  },
  {
    id: 4,
    title: "Inclusive Education in Emergencies",
    description:
      "Learn strategies for ensuring education programs in humanitarian contexts are accessible and inclusive for children with disabilities.",
    level: "intermediate",
    duration: "4 hours",
    modules: 8,
    category: "sector",
    image: "/placeholder.svg?height=200&width=350&text=Inclusive+Education",
    progress: 0,
    completed: false,
    certificate: true,
    featured: false,
    enrolledUsers: 132,
    rating: 4.5,
    lastUpdated: "2024-01-20",
  },
  {
    id: 5,
    title: "Disability-Inclusive Shelter Design",
    description:
      "This technical course covers principles and practical approaches for designing accessible shelter solutions in humanitarian settings.",
    level: "advanced",
    duration: "3.5 hours",
    modules: 7,
    category: "technical",
    image: "/placeholder.svg?height=200&width=350&text=Inclusive+Shelter",
    progress: 0,
    completed: false,
    certificate: true,
    featured: true,
    enrolledUsers: 98,
    rating: 4.9,
    lastUpdated: "2024-02-15",
  },
  {
    id: 6,
    title: "Communicating with Persons with Disabilities",
    description:
      "Learn effective and respectful communication techniques for interacting with persons with different types of disabilities.",
    level: "beginner",
    duration: "1.5 hours",
    modules: 3,
    category: "foundation",
    image: "/placeholder.svg?height=200&width=350&text=Inclusive+Communication",
    progress: 100,
    completed: true,
    certificate: true,
    featured: false,
    enrolledUsers: 215,
    rating: 4.7,
    lastUpdated: "2023-11-05",
  },
]

// Mock upcoming training events
const upcomingEvents = [
  {
    id: 1,
    title: "Webinar: Disability Inclusion in Humanitarian Response",
    date: "2024-05-15T14:00:00",
    duration: "1.5 hours",
    type: "webinar",
    presenter: "Dr. Sarah Johnson",
    registrationLink: "#",
  },
  {
    id: 2,
    title: "Workshop: Practical Approaches to Inclusive Programming",
    date: "2024-05-22T10:00:00",
    duration: "3 hours",
    type: "workshop",
    presenter: "Michael Chen & Team",
    registrationLink: "#",
  },
  {
    id: 3,
    title: "Panel Discussion: Voices of Persons with Disabilities in Humanitarian Contexts",
    date: "2024-06-03T15:30:00",
    duration: "2 hours",
    type: "panel",
    presenter: "Multiple Speakers",
    registrationLink: "#",
  },
]

export default function TrainingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Filter training modules based on search and filter criteria
  const filteredModules = trainingModules.filter((module) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Level filter
    const matchesLevel = selectedLevel === "all" || module.level === selectedLevel

    // Category filter
    const matchesCategory = selectedCategory === "all" || module.category === selectedCategory

    return matchesSearch && matchesLevel && matchesCategory
  })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  // Get level badge
  const getLevelBadge = (level) => {
    switch (level) {
      case "beginner":
        return <Badge className="bg-inclusion-green">Beginner</Badge>
      case "intermediate":
        return <Badge className="bg-inclusion-blue">Intermediate</Badge>
      case "advanced":
        return <Badge className="bg-inclusion-purple">Advanced</Badge>
      default:
        return <Badge variant="outline">{level}</Badge>
    }
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-inclusion-teal/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex bg-inclusion-teal text-white" variant="outline">
                    Training & Certification
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-inclusion-teal">
                    Build Your Inclusion Skills
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Access self-paced training modules designed to enhance your knowledge and skills in disability
                    inclusion for humanitarian contexts.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#available-courses">
                    <Button size="lg" className="bg-inclusion-teal hover:bg-inclusion-teal/90">
                      Browse Courses
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/training/certificates">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-inclusion-purple text-inclusion-purple hover:bg-inclusion-purple/10"
                    >
                      View My Certificates
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=500&text=Training+Modules"
                  alt="Training and certification illustration"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* My Progress Section (for logged-in users) */}
        <section className="w-full py-12 bg-inclusion-blue/5 border-y">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-inclusion-blue">My Learning Journey</h2>
                <p className="text-muted-foreground">Track your progress and continue your learning path.</p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                View Detailed Progress
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trainingModules
                .filter((module) => module.progress > 0)
                .slice(0, 3)
                .map((module) => (
                  <Card key={module.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                        <Image
                          src={module.image || "/placeholder.svg"}
                          alt={module.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {module.completed && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-green-500">Completed</Badge>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-inclusion-teal" />
                          <span className="text-sm text-muted-foreground">{module.modules} Modules</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-inclusion-teal" />
                          <span className="text-sm text-muted-foreground">{module.duration}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{module.title}</h3>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Link href={`/training/player/${module.id}`}>
                        <Button variant="outline" size="sm">
                          {module.completed ? "Review Course" : "Continue"}
                        </Button>
                      </Link>
                      {module.completed && module.certificate && (
                        <Button size="sm" className="bg-inclusion-purple hover:bg-inclusion-purple/90">
                          <Download className="mr-2 h-4 w-4" />
                          Certificate
                        </Button>
                      )}
                    </CardFooter>
                    {module.completed && (
                      <div className="px-4 pb-4">
                        <Link href={`/training/quiz/${module.id}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Take Quiz Again
                          </Button>
                        </Link>
                      </div>
                    )}
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Available Courses Section */}
        <section id="available-courses" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Available Courses</h2>
                <p className="text-muted-foreground">Browse our collection of self-paced training modules.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-10 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="grid gap-4 md:grid-cols-2 p-4 border rounded-lg bg-muted/30 mb-6">
                <div className="space-y-2">
                  <label htmlFor="level-filter" className="text-sm font-medium">
                    Level
                  </label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger id="level-filter">
                      <SelectValue placeholder="Filter by level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                      <SelectItem value="foundation">Foundation</SelectItem>
                      <SelectItem value="sector">Sector-Specific</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="popular">Most Popular</TabsTrigger>
                <TabsTrigger value="new">Newest</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredModules.map((module) => (
                    <CourseCard key={module.id} module={module} getLevelBadge={getLevelBadge} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="featured" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredModules
                    .filter((module) => module.featured)
                    .map((module) => (
                      <CourseCard key={module.id} module={module} getLevelBadge={getLevelBadge} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="popular" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredModules
                    .sort((a, b) => b.enrolledUsers - a.enrolledUsers)
                    .map((module) => (
                      <CourseCard key={module.id} module={module} getLevelBadge={getLevelBadge} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="new" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredModules
                    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
                    .map((module) => (
                      <CourseCard key={module.id} module={module} getLevelBadge={getLevelBadge} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Upcoming Live Training Events */}
        <section className="w-full py-12 md:py-24 bg-inclusion-purple/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-inclusion-purple">Upcoming Live Events</h2>
                <p className="text-muted-foreground">
                  Join our live webinars, workshops, and panel discussions for interactive learning.
                </p>
              </div>
              <Button variant="outline" className="border-inclusion-purple text-inclusion-purple">
                View All Events
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <Badge
                        variant="outline"
                        className={
                          event.type === "webinar"
                            ? "bg-inclusion-blue/10 text-inclusion-blue"
                            : event.type === "workshop"
                              ? "bg-inclusion-teal/10 text-inclusion-teal"
                              : "bg-inclusion-orange/10 text-inclusion-orange"
                        }
                      >
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{event.duration}</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-inclusion-purple" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-inclusion-purple" />
                        <span>Presenter: {event.presenter}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-inclusion-purple hover:bg-inclusion-purple/90">Register Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certification Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Earn Recognized Certificates</h2>
                <p className="text-muted-foreground mb-6">
                  Upon successful completion of our training modules, you'll receive a certificate that recognizes your
                  knowledge and skills in disability inclusion. These certificates can be added to your professional
                  profile and shared with employers.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-inclusion-teal/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-4 w-4 text-inclusion-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Complete All Modules</p>
                      <p className="text-sm text-muted-foreground">
                        Work through all course materials at your own pace.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-inclusion-teal/10 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-inclusion-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Pass the Assessment</p>
                      <p className="text-sm text-muted-foreground">
                        Successfully complete the end-of-course assessment with a score of 80% or higher.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-inclusion-teal/10 flex items-center justify-center shrink-0">
                      <Award className="h-4 w-4 text-inclusion-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Receive Your Certificate</p>
                      <p className="text-sm text-muted-foreground">
                        Download your personalized certificate immediately upon completion.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button className="bg-inclusion-teal hover:bg-inclusion-teal/90">
                    View Sample Certificate
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md aspect-[4/3] border-8 border-inclusion-teal/20 rounded-lg shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=400&text=Sample+Certificate"
                    alt="Sample certificate"
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-inclusion-blue/5 border-t">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our training and certification program.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Are the courses free?</h3>
                <p className="text-muted-foreground">
                  Yes, all training modules are free and accessible to humanitarian actors working in Cox's Bazar.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">How long do I have access to the courses?</h3>
                <p className="text-muted-foreground">
                  Once enrolled, you have unlimited access to the course materials. You can revisit them at any time.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Can I download materials for offline use?</h3>
                <p className="text-muted-foreground">
                  Yes, most course materials can be downloaded for offline use, including PDFs, presentations, and
                  worksheets.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Are the certificates internationally recognized?</h3>
                <p className="text-muted-foreground">
                  The certificates are recognized by Humanity & Inclusion and partner organizations. They demonstrate
                  your knowledge and skills in disability inclusion.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">How do I track my progress?</h3>
                <p className="text-muted-foreground">
                  Your progress is automatically tracked in your user dashboard. You can see which modules you've
                  completed and your assessment scores.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Are the courses accessible for persons with disabilities?</h3>
                <p className="text-muted-foreground">
                  Yes, all courses are designed to be accessible, with features like screen reader compatibility,
                  transcripts for videos, and adjustable text size.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-inclusion-teal text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Ready to Start Learning?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Enhance your knowledge and skills in disability inclusion. Our self-paced training modules are designed to
              help you implement inclusive practices in humanitarian contexts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#available-courses">
                <Button size="lg" variant="secondary" className="bg-white text-inclusion-teal hover:bg-white/90">
                  Browse Courses
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 hover:text-white"
                >
                  View My Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Course Card Component
function CourseCard({ module, getLevelBadge }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={module.image || "/placeholder.svg"}
          alt={module.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {module.featured && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-inclusion-orange">Featured</Badge>
          </div>
        )}
        <div className="absolute top-2 right-2">{getLevelBadge(module.level)}</div>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-inclusion-teal" />
            <span className="text-sm text-muted-foreground">{module.modules} Modules</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-inclusion-teal" />
            <span className="text-sm text-muted-foreground">{module.duration}</span>
          </div>
        </div>
        <CardTitle className="text-lg">{module.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{module.description}</p>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{module.enrolledUsers} enrolled</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-inclusion-yellow" />
            <span className="text-muted-foreground">{module.rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link href={`/training/player/${module.id}`} className="w-full">
          <Button className="w-full">
            {module.progress > 0 ? (module.completed ? "Review Course" : "Continue Course") : "Start Course"}
            {module.progress > 0 ? null : <Play className="ml-2 h-4 w-4" />}
          </Button>
        </Link>
      </CardFooter>
      {module.completed && (
        <div className="px-4 pb-4">
          <Link href={`/training/quiz/${module.id}`} className="w-full">
            <Button variant="outline" size="sm" className="w-full">
              Take Quiz Again
            </Button>
          </Link>
        </div>
      )}
    </Card>
  )
}
// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import {
//   BookOpen,
//   Clock,
//   Award,
//   CheckCircle,
//   ChevronRight,
//   Filter,
//   Search,
//   FileText,
//   BarChart,
//   Download,
//   Play,
//   Users,
//   Star,
//   Calendar,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Progress } from "@/components/ui/progress"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { AccessibilityControls } from "@/components/accessibility-controls"

// // Mock training data
// const trainingModules = [
//   {
//     id: 1,
//     title: "Introduction to Disability Inclusion",
//     description:
//       "This foundational course introduces key concepts of disability inclusion in humanitarian contexts, covering disability models, barriers, and inclusive approaches.",
//     level: "beginner",
//     duration: "2 hours",
//     modules: 5,
//     category: "foundation",
//     image: "/placeholder.svg?height=200&width=350&text=Disability+Inclusion",
//     progress: 100,
//     completed: true,
//     certificate: true,
//     featured: true,
//     enrolledUsers: 245,
//     rating: 4.8,
//     lastUpdated: "2023-12-10",
//   },
//   {
//     id: 2,
//     title: "Inclusive WASH Programming",
//     description:
//       "Learn how to design and implement inclusive water, sanitation, and hygiene (WASH) programs that are accessible to persons with disabilities.",
//     level: "intermediate",
//     duration: "3 hours",
//     modules: 6,
//     category: "sector",
//     image: "/placeholder.svg?height=200&width=350&text=Inclusive+WASH",
//     progress: 75,
//     completed: false,
//     certificate: true,
//     featured: true,
//     enrolledUsers: 187,
//     rating: 4.6,
//     lastUpdated: "2024-01-15",
//   },
//   {
//     id: 3,
//     title: "Disability Data Collection",
//     description:
//       "This course covers methods for collecting data on persons with disabilities using the Washington Group Questions and other tools.",
//     level: "intermediate",
//     duration: "2.5 hours",
//     modules: 4,
//     category: "technical",
//     image: "/placeholder.svg?height=200&width=350&text=Data+Collection",
//     progress: 50,
//     completed: false,
//     certificate: true,
//     featured: false,
//     enrolledUsers: 156,
//     rating: 4.7,
//     lastUpdated: "2024-02-05",
//   },
//   {
//     id: 4,
//     title: "Inclusive Education in Emergencies",
//     description:
//       "Learn strategies for ensuring education programs in humanitarian contexts are accessible and inclusive for children with disabilities.",
//     level: "intermediate",
//     duration: "4 hours",
//     modules: 8,
//     category: "sector",
//     image: "/placeholder.svg?height=200&width=350&text=Inclusive+Education",
//     progress: 0,
//     completed: false,
//     certificate: true,
//     featured: false,
//     enrolledUsers: 132,
//     rating: 4.5,
//     lastUpdated: "2024-01-20",
//   },
//   {
//     id: 5,
//     title: "Disability-Inclusive Shelter Design",
//     description:
//       "This technical course covers principles and practical approaches for designing accessible shelter solutions in humanitarian settings.",
//     level: "advanced",
//     duration: "3.5 hours",
//     modules: 7,
//     category: "technical",
//     image: "/placeholder.svg?height=200&width=350&text=Inclusive+Shelter",
//     progress: 0,
//     completed: false,
//     certificate: true,
//     featured: true,
//     enrolledUsers: 98,
//     rating: 4.9,
//     lastUpdated: "2024-02-15",
//   },
//   {
//     id: 6,
//     title: "Communicating with Persons with Disabilities",
//     description:
//       "Learn effective and respectful communication techniques for interacting with persons with different types of disabilities.",
//     level: "beginner",
//     duration: "1.5 hours",
//     modules: 3,
//     category: "foundation",
//     image: "/placeholder.svg?height=200&width=350&text=Inclusive+Communication",
//     progress: 100,
//     completed: true,
//     certificate: true,
//     featured: false,
//     enrolledUsers: 215,
//     rating: 4.7,
//     lastUpdated: "2023-11-05",
//   },
// ]

// // Mock upcoming training events
// const upcomingEvents = [
//   {
//     id: 1,
//     title: "Webinar: Disability Inclusion in Humanitarian Response",
//     date: "2024-05-15T14:00:00",
//     duration: "1.5 hours",
//     type: "webinar",
//     presenter: "Dr. Sarah Johnson",
//     registrationLink: "#",
//   },
//   {
//     id: 2,
//     title: "Workshop: Practical Approaches to Inclusive Programming",
//     date: "2024-05-22T10:00:00",
//     duration: "3 hours",
//     type: "workshop",
//     presenter: "Michael Chen & Team",
//     registrationLink: "#",
//   },
//   {
//     id: 3,
//     title: "Panel Discussion: Voices of Persons with Disabilities in Humanitarian Contexts",
//     date: "2024-06-03T15:30:00",
//     duration: "2 hours",
//     type: "panel",
//     presenter: "Multiple Speakers",
//     registrationLink: "#",
//   },
// ]

// export default function TrainingPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedLevel, setSelectedLevel] = useState("all")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [showFilters, setShowFilters] = useState(false)

//   // Filter training modules based on search and filter criteria
//   const filteredModules = trainingModules.filter((module) => {
//     // Search filter
//     const matchesSearch =
//       searchTerm === "" ||
//       module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       module.description.toLowerCase().includes(searchTerm.toLowerCase())

//     // Level filter
//     const matchesLevel = selectedLevel === "all" || module.level === selectedLevel

//     // Category filter
//     const matchesCategory = selectedCategory === "all" || module.category === selectedCategory

//     return matchesSearch && matchesLevel && matchesCategory
//   })

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//     }).format(date)
//   }

//   // Get level badge
//   const getLevelBadge = (level) => {
//     switch (level) {
//       case "beginner":
//         return <Badge className="bg-inclusion-green">Beginner</Badge>
//       case "intermediate":
//         return <Badge className="bg-inclusion-blue">Intermediate</Badge>
//       case "advanced":
//         return <Badge className="bg-inclusion-purple">Advanced</Badge>
//       default:
//         return <Badge variant="outline">{level}</Badge>
//     }
//   }

//   return (
//     <div className="flex min-h-screen flex-col mt-80">
//       {/* Skip to content link for accessibility */}
//       <a
//         href="#main-content"
//         className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
//       >
//         Skip to content
//       </a>

//       {/* Accessibility Controls */}
//       <AccessibilityControls />

//       <main id="main-content" className="flex-1">
//         {/* Hero Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-inclusion-teal/10 to-background">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <Badge className="inline-flex bg-inclusion-teal text-white" variant="outline">
//                     Training & Certification
//                   </Badge>
//                   <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-inclusion-teal">
//                     Build Your Inclusion Skills
//                   </h1>
//                   <p className="max-w-[600px] text-muted-foreground md:text-xl">
//                     Access self-paced training modules designed to enhance your knowledge and skills in disability
//                     inclusion for humanitarian contexts.
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                   <Button size="lg" className="bg-inclusion-teal hover:bg-inclusion-teal/90">
//                     Browse Courses
//                     <ChevronRight className="ml-2 h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="lg"
//                     className="border-inclusion-purple text-inclusion-purple hover:bg-inclusion-purple/10"
//                   >
//                     View My Certificates
//                   </Button>
//                 </div>
//               </div>
//               <div className="flex items-center justify-center">
//                 <Image
//                   src="/placeholder.svg?height=400&width=500&text=Training+Modules"
//                   alt="Training and certification illustration"
//                   width={500}
//                   height={400}
//                   className="rounded-lg object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* My Progress Section (for logged-in users) */}
//         <section className="w-full py-12 bg-inclusion-blue/5 border-y">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//               <div>
//                 <h2 className="text-2xl font-bold tracking-tight text-inclusion-blue">My Learning Journey</h2>
//                 <p className="text-muted-foreground">Track your progress and continue your learning path.</p>
//               </div>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <BarChart className="h-4 w-4" />
//                 View Detailed Progress
//               </Button>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {trainingModules
//                 .filter((module) => module.progress > 0)
//                 .slice(0, 3)
//                 .map((module) => (
//                   <Card key={module.id} className="overflow-hidden">
//                     <CardHeader className="p-0">
//                       <div className="relative h-48 w-full">
//                         <Image
//                           src={module.image || "/placeholder.svg"}
//                           alt={module.title}
//                           fill
//                           className="object-cover"
//                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                         />
//                         {module.completed && (
//                           <div className="absolute top-2 right-2">
//                             <Badge className="bg-green-500">Completed</Badge>
//                           </div>
//                         )}
//                       </div>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="flex justify-between items-center mb-2">
//                         <div className="flex items-center gap-2">
//                           <BookOpen className="h-4 w-4 text-inclusion-teal" />
//                           <span className="text-sm text-muted-foreground">{module.modules} Modules</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Clock className="h-4 w-4 text-inclusion-teal" />
//                           <span className="text-sm text-muted-foreground">{module.duration}</span>
//                         </div>
//                       </div>
//                       <h3 className="text-lg font-bold mb-2">{module.title}</h3>
//                       <div className="mb-4">
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>Progress</span>
//                           <span>{module.progress}%</span>
//                         </div>
//                         <Progress value={module.progress} className="h-2" />
//                       </div>
//                     </CardContent>
//                     <CardFooter className="p-4 pt-0 flex justify-between">
//                       <Button variant="outline" size="sm">
//                         {module.completed ? "Review Course" : "Continue"}
//                       </Button>
//                       {module.completed && module.certificate && (
//                         <Button size="sm" className="bg-inclusion-purple hover:bg-inclusion-purple/90">
//                           <Download className="mr-2 h-4 w-4" />
//                           Certificate
//                         </Button>
//                       )}
//                     </CardFooter>
//                   </Card>
//                 ))}
//             </div>
//           </div>
//         </section>

//         {/* Available Courses Section */}
//         <section className="w-full py-12 md:py-24">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//               <div>
//                 <h2 className="text-2xl font-bold tracking-tight">Available Courses</h2>
//                 <p className="text-muted-foreground">Browse our collection of self-paced training modules.</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search courses..."
//                     className="pl-10 w-[250px]"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <Button
//                   variant="outline"
//                   className="flex items-center gap-2"
//                   onClick={() => setShowFilters(!showFilters)}
//                 >
//                   <Filter className="h-4 w-4" />
//                   Filters
//                 </Button>
//               </div>
//             </div>

//             {showFilters && (
//               <div className="grid gap-4 md:grid-cols-2 p-4 border rounded-lg bg-muted/30 mb-6">
//                 <div className="space-y-2">
//                   <label htmlFor="level-filter" className="text-sm font-medium">
//                     Level
//                   </label>
//                   <Select value={selectedLevel} onValueChange={setSelectedLevel}>
//                     <SelectTrigger id="level-filter">
//                       <SelectValue placeholder="Filter by level" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Levels</SelectItem>
//                       <SelectItem value="beginner">Beginner</SelectItem>
//                       <SelectItem value="intermediate">Intermediate</SelectItem>
//                       <SelectItem value="advanced">Advanced</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <label htmlFor="category-filter" className="text-sm font-medium">
//                     Category
//                   </label>
//                   <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                     <SelectTrigger id="category-filter">
//                       <SelectValue placeholder="Filter by category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Categories</SelectItem>
//                       <SelectItem value="foundation">Foundation</SelectItem>
//                       <SelectItem value="sector">Sector-Specific</SelectItem>
//                       <SelectItem value="technical">Technical</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             )}

//             <Tabs defaultValue="all" className="space-y-6">
//               <TabsList>
//                 <TabsTrigger value="all">All Courses</TabsTrigger>
//                 <TabsTrigger value="featured">Featured</TabsTrigger>
//                 <TabsTrigger value="popular">Most Popular</TabsTrigger>
//                 <TabsTrigger value="new">Newest</TabsTrigger>
//               </TabsList>

//               <TabsContent value="all" className="space-y-6">
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   {filteredModules.map((module) => (
//                     <CourseCard key={module.id} module={module} getLevelBadge={getLevelBadge} />
//                   ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value="featured" className="space-y-6">
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   {filteredModules
//                     .filter((module) => module.featured)
//                     .map((module) => (
//                       <CourseCard key={module.id} module={module} getLevelBadge={getLevelBadge} />
//                     ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value="popular" className="space-y-6">
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   {filteredModules
//                     .sort((a, b) => b.enrolledUsers - a.enrolledUsers)
//                     .map((module) => (
//                       <CourseCard key={module.id} module={module} getLevelBadge={getLevelBadge} />
//                     ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value="new" className="space-y-6">
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   {filteredModules
//                     .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
//                     .map((module) => (
//                       <CourseCard key={module.id} module={module} getLevelBadge={getLevelBadge} />
//                     ))}
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </section>

//         {/* Upcoming Live Training Events */}
//         <section className="w-full py-12 md:py-24 bg-inclusion-purple/10">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//               <div>
//                 <h2 className="text-2xl font-bold tracking-tight text-inclusion-purple">Upcoming Live Events</h2>
//                 <p className="text-muted-foreground">
//                   Join our live webinars, workshops, and panel discussions for interactive learning.
//                 </p>
//               </div>
//               <Button variant="outline" className="border-inclusion-purple text-inclusion-purple">
//                 View All Events
//               </Button>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {upcomingEvents.map((event) => (
//                 <Card key={event.id} className="overflow-hidden">
//                   <CardHeader className="p-4 pb-2">
//                     <div className="flex justify-between items-start">
//                       <Badge
//                         variant="outline"
//                         className={
//                           event.type === "webinar"
//                             ? "bg-inclusion-blue/10 text-inclusion-blue"
//                             : event.type === "workshop"
//                               ? "bg-inclusion-teal/10 text-inclusion-teal"
//                               : "bg-inclusion-orange/10 text-inclusion-orange"
//                         }
//                       >
//                         {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
//                       </Badge>
//                       <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                         <Clock className="h-3 w-3" />
//                         <span>{event.duration}</span>
//                       </div>
//                     </div>
//                     <CardTitle className="mt-2">{event.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4 pt-0">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sm">
//                         <Calendar className="h-4 w-4 text-inclusion-purple" />
//                         <span>{formatDate(event.date)}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm">
//                         <Users className="h-4 w-4 text-inclusion-purple" />
//                         <span>Presenter: {event.presenter}</span>
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="p-4 pt-0">
//                     <Button className="w-full bg-inclusion-purple hover:bg-inclusion-purple/90">Register Now</Button>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Certification Section */}
//         <section className="w-full py-12 md:py-24">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-2 items-center">
//               <div>
//                 <h2 className="text-2xl font-bold tracking-tight mb-4">Earn Recognized Certificates</h2>
//                 <p className="text-muted-foreground mb-6">
//                   Upon successful completion of our training modules, you'll receive a certificate that recognizes your
//                   knowledge and skills in disability inclusion. These certificates can be added to your professional
//                   profile and shared with employers.
//                 </p>
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-full bg-inclusion-teal/10 flex items-center justify-center shrink-0">
//                       <CheckCircle className="h-4 w-4 text-inclusion-teal" />
//                     </div>
//                     <div>
//                       <p className="font-medium">Complete All Modules</p>
//                       <p className="text-sm text-muted-foreground">
//                         Work through all course materials at your own pace.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-full bg-inclusion-teal/10 flex items-center justify-center shrink-0">
//                       <FileText className="h-4 w-4 text-inclusion-teal" />
//                     </div>
//                     <div>
//                       <p className="font-medium">Pass the Assessment</p>
//                       <p className="text-sm text-muted-foreground">
//                         Successfully complete the end-of-course assessment with a score of 80% or higher.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-full bg-inclusion-teal/10 flex items-center justify-center shrink-0">
//                       <Award className="h-4 w-4 text-inclusion-teal" />
//                     </div>
//                     <div>
//                       <p className="font-medium">Receive Your Certificate</p>
//                       <p className="text-sm text-muted-foreground">
//                         Download your personalized certificate immediately upon completion.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-8">
//                   <Button className="bg-inclusion-teal hover:bg-inclusion-teal/90">
//                     View Sample Certificate
//                     <ChevronRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//               <div className="flex justify-center">
//                 <div className="relative w-full max-w-md aspect-[4/3] border-8 border-inclusion-teal/20 rounded-lg shadow-lg">
//                   <Image
//                     src="/placeholder.svg?height=300&width=400&text=Sample+Certificate"
//                     alt="Sample certificate"
//                     fill
//                     className="object-cover rounded"
//                     sizes="(max-width: 768px) 100vw, 400px"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section className="w-full py-12 md:py-24 bg-inclusion-blue/5 border-t">
//           <div className="container px-4 md:px-6">
//             <div className="max-w-3xl mx-auto text-center mb-10">
//               <h2 className="text-2xl font-bold tracking-tight mb-2">Frequently Asked Questions</h2>
//               <p className="text-muted-foreground">
//                 Find answers to common questions about our training and certification program.
//               </p>
//             </div>
//             <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium">Are the courses free?</h3>
//                 <p className="text-muted-foreground">
//                   Yes, all training modules are free and accessible to humanitarian actors working in Cox's Bazar.
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium">How long do I have access to the courses?</h3>
//                 <p className="text-muted-foreground">
//                   Once enrolled, you have unlimited access to the course materials. You can revisit them at any time.
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium">Can I download materials for offline use?</h3>
//                 <p className="text-muted-foreground">
//                   Yes, most course materials can be downloaded for offline use, including PDFs, presentations, and
//                   worksheets.
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium">Are the certificates internationally recognized?</h3>
//                 <p className="text-muted-foreground">
//                   The certificates are recognized by Humanity & Inclusion and partner organizations. They demonstrate
//                   your knowledge and skills in disability inclusion.
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium">How do I track my progress?</h3>
//                 <p className="text-muted-foreground">
//                   Your progress is automatically tracked in your user dashboard. You can see which modules you've
//                   completed and your assessment scores.
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium">Are the courses accessible for persons with disabilities?</h3>
//                 <p className="text-muted-foreground">
//                   Yes, all courses are designed to be accessible, with features like screen reader compatibility,
//                   transcripts for videos, and adjustable text size.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="w-full py-12 md:py-24 bg-inclusion-teal text-white">
//           <div className="container px-4 md:px-6 text-center">
//             <h2 className="text-2xl font-bold tracking-tight mb-4">Ready to Start Learning?</h2>
//             <p className="max-w-2xl mx-auto mb-8">
//               Enhance your knowledge and skills in disability inclusion. Our self-paced training modules are designed to
//               help you implement inclusive practices in humanitarian contexts.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button size="lg" variant="secondary" className="bg-white text-inclusion-teal hover:bg-white/90">
//                 Browse Courses
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white text-white hover:bg-white/10 hover:text-white"
//               >
//                 View My Dashboard
//               </Button>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

// // Course Card Component
// function CourseCard({ module, getLevelBadge }) {
//   return (
//     <Card className="overflow-hidden h-full flex flex-col">
//       <div className="relative h-48 w-full">
//         <Image
//           src={module.image || "/placeholder.svg"}
//           alt={module.title}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//         {module.featured && (
//           <div className="absolute top-2 left-2">
//             <Badge className="bg-inclusion-orange">Featured</Badge>
//           </div>
//         )}
//         <div className="absolute top-2 right-2">{getLevelBadge(module.level)}</div>
//       </div>
//       <CardHeader className="p-4 pb-2">
//         <div className="flex justify-between items-center mb-1">
//           <div className="flex items-center gap-2">
//             <BookOpen className="h-4 w-4 text-inclusion-teal" />
//             <span className="text-sm text-muted-foreground">{module.modules} Modules</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Clock className="h-4 w-4 text-inclusion-teal" />
//             <span className="text-sm text-muted-foreground">{module.duration}</span>
//           </div>
//         </div>
//         <CardTitle className="text-lg">{module.title}</CardTitle>
//       </CardHeader>
//       <CardContent className="p-4 pt-0 flex-grow">
//         <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{module.description}</p>
//         <div className="flex justify-between items-center text-sm">
//           <div className="flex items-center gap-1">
//             <Users className="h-4 w-4 text-muted-foreground" />
//             <span className="text-muted-foreground">{module.enrolledUsers} enrolled</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Star className="h-4 w-4 text-inclusion-yellow" />
//             <span className="text-muted-foreground">{module.rating}</span>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="p-4 pt-0 mt-auto">
//         <Button className="w-full">
//           {module.progress > 0 ? (module.completed ? "Review Course" : "Continue Course") : "Start Course"}
//           {module.progress > 0 ? null : <Play className="ml-2 h-4 w-4" />}
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }
