'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FileCheck, Lock, EyeOff, Search, Accessibility } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
    return (
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
                    <Link href="/training" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        Training
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        About
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
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
    )
}