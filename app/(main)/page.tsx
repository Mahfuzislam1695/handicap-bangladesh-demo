import Link from "next/link"
import Image from "next/image"
import {
  ChevronRight,
  Download,
  FileText,
  Users,
  BarChart3,
  Search,
  BookOpen,
  Globe,
  Shield,
  Accessibility,
  Languages,
  Lock,
  FileCheck,
  Award,
  Clock,
  EyeOff,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AccessibilityControls } from "@/components/accessibility-controls"

export default function HomePage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-inclusion-blue/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex bg-inclusion-orange text-white" variant="outline">
                    DFAT Funded Project
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-inclusion-blue">
                    Disability Inclusion Resource Hub
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A centralized platform for disability inclusion resources supporting humanitarian actors in Cox's
                    Bazar, Bangladesh.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-inclusion-teal hover:bg-inclusion-teal/90">
                    Browse Resources
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-inclusion-purple text-inclusion-purple hover:bg-inclusion-purple/10"
                  >
                    Start Training
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Disability inclusion in humanitarian context"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Welcome Message / About Section */}
        <section className="w-full py-12 md:py-16 bg-inclusion-purple/10">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-inclusion-purple mb-4 text-center">
                Welcome to the Disability Inclusion Resource Hub
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  This platform serves as a centralized repository for disability inclusion resources developed over the
                  past six years of humanitarian response in Cox's Bazar. It aims to support humanitarian actors in
                  implementing inclusive practices that reach people with disabilities.
                </p>
                <p>
                  Developed by Humanity & Inclusion in collaboration with the Age and Disability Technical Working Group
                  (ADTWG), this hub provides access to guidelines, training materials, research reports, and practical
                  tools to support disability-inclusive humanitarian action.
                </p>
                <p>
                  All resources are designed to be accessible and follow WCAG 2.1 guidelines, ensuring that persons with
                  disabilities can access and utilize these materials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-inclusion-blue">
                  Platform Statistics
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Real-time metrics on resource utilization and platform engagement
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-6 py-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
                  <FileText className="h-4 w-4 text-inclusion-blue" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">245</div>
                  <p className="text-xs text-muted-foreground">+12 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                  <Download className="h-4 w-4 text-inclusion-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+256 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-inclusion-orange" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">+7 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Training Completions</CardTitle>
                  <Award className="h-4 w-4 text-inclusion-purple" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+23 this month</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Access Sections */}
        <section className="w-full py-12 md:py-24 bg-inclusion-yellow/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-inclusion-orange">Quick Access</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Access featured resources, latest training modules, and announcements
                </p>
              </div>
            </div>

            <Tabs defaultValue="featured" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="featured">Featured Resources</TabsTrigger>
                <TabsTrigger value="training">Latest Training</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
              </TabsList>

              <TabsContent value="featured" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <ResourceCard
                    title="Disability Inclusion in WASH"
                    description="Guidelines for inclusive WASH facilities in humanitarian settings"
                    downloads={78}
                    date="Apr 2023"
                    color="blue"
                    featured={true}
                  />
                  <ResourceCard
                    title="Inclusive Education in Emergencies"
                    description="Best practices for ensuring education access for children with disabilities"
                    downloads={64}
                    date="Jun 2023"
                    color="teal"
                    featured={true}
                  />
                  <ResourceCard
                    title="Accessible Shelter Guidelines"
                    description="Technical specifications for accessible shelter design"
                    downloads={52}
                    date="Feb 2024"
                    color="purple"
                    featured={true}
                  />
                </div>
              </TabsContent>

              <TabsContent value="training" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <TrainingCard
                    title="Disability Awareness Training"
                    description="Basic training module on disability awareness for humanitarian staff"
                    duration="2 hours"
                    date="Jan 2024"
                    color="orange"
                  />
                  <TrainingCard
                    title="Inclusive Communication"
                    description="Training on accessible communication methods and materials"
                    duration="3 hours"
                    date="Mar 2024"
                    color="green"
                  />
                  <TrainingCard
                    title="Data Collection on Disability"
                    description="Training on using the Washington Group Questions in humanitarian contexts"
                    duration="4 hours"
                    date="Dec 2023"
                    color="blue"
                  />
                </div>
              </TabsContent>

              <TabsContent value="announcements" className="mt-6">
                <div className="space-y-4">
                  <AnnouncementCard
                    title="New Training Module Released"
                    description="We've just released a new training module on inclusive shelter design. Check it out in the training section."
                    date="Apr 15, 2024"
                  />
                  <AnnouncementCard
                    title="Upcoming Webinar: Disability Inclusion in Emergency Response"
                    description="Join us for a webinar on disability inclusion in emergency response on May 5, 2024. Registration is now open."
                    date="Apr 10, 2024"
                  />
                  <AnnouncementCard
                    title="Platform Update: New Accessibility Features"
                    description="We've added new accessibility features to the platform, including improved screen reader compatibility and keyboard navigation."
                    date="Mar 28, 2024"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                className="border-inclusion-orange text-inclusion-orange hover:bg-inclusion-orange/10"
              >
                View All Resources
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-inclusion-blue">Find Resources</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Search our comprehensive collection of disability inclusion resources
                </p>
              </div>
              <div className="w-full max-w-2xl">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search for resources, guidelines, training materials..."
                    className="flex-1"
                    aria-label="Search resources"
                  />
                  <Button type="submit" className="bg-inclusion-teal hover:bg-inclusion-teal/90">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Documents Highlights */}
        <section className="w-full py-12 md:py-24 bg-inclusion-green/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-inclusion-green">Key Documents</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Essential resources for disability inclusion in humanitarian response
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <KeyDocumentCard
                title="Humanitarian Inclusion Standards"
                description="Standards for including persons with disabilities in humanitarian response"
                type="Guidelines"
                icon={<FileCheck className="h-8 w-8 text-inclusion-blue" />}
              />
              <KeyDocumentCard
                title="Washington Group Questions"
                description="Tools for identifying persons with disabilities in data collection"
                type="Assessment Tool"
                icon={<FileText className="h-8 w-8 text-inclusion-purple" />}
              />
              <KeyDocumentCard
                title="IASC Guidelines on Inclusion"
                description="Inter-Agency Standing Committee guidelines on inclusion of persons with disabilities"
                type="Guidelines"
                icon={<FileCheck className="h-8 w-8 text-inclusion-orange" />}
              />
              <KeyDocumentCard
                title="Accessibility Audit Toolkit"
                description="Tools for assessing physical accessibility of humanitarian facilities"
                type="Toolkit"
                icon={<FileText className="h-8 w-8 text-inclusion-teal" />}
              />
              <KeyDocumentCard
                title="Inclusive WASH Manual"
                description="Comprehensive guide for inclusive water, sanitation and hygiene programs"
                type="Manual"
                icon={<FileText className="h-8 w-8 text-inclusion-green" />}
              />
              <KeyDocumentCard
                title="Disability Data Collection Guide"
                description="Guide for collecting data on persons with disabilities in humanitarian contexts"
                type="Guide"
                icon={<FileCheck className="h-8 w-8 text-inclusion-red" />}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-inclusion-purple">
                  Platform Features
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Designed with accessibility and usability at its core
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Globe className="h-10 w-10 text-inclusion-blue" />}
                title="WCAG 2.1 AA Compliant"
                description="Built following international web accessibility standards to ensure access for all users, including those with disabilities."
              />
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-inclusion-teal" />}
                title="Comprehensive Resources"
                description="Centralized access to tools, guidelines, and training materials developed over six years of humanitarian response."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-inclusion-purple" />}
                title="GDPR Compliant"
                description="Robust security features to protect user data and sensitive information with regular updates."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-inclusion-orange" />}
                title="Usage Analytics"
                description="Track resource downloads, user engagement, and other metrics to improve content and user experience."
              />
              <FeatureCard
                icon={<Languages className="h-10 w-10 text-inclusion-green" />}
                title="Multilingual Support"
                description="Content available in English and Bangla to ensure accessibility for local and international users."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-inclusion-blue" />}
                title="Collaborative Platform"
                description="Regularly updated with new resources from ADTWG members and humanitarian organizations."
              />
              <FeatureCard
                icon={<EyeOff className="h-10 w-10 text-inclusion-purple" />}
                title="Color Blind Friendly"
                description="Special black and white theme designed for users with color vision deficiencies, ensuring content is accessible to all."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-inclusion-teal text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Our Community</h2>
                <p className="max-w-[700px] md:text-xl">
                  Register to access all resources and receive updates on new materials
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1 bg-white text-foreground placeholder:text-muted-foreground"
                    aria-label="Email address"
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    className="bg-inclusion-yellow text-foreground hover:bg-inclusion-yellow/90"
                  >
                    Register
                  </Button>
                </form>
                <p className="text-xs">
                  By registering, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-inclusion-blue">Our Partners</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Working together to improve disability inclusion in humanitarian response
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-8 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center p-4">
                  <Image
                    src={`/placeholder.svg?height=60&width=120`}
                    alt={`Partner logo ${i + 1}`}
                    width={120}
                    height={60}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>


    </div>
  )
}

