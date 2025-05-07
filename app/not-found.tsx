"use client"

import Link from "next/link"
import { FileQuestion, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] py-12 text-center">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-2">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Go to Homepage
          </Link>
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-5 w-5" />
          Go Back
        </Button>
      </div>

      <div className="mt-12 p-6 border rounded-lg bg-muted/30 max-w-xl">
        <h2 className="text-lg font-medium mb-3">Looking for something specific?</h2>
        <p className="text-muted-foreground mb-4">You might find what you need in one of these sections:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/resources"
            className="p-3 border rounded-md hover:bg-muted transition-colors text-sm font-medium"
          >
            Resources
          </Link>
          <Link href="/training" className="p-3 border rounded-md hover:bg-muted transition-colors text-sm font-medium">
            Training
          </Link>
          <Link
            href="/accessibility"
            className="p-3 border rounded-md hover:bg-muted transition-colors text-sm font-medium"
          >
            Accessibility
          </Link>
          <Link
            href="/dashboard"
            className="p-3 border rounded-md hover:bg-muted transition-colors text-sm font-medium"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
