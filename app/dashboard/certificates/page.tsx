"use client"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Award,
  Download,
  Search,
  Filter,
  Share2,
  CheckCircle,
  Calendar,
  Clock,
  FileText,
  QrCode,
  Copy,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock certificate data
const certificates = [
  {
    id: "CERT-2024-001",
    title: "Introduction to Disability Inclusion",
    issueDate: "2024-02-15",
    expiryDate: "2027-02-15",
    status: "active",
    completionDate: "2024-02-15",
    hoursCompleted: 2,
    verificationCode: "ABC123XYZ",
    verificationUrl: "https://example.com/verify/ABC123XYZ",
    thumbnailUrl: "/placeholder.svg?height=300&width=400&text=Certificate",
    downloadUrl: "#",
  },
  {
    id: "CERT-2024-002",
    title: "Inclusive WASH Programming",
    issueDate: "2024-01-20",
    expiryDate: "2027-01-20",
    status: "active",
    completionDate: "2024-01-20",
    hoursCompleted: 3,
    verificationCode: "DEF456UVW",
    verificationUrl: "https://example.com/verify/DEF456UVW",
    thumbnailUrl: "/placeholder.svg?height=300&width=400&text=Certificate",
    downloadUrl: "#",
  },
  {
    id: "CERT-2023-003",
    title: "Communicating with Persons with Disabilities",
    issueDate: "2023-11-10",
    expiryDate: "2026-11-10",
    status: "active",
    completionDate: "2023-11-10",
    hoursCompleted: 1.5,
    verificationCode: "GHI789RST",
    verificationUrl: "https://example.com/verify/GHI789RST",
    thumbnailUrl: "/placeholder.svg?height=300&width=400&text=Certificate",
    downloadUrl: "#",
  },
]

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [showVerifyDialog, setShowVerifyDialog] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationResult, setVerificationResult] = useState(null)

  // Filter certificates based on search and filter criteria
  const filteredCertificates = certificates.filter((certificate) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificate.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus = selectedStatus === "all" || certificate.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Handle certificate verification
  const verifyCertificate = () => {
    // In a real app, this would make an API call to verify the certificate
    const foundCertificate = certificates.find((cert) => cert.verificationCode === verificationCode)

    if (foundCertificate) {
      setVerificationResult({
        success: true,
        certificate: foundCertificate,
      })
    } else {
      setVerificationResult({
        success: false,
        message: "Certificate not found. Please check the verification code and try again.",
      })
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Award className="h-8 w-8 text-inclusion-purple" />
            My Certificates
          </h1>
          <p className="text-muted-foreground">View and download your earned certificates.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowVerifyDialog(true)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Verify Certificate
          </Button>
          <Link href="/training">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Certificates</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search certificates..."
              className="pl-10 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="grid gap-4 md:grid-cols-2 p-4 border rounded-lg bg-muted/30">
          <div className="space-y-2">
            <label htmlFor="status-filter" className="text-sm font-medium">
              Status
            </label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="date-filter" className="text-sm font-medium">
              Issue Date
            </label>
            <Select>
              <SelectTrigger id="date-filter">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCertificates.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Award className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">No certificates found</h2>
            <p className="text-muted-foreground max-w-md">
              {searchTerm || selectedStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Complete courses to earn certificates that will appear here."}
            </p>
            {!searchTerm && selectedStatus === "all" && (
              <Button className="mt-4" asChild>
                <Link href="/training">Browse Courses</Link>
              </Button>
            )}
          </div>
        ) : (
          filteredCertificates.map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div
                  className="relative h-48 w-full cursor-pointer"
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <Image
                    src={certificate.thumbnailUrl || "/placeholder.svg"}
                    alt={certificate.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={certificate.status === "active" ? "bg-green-500" : "bg-red-500"}>
                      {certificate.status === "active" ? "Active" : "Expired"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{certificate.title}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Issued:</span>
                    </div>
                    <span>{formatDate(certificate.issueDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Expires:</span>
                    </div>
                    <span>{formatDate(certificate.expiryDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Hours:</span>
                    </div>
                    <span>{certificate.hoursCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CheckCircle className="h-4 w-4" />
                      <span>ID:</span>
                    </div>
                    <span className="font-mono text-xs">{certificate.id}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" size="sm" onClick={() => setSelectedCertificate(certificate)}>
                  View
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download Certificate</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share Certificate</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Certificate Detail Dialog */}
      {selectedCertificate && (
        <Dialog open={!!selectedCertificate} onOpenChange={(open) => !open && setSelectedCertificate(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Certificate Details</DialogTitle>
              <DialogDescription>View and manage your certificate for {selectedCertificate.title}.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4 md:grid-cols-[1fr_300px]">
              <div className="space-y-4">
                <div className="relative aspect-[1.4/1] border-8 border-inclusion-purple/20 rounded-lg shadow-lg">
                  <Image
                    src={selectedCertificate.thumbnailUrl || "/placeholder.svg"}
                    alt={selectedCertificate.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Certificate
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Certificate Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Certificate ID:</span>
                      <span className="font-mono">{selectedCertificate.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issue Date:</span>
                      <span>{formatDate(selectedCertificate.issueDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expiry Date:</span>
                      <span>{formatDate(selectedCertificate.expiryDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={selectedCertificate.status === "active" ? "bg-green-500" : "bg-red-500"}>
                        {selectedCertificate.status === "active" ? "Active" : "Expired"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hours Completed:</span>
                      <span>{selectedCertificate.hoursCompleted}</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Verification</h3>
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Verification Code:</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-mono">{selectedCertificate.verificationCode}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Verification URL:</span>
                      <Button variant="link" size="sm" className="h-6 p-0">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        <span className="text-xs">Verify Online</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="bg-white p-2 rounded">
                      <QrCode className="h-24 w-24" />
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Scan this QR code to verify the certificate online.
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Verify Certificate Dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Certificate</DialogTitle>
            <DialogDescription>
              Enter the verification code to check the authenticity of a certificate.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="verification-code" className="text-sm font-medium">
                Verification Code
              </label>
              <Input
                id="verification-code"
                placeholder="Enter verification code (e.g., ABC123XYZ)"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            {verificationResult && (
              <div
                className={`p-4 rounded-lg ${
                  verificationResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                {verificationResult.success ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Certificate Verified</h3>
                      <p className="text-sm text-muted-foreground">
                        This certificate was issued to John Doe on{" "}
                        {formatDate(verificationResult.certificate.issueDate)}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Verification Failed</h3>
                      <p className="text-sm text-muted-foreground">{verificationResult.message}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={verifyCertificate}>Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
