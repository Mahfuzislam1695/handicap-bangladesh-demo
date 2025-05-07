"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, FileUp, Tag, Upload, X, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

// Mock categories and tags
const CATEGORIES = [
  "Workplace Inclusion",
  "Assistive Technology",
  "Legal Framework",
  "Accessibility Standards",
  "Inclusive Design",
  "Training Materials",
]

const TAGS = [
  "PDF",
  "Video",
  "Audio",
  "Presentation",
  "Document",
  "Webinar",
  "Case Study",
  "Research",
  "Guide",
  "Toolkit",
  "Template",
  "Checklist",
]

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "video/mp4",
  "audio/mpeg",
  "image/jpeg",
  "image/png",
]

export default function ResourceUploadPage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [newTag, setNewTag] = useState("")
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false)
  const [showNewTagDialog, setShowNewTagDialog] = useState(false)
  const [availableCategories, setAvailableCategories] = useState(CATEGORIES)
  const [availableTags, setAvailableTags] = useState(TAGS)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    version: "1.0",
    isPublic: true,
    requiresLogin: false,
    alternateFormats: false,
    accessibilityFeatures: [],
    targetAudience: "",
    expiryDate: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (!file) {
      return
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a supported file format.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB.",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)

    // Create preview for supported types
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: "",
      })
    }
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const addNewCategory = () => {
    if (!newCategory.trim()) return

    if (!availableCategories.includes(newCategory)) {
      setAvailableCategories([...availableCategories, newCategory])
      setFormData({
        ...formData,
        category: newCategory,
      })
      setNewCategory("")
      setShowNewCategoryDialog(false)

      toast({
        title: "Category added",
        description: `"${newCategory}" has been added to the categories.`,
      })
    } else {
      toast({
        title: "Category already exists",
        description: "Please select the existing category or create a new one.",
        variant: "destructive",
      })
    }
  }

  const addNewTag = () => {
    if (!newTag.trim()) return

    if (!availableTags.includes(newTag)) {
      setAvailableTags([...availableTags, newTag])
      setSelectedTags([...selectedTags, newTag])
      setNewTag("")
      setShowNewTagDialog(false)

      toast({
        title: "Tag added",
        description: `"${newTag}" has been added to the tags.`,
      })
    } else {
      toast({
        title: "Tag already exists",
        description: "Please select the existing tag or create a new one.",
        variant: "destructive",
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.title) {
      errors.title = "Title is required"
    }

    if (!formData.description) {
      errors.description = "Description is required"
    }

    if (!formData.category) {
      errors.category = "Category is required"
    }

    if (!selectedFile) {
      errors.file = "File is required"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      toast({
        title: "Resource uploaded successfully",
        description: "Your resource has been uploaded and is now available.",
      })
      setIsUploading(false)
      router.push("/dashboard/content")
    }, 2000)
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Upload Resource</h1>
        <p className="text-muted-foreground">Upload new resources to the platform for users to access.</p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upload">Upload New</TabsTrigger>
          <TabsTrigger value="version">New Version</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4 pt-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* File Upload Section */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileUp className="mr-2 h-5 w-5" />
                    File Upload
                  </CardTitle>
                  <CardDescription>Upload your resource file (max 10MB)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!selectedFile ? (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 focus-within:border-primary transition-colors">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-4">Drag and drop your file here, or click to browse</p>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept={ALLOWED_FILE_TYPES.join(",")}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Select File
                      </Button>
                      {validationErrors.file && <p className="text-sm text-red-500 mt-2">{validationErrors.file}</p>}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-blue-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveFile}
                          aria-label="Remove file"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {previewUrl && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Preview:</p>
                          <div className="border rounded-lg overflow-hidden">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="File preview"
                              className="max-h-[200px] w-full object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Supported formats: PDF, Word, PowerPoint, MP4, MP3, JPEG, PNG
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Resource Details Section */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Resource Details
                  </CardTitle>
                  <CardDescription>Provide information about your resource</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter resource title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                    {validationErrors.title && <p className="text-sm text-red-500">{validationErrors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Enter resource description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                    {validationErrors.description && (
                      <p className="text-sm text-red-500">{validationErrors.description}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowNewCategoryDialog(true)}
                        className="h-8 px-2 text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add New
                      </Button>
                    </div>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.category && <p className="text-sm text-red-500">{validationErrors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Select
                      value={formData.targetAudience}
                      onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}
                    >
                      <SelectTrigger id="targetAudience">
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="program-managers">Program Managers</SelectItem>
                        <SelectItem value="field-workers">Field Workers</SelectItem>
                        <SelectItem value="trainers">Trainers</SelectItem>
                        <SelectItem value="persons-with-disabilities">Persons with Disabilities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Input
                      id="version"
                      name="version"
                      placeholder="1.0"
                      value={formData.version}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">Leave blank if the resource does not expire</p>
                  </div>
                </CardContent>
              </Card>

              {/* Tags Section */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Tag className="mr-2 h-5 w-5" />
                      Tags
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewTagDialog(true)}
                      className="h-8 px-2 text-xs"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add New Tag
                    </Button>
                  </CardTitle>
                  <CardDescription>Add tags to help users find your resource</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {selectedTags.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Selected Tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                          <Badge key={`selected-${tag}`} className="bg-inclusion-purple">
                            {tag}
                            <button
                              onClick={() => handleTagToggle(tag)}
                              className="ml-1 hover:text-white/80"
                              aria-label={`Remove ${tag} tag`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Settings Section */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure resource settings and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="isPublic">Public Resource</Label>
                      <p className="text-sm text-muted-foreground">Make this resource visible to all users</p>
                    </div>
                    <Switch
                      id="isPublic"
                      checked={formData.isPublic}
                      onCheckedChange={(checked) => handleSwitchChange("isPublic", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="requiresLogin">Requires Login</Label>
                      <p className="text-sm text-muted-foreground">Users must be logged in to access</p>
                    </div>
                    <Switch
                      id="requiresLogin"
                      checked={formData.requiresLogin}
                      onCheckedChange={(checked) => handleSwitchChange("requiresLogin", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="alternateFormats">Alternate Formats</Label>
                      <p className="text-sm text-muted-foreground">This resource has alternate accessible formats</p>
                    </div>
                    <Switch
                      id="alternateFormats"
                      checked={formData.alternateFormats}
                      onCheckedChange={(checked) => handleSwitchChange("alternateFormats", checked)}
                    />
                  </div>

                  {formData.alternateFormats && (
                    <div className="pt-2 pl-6 space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="alt-text" className="rounded" />
                        <Label htmlFor="alt-text">Text transcript</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="alt-audio" className="rounded" />
                        <Label htmlFor="alt-audio">Audio description</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="alt-braille" className="rounded" />
                        <Label htmlFor="alt-braille">Braille version available</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="alt-sign" className="rounded" />
                        <Label htmlFor="alt-sign">Sign language version</Label>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/content")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  "Upload Resource"
                )}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="version" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Version</CardTitle>
              <CardDescription>Upload a new version of an existing resource</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="existingResource">Select Existing Resource</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a resource" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resource1">Workplace Inclusion Guide</SelectItem>
                    <SelectItem value="resource2">Assistive Technology Overview</SelectItem>
                    <SelectItem value="resource3">Legal Framework Presentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="versionNotes">Version Notes</Label>
                <Textarea id="versionNotes" placeholder="Describe what's new in this version" rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newVersion">New Version Number</Label>
                <Input id="newVersion" placeholder="1.1" />
              </div>

              <div className="pt-4">
                <Button type="button" className="w-full">
                  Continue to File Upload
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Category Dialog */}
      <Dialog open={showNewCategoryDialog} onOpenChange={setShowNewCategoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new category for organizing resources.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-category">Category Name</Label>
              <Input
                id="new-category"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCategoryDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addNewCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Tag Dialog */}
      <Dialog open={showNewTagDialog} onOpenChange={setShowNewTagDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Tag</DialogTitle>
            <DialogDescription>Create a new tag to help categorize resources.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-tag">Tag Name</Label>
              <Input
                id="new-tag"
                placeholder="Enter tag name"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTagDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addNewTag}>Add Tag</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