// Resource Card Component
function ResourceCard({ title, description, downloads, date, color, featured = false }) {
  const colorClasses = {
    blue: "border-l-4 border-inclusion-blue",
    teal: "border-l-4 border-inclusion-teal",
    purple: "border-l-4 border-inclusion-purple",
    orange: "border-l-4 border-inclusion-orange",
    green: "border-l-4 border-inclusion-green",
    yellow: "border-l-4 border-inclusion-yellow",
    red: "border-l-4 border-inclusion-red",
  }

  return (
    <Card
      className={`overflow-hidden ${colorClasses[color] || ""} ${featured ? "ring-2 ring-inclusion-yellow ring-offset-2" : ""}`}
    >
      {featured && (
        <div className="bg-inclusion-yellow text-xs font-medium px-2 py-1 text-center text-foreground">
          Featured Resource
        </div>
      )}
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center">
          <Download className="h-3 w-3 mr-1" />
          <span>{downloads} downloads</span>
        </div>
        <div>Updated: {date}</div>
      </CardFooter>
    </Card>
  )
}

// Training Card Component
function TrainingCard({ title, description, duration, date, color }) {
  const colorClasses = {
    blue: "border-l-4 border-inclusion-blue",
    teal: "border-l-4 border-inclusion-teal",
    purple: "border-l-4 border-inclusion-purple",
    orange: "border-l-4 border-inclusion-orange",
    green: "border-l-4 border-inclusion-green",
    yellow: "border-l-4 border-inclusion-yellow",
    red: "border-l-4 border-inclusion-red",
  }

  return (
    <Card className={`overflow-hidden ${colorClasses[color] || ""}`}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>{duration}</span>
        </div>
        <div>Updated: {date}</div>
      </CardFooter>
    </Card>
  )
}

// Announcement Card Component
function AnnouncementCard({ title, description, date }) {
  return (
    <Card className="overflow-hidden border-l-4 border-inclusion-yellow">
      <CardHeader className="p-4">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className="text-xs bg-inclusion-yellow/20">
            {date}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

// Key Document Card Component
function KeyDocumentCard({ title, description, type, icon }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <Badge variant="outline" className="mb-1 text-xs">
              {type}
            </Badge>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="ghost" size="sm" className="text-inclusion-blue hover:text-inclusion-blue/80">
          View Document
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-6 pb-2 flex flex-col items-center text-center">
        {icon}
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-2 text-center">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
