"use client"

import { useState } from "react"
import {
  Building,
  Users,
  MapPin,
  Mail,
  Phone,
  Globe,
  Edit,
  Save,
  X,
  Upload,
  Download,
  FileText,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock organization data
const organizationData = {
  name: "Humanity & Inclusion",
  logo: "/placeholder.svg?height=100&width=100",
  type: "International NGO",
  size: "1000-5000 employees",
  description:
    "Humanity & Inclusion is an independent and impartial aid organization working in situations of poverty and exclusion, conflict and disaster. We work alongside people with disabilities and vulnerable populations, taking action and bearing witness in order to respond to their essential needs, improve their living conditions and promote respect for their dignity and fundamental rights.",
  website: "https://www.hi.org",
  email: "contact@hi.org",
  phone: "+1 (123) 456-7890",
  address: "8757 Georgia Ave, Suite 420, Silver Spring, MD 20910, USA",
  country: "United States",
  joinDate: "2023-01-15",
  status: "active",
  subscriptionPlan: "Enterprise",
  subscriptionExpiry: "2024-12-31",
  primaryContact: {
    name: "John Doe",
    title: "Training Coordinator",
    email: "john.doe@hi.org",
    phone: "+1 (123) 456-7891",
  },
  members: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@hi.org",
      role: "Admin",
      title: "Training Coordinator",
      joinDate: "2023-01-15",
      lastActive: "2024-03-15",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@hi.org",
      role: "User",
      title: "Program Manager",
      joinDate: "2023-02-10",
      lastActive: "2024-03-14",
      status: "active",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@hi.org",
      role: "User",
      title: "Field Officer",
      joinDate: "2023-03-05",
      lastActive: "2024-03-10",
      status: "active",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@hi.org",
      role: "User",
      title: "WASH Specialist",
      joinDate: "2023-04-20",
      lastActive: "2024-03-12",
      status: "active",
    },
    {
      id: 5,
      name: "Robert Johnson",
      email: "robert.johnson@hi.org",
      role: "User",
      title: "Education Coordinator",
      joinDate: "2023-05-15",
      lastActive: "2024-03-08",
      status: "inactive",
    },
  ],
  documents: [
    {
      id: 1,
      name: "Organization Registration Certificate",
      type: "pdf",
      uploadDate: "2023-01-15",
      size: "2.5 MB",
    },
    {
      id: 2,
      name: "Memorandum of Understanding",
      type: "pdf",
      uploadDate: "2023-01-15",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Annual Report 2023",
      type: "pdf",
      uploadDate: "2024-02-10",
      size: "5.2 MB",
    },
    {
      id: 4,
      name: "Organization Structure",
      type: "pdf",
      uploadDate: "2023-01-20",
      size: "1.2 MB",
    },
  ],
  activityLog: [
    {
      id: 1,
      action: "User added",
      user: "John Doe",
      details: "Added user Emily Davis",
      date: "2023-04-20",
    },
    {
      id: 2,
      action: "Document uploaded",
      user: "John Doe",
      details: "Uploaded Annual Report 2023",
      date: "2024-02-10",
    },
    {
      id: 3,
      action: "Subscription renewed",
      user: "System",
      details: "Enterprise subscription renewed until 2024-12-31",
      date: "2023-12-15",
    },
    {
      id: 4,
      action: "User status changed",
      user: "John Doe",
      details: "Changed status of Robert Johnson to inactive",
      date: "2024-03-01",
    },
    {
      id: 5,
      action: "Organization profile updated",
      user: "John Doe",
      details: "Updated organization contact information",
      date: "2024-01-05",
    },
  ],
}

