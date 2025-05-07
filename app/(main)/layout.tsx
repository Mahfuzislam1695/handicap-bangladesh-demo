import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { Suspense } from "react"
import { Banner } from "@/components/Banner"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Disability Inclusion Hub",
    description: "A centralized platform for disability inclusion resources",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Banner />
                <Navbar />
                <main className="min-h-[calc(100vh-160px)]">
                    <Suspense>{children}</Suspense>
                </main>
                <Footer />
            </body>
        </html>
    )
}