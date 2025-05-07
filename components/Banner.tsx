import Link from 'next/link'
import { FileCheck, Lock, EyeOff } from 'lucide-react'

export function Banner() {
    return (
        <div className="bg-inclusion-blue/10 py-2 px-4 text-xs text-center">
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
        </div>
    )
}