export default function OrganizationPage() {
  const [editing, setEditing] = useState(false)
  const [organization, setOrganization] = useState(organizationData)
  const [formData, setFormData] = useState(organizationData)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      primaryContact: {
        ...formData.primaryContact,
        [name]: value,
      },
    })
  }

  const handleSave = () => {
    setOrganization(formData)
    setEditing(false)
  }

  const handleCancel = () => {
    setFormData(organization)
    setEditing(false)
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building className="h-8 w-8 text-inclusion-blue" />
            Organization Profile
          </h1>
          <p className="text-muted-foreground">Manage your organization's profile and members.</p>
        </div>
        {!editing ? (
          <Button onClick={() => setEditing(true)} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Organization Information</CardTitle>
                <CardDescription>Basic information about your organization.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Organization Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Organization Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="International NGO">International NGO</SelectItem>
                          <SelectItem value="Local NGO">Local NGO</SelectItem>
                          <SelectItem value="Government">Government</SelectItem>
                          <SelectItem value="UN Agency">UN Agency</SelectItem>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Private Sector">Private Sector</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Organization Size</Label>
                      <Select
                        value={formData.size}
                        onValueChange={(value) => setFormData({ ...formData, size: value })}
                      >
                        <SelectTrigger id="size">
                          <SelectValue placeholder="Select organization size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-50 employees">1-50 employees</SelectItem>
                          <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                          <SelectItem value="201-1000 employees">201-1000 employees</SelectItem>
                          <SelectItem value="1000-5000 employees">1000-5000 employees</SelectItem>
                          <SelectItem value="5000+ employees">5000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={5}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center mb-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={organization.logo || "/placeholder.svg"} alt={organization.name} />
                        <AvatarFallback>{organization.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Organization Name</h3>
                        <p className="text-base">{organization.name}</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Organization Type</h3>
                          <p className="text-base">{organization.type}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Size</h3>
                          <p className="text-base">{organization.size}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                        <p className="text-sm">{organization.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              {editing && (
                <CardFooter>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Logo
                  </Button>
                </CardFooter>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Contact details for your organization.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" name="website" value={formData.website} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" name="country" value={formData.country} onChange={handleInputChange} />
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={organization.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {organization.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${organization.email}`} className="hover:underline">
                        {organization.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{organization.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p>{organization.address}</p>
                        <p>{organization.country}</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Primary Contact</h3>
                      <div className="space-y-1">
                        <p className="font-medium">{organization.primaryContact.name}</p>
                        <p className="text-sm text-muted-foreground">{organization.primaryContact.title}</p>
                        <p className="text-sm">{organization.primaryContact.email}</p>
                        <p className="text-sm">{organization.primaryContact.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Information</CardTitle>
              <CardDescription>Details about your organization's subscription plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Subscription Plan</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-inclusion-blue">{organization.subscriptionPlan}</Badge>
                    <Badge variant="outline" className="text-green-500">
                      Active
                    </Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Join Date</h3>
                  <p>{new Date(organization.joinDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Expiry Date</h3>
                  <p>{new Date(organization.subscriptionExpiry).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-between">
              <div className="text-sm text-muted-foreground">
                <Clock className="inline-block h-4 w-4 mr-1" />
                {new Date(organization.subscriptionExpiry) > new Date() ? (
                  <span>
                    Your subscription will expire in{" "}
                    {Math.ceil((new Date(organization.subscriptionExpiry) - new Date()) / (1000 * 60 * 60 * 24))} days.
                  </span>
                ) : (
                  <span>Your subscription has expired.</span>
                )}
              </div>
              <Button variant="outline">Manage Subscription</Button>
            </CardFooter>
          </Card>

          {editing && (
            <Card>
              <CardHeader>
                <CardTitle>Primary Contact</CardTitle>
                <CardDescription>The main contact person for your organization.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Name</Label>
                  <Input
                    id="contactName"
                    name="name"
                    value={formData.primaryContact.name}
                    onChange={handleContactChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactTitle">Title</Label>
                  <Input
                    id="contactTitle"
                    name="title"
                    value={formData.primaryContact.title}
                    onChange={handleContactChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    name="email"
                    type="email"
                    value={formData.primaryContact.email}
                    onChange={handleContactChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    name="phone"
                    value={formData.primaryContact.phone}
                    onChange={handleContactChange}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Organization Members</CardTitle>
                <CardDescription>Manage users from your organization.</CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Invite Members
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {organization.members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">{member.name}</span>
                              <span className="text-xs text-muted-foreground">{member.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.title}</TableCell>
                        <TableCell>
                          <Badge variant={member.role === "Admin" ? "default" : "outline"}>{member.role}</Badge>
                        </TableCell>
                        <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(member.lastActive).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={member.status === "active" ? "default" : "secondary"}
                            className={member.status === "active" ? "bg-green-500" : ""}
                          >
                            {member.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Organization Documents</CardTitle>
                <CardDescription>Manage documents related to your organization.</CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {organization.documents.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{document.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="uppercase">{document.type}</TableCell>
                        <TableCell>{new Date(document.uploadDate).toLocaleDateString()}</TableCell>
                        <TableCell>{document.size}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent activities related to your organization.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {organization.activityLog.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.action}</TableCell>
                        <TableCell>{activity.user}</TableCell>
                        <TableCell>{activity.details}</TableCell>
                        <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
