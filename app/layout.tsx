import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import Image from "next/image"
import { FileCheck, Lock, EyeOff, Search, Accessibility } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Disability Inclusion Hub",
  description:
    "A centralized platform for disability inclusion resources supporting humanitarian actors in Cox's Bazar",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* WCAG and GDPR Banner - Show on all pages */}
        {/* <div className="bg-inclusion-blue/10 py-2 px-4 text-xs text-center">
          <div className="container flex flex-wrap justify-center gap-4 items-center">
            <span className="flex items-center">
              <FileCheck className="h-3 w-3 mr-1" /> WCAG 2.1 AA Compliant
            </span>
            <span className="flex items-center">
              <Lock className="h-3 w-3 mr-1" /> GDPR Compliant
            </span>
            <span className="flex items-center">
              <EyeOff className="h-3 w-3 mr-1" /> Color Blind Mode Available
            </span>
            <Link href="/accessibility" className="text-inclusion-blue hover:underline">
              Accessibility Statement
            </Link>
            <Link href="/privacy" className="text-inclusion-blue hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div> */}


        {/* {!children.props.childProp?.segment?.startsWith("dashboard") &&
          !children.props.childProp?.segment?.startsWith("auth") && (
            <>
           
              <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between py-4">
                  <div className="flex items-center gap-2">
                    <Link href="/">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Humanity & Inclusion Logo"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                        <div className="flex flex-col">
                          <span className="text-lg font-bold tracking-tight">Disability Inclusion Hub</span>
                          <span className="text-xs text-muted-foreground">Humanity & Inclusion | DFAT</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                      Home
                    </Link>
                    <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
                      Resources
                    </Link>
                    <Link
                      href="/training"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      Training
                    </Link>
                    <Link
                      href="/about"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      Contact
                    </Link>
                  </nav>
                  <div className="flex items-center gap-2">

                    <div className="hidden md:flex items-center mr-2 border rounded-md overflow-hidden">
                      <button className="px-2 py-1 text-xs bg-inclusion-blue text-white">English</button>
                      <button className="px-2 py-1 text-xs hover:bg-inclusion-blue/10">বাংলা</button>
                    </div>
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                    <Link href="/auth">
                      <Button size="sm" className="bg-inclusion-teal hover:bg-inclusion-teal/90">
                        Login
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="md:hidden" aria-label="Open accessibility menu">
                      <Accessibility className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </header>
            </>
          )} */}

        <Suspense>{children}</Suspense>

        {/* Conditional rendering of footer */}
        {/* {!children.props.childProp?.segment?.startsWith("dashboard") &&
          !children.props.childProp?.segment?.startsWith("auth") && (
            <footer className="w-full border-t bg-inclusion-blue/10 py-6 md:py-12">
              <div className="container px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Humanity & Inclusion Logo"
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      <span className="text-lg font-bold text-inclusion-blue">Disability Inclusion Hub</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A centralized platform for disability inclusion resources supporting humanitarian actors in Cox's
                      Bazar, Bangladesh.
                    </p>
                    <div className="flex gap-4">
                      <Link href="#" className="text-muted-foreground hover:text-inclusion-blue">
                        <span className="sr-only">Twitter</span>
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
                          className="h-5 w-5"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:text-inclusion-blue">
                        <span className="sr-only">Facebook</span>
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
                          className="h-5 w-5"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:text-inclusion-blue">
                        <span className="sr-only">LinkedIn</span>
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
                          className="h-5 w-5"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-inclusion-blue">Resources</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link
                          href="/resources?category=guidelines"
                          className="text-muted-foreground hover:text-inclusion-blue"
                        >
                          Guidelines
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources?category=training"
                          className="text-muted-foreground hover:text-inclusion-blue"
                        >
                          Training Materials
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources?category=research"
                          className="text-muted-foreground hover:text-inclusion-blue"
                        >
                          Research Reports
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources?category=tools"
                          className="text-muted-foreground hover:text-inclusion-blue"
                        >
                          Tools & Templates
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources?category=iec"
                          className="text-muted-foreground hover:text-inclusion-blue"
                        >
                          IEC Materials
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-inclusion-blue">About</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/about" className="text-muted-foreground hover:text-inclusion-blue">
                          About the Project
                        </Link>
                      </li>
                      <li>
                        <Link href="/about#mission" className="text-muted-foreground hover:text-inclusion-blue">
                          Humanity & Inclusion
                        </Link>
                      </li>
                      <li>
                        <Link href="/about#stakeholders" className="text-muted-foreground hover:text-inclusion-blue">
                          ADTWG
                        </Link>
                      </li>
                      <li>
                        <Link href="/about#partners" className="text-muted-foreground hover:text-inclusion-blue">
                          Partners
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="text-muted-foreground hover:text-inclusion-blue">
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-inclusion-blue">Legal</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/privacy" className="text-muted-foreground hover:text-inclusion-blue">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms" className="text-muted-foreground hover:text-inclusion-blue">
                          Terms of Service
                        </Link>
                      </li>
                      <li>
                        <Link href="/cookies" className="text-muted-foreground hover:text-inclusion-blue">
                          Cookie Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/accessibility" className="text-muted-foreground hover:text-inclusion-blue">
                          Accessibility Statement
                        </Link>
                      </li>
                      <li>
                        <Link href="/gdpr" className="text-muted-foreground hover:text-inclusion-blue">
                          GDPR Compliance
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-xs text-muted-foreground mb-4 md:mb-0">
                    © {new Date().getFullYear()} Humanity & Inclusion. All rights reserved. Funded by DFAT.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Developed in support of the Age and Disability Technical Working Group (ADTWG)
                  </p>
                </div>
              </div>
            </footer>
          )} */}
      </body>
    </html>
  )
}
