import Image from "next/image"
import { ChevronRight, Users, Globe, FileCheck, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AccessibilityControls } from "@/components/accessibility-controls"

export default function AboutPage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-inclusion-purple/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex bg-inclusion-purple text-white" variant="outline">
                    About Us
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-inclusion-purple">
                    Humanity & Inclusion
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Working together to improve the lives of people with disabilities in humanitarian contexts
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Humanity & Inclusion team working in Cox's Bazar"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About HI Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-inclusion-blue mb-6">Our Mission</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Humanity & Inclusion (HI) is an independent and impartial aid organization working in situations of
                  poverty and exclusion, conflict and disaster. We work alongside people with disabilities and
                  vulnerable populations, taking action and bearing witness in order to respond to their essential
                  needs, improve their living conditions and promote respect for their dignity and fundamental rights.
                </p>
                <p>
                  Since 2017, HI has been working in Cox's Bazar, Bangladesh, to support Rohingya refugees and host
                  communities, with a particular focus on ensuring that persons with disabilities have access to
                  humanitarian services and are included in the response.
                </p>
                <h3 className="text-xl font-bold text-inclusion-teal mt-8 mb-4">Our Work in Cox's Bazar</h3>
                <p>
                  In Cox's Bazar, HI provides direct services to persons with disabilities, including rehabilitation,
                  psychosocial support, and assistive devices. We also work with humanitarian organizations to build
                  their capacity to include persons with disabilities in their programs and services.
                </p>
                <p>
                  Through our technical support and coordination role in the Age and Disability Technical Working Group
                  (ADTWG), we have developed numerous resources, guidelines, and training materials to support
                  disability inclusion in the humanitarian response.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Objectives Section */}
        <section className="w-full py-12 md:py-24 bg-inclusion-teal/10">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-inclusion-teal mb-6">Project Objectives</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  The Disability Inclusion Resource Hub is funded by the Australian Department of Foreign Affairs and
                  Trade (DFAT) as part of its commitment to disability-inclusive development. The project aims to:
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-inclusion-teal shrink-0 mt-0.5" />
                    <span>
                      Centralize disability inclusion resources developed over six years of humanitarian response
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-inclusion-teal shrink-0 mt-0.5" />
                    <span>Provide accessible training materials for humanitarian actors</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-inclusion-teal shrink-0 mt-0.5" />
                    <span>Build capacity of humanitarian organizations to implement inclusive practices</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-inclusion-teal shrink-0 mt-0.5" />
                    <span>Ensure sustainability of disability inclusion efforts through knowledge management</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-inclusion-teal shrink-0 mt-0.5" />
                    <span>
                      Support the implementation of the IASC Guidelines on Inclusion of Persons with Disabilities in
                      Humanitarian Action
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Stakeholders Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-inclusion-orange mb-6">Key Stakeholders</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">DFAT</CardTitle>
                    <CardDescription>Australian Department of Foreign Affairs and Trade</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Primary donor supporting disability-inclusive development and humanitarian action in the region.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">ISCG</CardTitle>
                    <CardDescription>Inter Sector Coordination Group</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Coordinates the overall humanitarian response in Cox's Bazar, ensuring inclusion is mainstreamed
                      across sectors.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">ADTWG</CardTitle>
                    <CardDescription>Age and Disability Technical Working Group</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Provides technical support on age and disability inclusion to humanitarian organizations in Cox's
                      Bazar.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Importance of Inclusion Section */}
        <section className="w-full py-12 md:py-24 bg-inclusion-green/10">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-inclusion-green mb-6">
                Importance of Disability Inclusion
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Persons with disabilities are among the most marginalized in crisis-affected communities. They face
                  multiple barriers to accessing humanitarian assistance, including physical, communication, and
                  attitudinal barriers. In disaster and conflict situations, these barriers are often exacerbated.
                </p>
                <p>
                  Including persons with disabilities in humanitarian action is not only a matter of rights and dignity,
                  but also of effectiveness and sustainability. When humanitarian programs are inclusive, they reach
                  more people, are more effective, and contribute to long-term development goals.
                </p>
                <div className="grid gap-6 md:grid-cols-2 mt-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-bold text-inclusion-green mb-2">15%</h3>
                    <p className="text-sm">
                      of the world's population lives with some form of disability, according to the World Health
                      Organization.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-bold text-inclusion-green mb-2">Up to 22%</h3>
                    <p className="text-sm">
                      of the refugee population in Cox's Bazar has a disability, higher than the global average.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Purpose Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-inclusion-blue mb-6">Purpose of the Platform</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  The Disability Inclusion Resource Hub serves as a centralized repository for disability inclusion
                  resources developed over the past six years of humanitarian response in Cox's Bazar. It aims to:
                </p>
                <ul className="space-y-4 mt-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-inclusion-blue/10 p-3 rounded-full">
                      <FileCheck className="h-6 w-6 text-inclusion-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground">Preserve Knowledge</h3>
                      <p className="text-muted-foreground">
                        Ensure that valuable resources and learning are not lost as projects end and staff transition.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-inclusion-teal/10 p-3 rounded-full">
                      <Globe className="h-6 w-6 text-inclusion-teal" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground">Increase Access</h3>
                      <p className="text-muted-foreground">
                        Make resources available to a wider audience, including new staff, partners, and other
                        humanitarian contexts.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-inclusion-purple/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-inclusion-purple" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground">Build Capacity</h3>
                      <p className="text-muted-foreground">
                        Provide training and learning opportunities to humanitarian actors to strengthen their inclusion
                        practices.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-inclusion-orange/10 p-3 rounded-full">
                      <Award className="h-6 w-6 text-inclusion-orange" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground">Promote Quality</h3>
                      <p className="text-muted-foreground">
                        Ensure that resources meet quality standards and are based on best practices and evidence.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Commitment Section */}
        <section className="w-full py-12 md:py-24 bg-inclusion-purple/10">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-inclusion-purple mb-6">
                Our Accessibility Commitment
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  We are committed to ensuring that the Disability Inclusion Resource Hub is accessible to all users,
                  including persons with disabilities. Our platform is designed to meet WCAG 2.1 AA standards and
                  includes features such as:
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-inclusion-purple shrink-0 mt-0.5" />
                    <span>Text resizing options for users with visual impairments</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-inclusion-purple shrink-0 mt-0.5" />
                    <span>High contrast mode for better readability</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-inclusion-purple shrink-0 mt-0.5" />
                    <span>Black and white mode for users with color blindness</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-inclusion-purple shrink-0 mt-0.5" />
                    <span>Text-to-speech functionality for screen reader users</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-inclusion-purple shrink-0 mt-0.5" />
                    <span>Keyboard navigation for users who cannot use a mouse</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-inclusion-purple shrink-0 mt-0.5" />
                    <span>Alternative text for images and multimedia content</span>
                  </li>
                </ul>
                <p className="mt-6">
                  We continuously work to improve the accessibility of our platform and welcome feedback from users on
                  how we can make it more inclusive. If you encounter any accessibility barriers or have suggestions for
                  improvement, please contact us through our support page.
                </p>
                <div className="mt-8">
                  <Button className="bg-inclusion-purple hover:bg-inclusion-purple/90">
                    View Our Accessibility Statement
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-inclusion-blue mb-6 text-center">Our Team</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                The Disability Inclusion Resource Hub is managed by a dedicated team of professionals with expertise in
                disability inclusion, humanitarian action, and knowledge management.
              </p>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src={`/placeholder.svg?height=96&width=96`}
                        alt={`Team member ${i}`}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold">Team Member {i}</h3>
                    <p className="text-sm text-muted-foreground">Position Title</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
