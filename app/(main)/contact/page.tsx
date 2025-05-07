import Image from "next/image"
import { ChevronDown, Mail, Phone, MapPin, Clock, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AccessibilityControls } from "@/components/accessibility-controls"

export default function ContactPage() {
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
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-inclusion-teal">
                Contact & Support
              </h1>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Get in touch with our team for inquiries, technical support, or feedback on the Disability Inclusion
                Resource Hub.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-6 text-inclusion-blue">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below to send us a message. We'll get back to you as soon as possible.
                </p>
                <form className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        First name
                      </label>
                      <Input id="first-name" placeholder="Enter your first name" required />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="last-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Last name
                      </label>
                      <Input id="last-name" placeholder="Enter your last name" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="organization"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Organization
                    </label>
                    <Input id="organization" placeholder="Enter your organization" />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subject
                    </label>
                    <Input id="subject" placeholder="Enter the subject of your message" required />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <Textarea id="message" placeholder="Enter your message" className="min-h-[150px]" required />
                  </div>
                  <Button type="submit" className="w-full bg-inclusion-teal hover:bg-inclusion-teal/90">
                    Send Message
                  </Button>
                </form>
              </div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-6 text-inclusion-blue">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-inclusion-teal mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">info@disabilityinclusionhub.org</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-inclusion-teal mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-muted-foreground">+880 1234 567890</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-inclusion-teal mt-0.5" />
                      <div>
                        <h3 className="font-medium">Office Address</h3>
                        <p className="text-muted-foreground">
                          Humanity & Inclusion
                          <br />
                          Cox's Bazar Field Office
                          <br />
                          Road #3, Block #B
                          <br />
                          Cox's Bazar, Bangladesh
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-inclusion-teal mt-0.5" />
                      <div>
                        <h3 className="font-medium">Office Hours</h3>
                        <p className="text-muted-foreground">
                          Sunday - Thursday: 9:00 AM - 5:00 PM
                          <br />
                          Friday - Saturday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border h-[300px] w-full">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Map showing the location of the Humanity & Inclusion office in Cox's Bazar"
                    width={600}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="w-full py-12 md:py-24 bg-inclusion-orange/10">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-4 mb-10">
                <HelpCircle className="h-12 w-12 text-inclusion-orange" />
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl text-inclusion-orange">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground max-w-[700px]">
                  Find answers to common questions about the Disability Inclusion Resource Hub.
                </p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Who can access the resources on this platform?</AccordionTrigger>
                  <AccordionContent>
                    Most resources on the platform are freely available to all users. Some specialized training
                    materials and tools may require registration. Registration is free and open to humanitarian actors,
                    researchers, and anyone interested in disability inclusion.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How can I get technical support if I encounter issues?</AccordionTrigger>
                  <AccordionContent>
                    For technical support, you can contact us through the form on this page or email directly to
                    support@disabilityinclusionhub.org. Our technical team will respond within 24-48 hours on working
                    days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I contribute resources to the platform?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we welcome contributions from organizations and individuals working on disability inclusion.
                    All submitted resources undergo a review process to ensure quality and relevance. Please contact us
                    through the form on this page to discuss potential contributions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Are the resources available in languages other than English?</AccordionTrigger>
                  <AccordionContent>
                    Many resources are available in both English and Bangla. We are working to translate more materials
                    into Bangla and other languages relevant to the region. You can filter resources by language in the
                    resource library.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How can I request training for my organization?</AccordionTrigger>
                  <AccordionContent>
                    We offer both online and in-person training on disability inclusion for humanitarian organizations.
                    To request training, please fill out the form on this page, specifying your training needs, target
                    audience, and preferred dates.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Is the platform accessible for persons with disabilities?</AccordionTrigger>
                  <AccordionContent>
                    Yes, the platform is designed to be accessible for persons with disabilities and follows WCAG 2.1 AA
                    standards. Features include text resizing, high contrast mode, black and white mode for color
                    blindness, text-to-speech functionality, and keyboard navigation. If you encounter any accessibility
                    barriers, please let us know so we can address them.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Technical Support Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-6 text-inclusion-blue text-center">
                Technical Support
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Need help with the platform? Our technical support team is here to assist you.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Issues</CardTitle>
                    <CardDescription>
                      For problems related to website functionality, account access, or resource downloads
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Contact our technical team directly at:</p>
                    <p className="font-medium">support@disabilityinclusionhub.org</p>
                    <p className="text-sm text-muted-foreground mt-4">Response time: Within 24 hours on working days</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Content Requests</CardTitle>
                    <CardDescription>
                      For specific resource requests, content clarifications, or accessibility needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Contact our content team directly at:</p>
                    <p className="font-medium">content@disabilityinclusionhub.org</p>
                    <p className="text-sm text-muted-foreground mt-4">Response time: Within 48 hours on working days</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-10 p-6 bg-inclusion-blue/10 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Before Contacting Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  To help us resolve your issue more quickly, please include the following information in your support
                  request:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ChevronDown className="h-4 w-4 text-inclusion-blue shrink-0 mt-0.5" />
                    <span>Your name and organization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronDown className="h-4 w-4 text-inclusion-blue shrink-0 mt-0.5" />
                    <span>A detailed description of the issue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronDown className="h-4 w-4 text-inclusion-blue shrink-0 mt-0.5" />
                    <span>The page or resource where you encountered the issue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronDown className="h-4 w-4 text-inclusion-blue shrink-0 mt-0.5" />
                    <span>Screenshots of the issue (if applicable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronDown className="h-4 w-4 text-inclusion-blue shrink-0 mt-0.5" />
                    <span>The device and browser you are using</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
