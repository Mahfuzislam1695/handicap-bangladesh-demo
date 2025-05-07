import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple auth header */}
      <header className="border-b py-4">
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Humanity & Inclusion Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">Disability Inclusion Hub</span>
              <span className="text-xs text-muted-foreground">Authentication</span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">{children}</main>

      {/* Simple auth footer */}
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Humanity & Inclusion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
