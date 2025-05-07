"use client"

import type React from "react"

import { useState } from "react"
import { Settings, User, Bell, Accessibility, Shield, Save, Globe, Eye, EyeOff, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "super-admin", // Options: super-admin, admin, user
  avatar: "/placeholder.svg?height=128&width=128&text=JD",
  organization: "Humanity & Inclusion",
  position: "Disability Inclusion Specialist",
  phone: "+1 (555) 123-4567",
  bio: "Experienced disability inclusion specialist with 8 years of experience in humanitarian contexts, focusing on inclusive WASH and education programs.",
  language: "english",
  timezone: "UTC+6:00",
  twoFactorEnabled: false,
}

export default function SettingsPage() {
  const [user, setUser] = useState(userData)
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Accessibility settings
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    textSize: 100,
    highContrast: false,
    reducedMotion: false,
    screenReaderMode: false,
    colorBlindMode: "none",
    keyboardNavigation: true,
    autoplayVideos: false,
    textSpacing: 1,
    cursorSize: "default",
    soundEffects: false,
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: {
      newResources: true,
      courseUpdates: true,
      certificates: true,
      newsletter: true,
    },
    inApp: {
      newResources: true,
      courseUpdates: true,
      certificates: true,
      systemUpdates: true,
    },
    sms: {
      certificates: false,
      deadlineReminders: false,
    },
    frequency: "immediate",
  })

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPassword({
      ...password,
      [name]: value,
    })
  }

  // Handle notification toggle
  const handleNotificationToggle = (type: string, name: string) => {
    setNotifications({
      ...notifications,
      [type]: {
        ...notifications[type as keyof typeof notifications],
        [name]:
          !notifications[type as keyof typeof notifications][
          name as keyof (typeof notifications)[keyof typeof notifications]
          ],
      },
    })
  }

  // Handle accessibility setting change
  const handleAccessibilityChange = (setting: string, value: any) => {
    setAccessibilitySettings({
      ...accessibilitySettings,
      [setting]: value,
    })

    // Apply changes immediately for certain settings
    if (setting === "textSize") {
      document.documentElement.style.fontSize = `${value}%`
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent, section: string) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: `Your ${section} settings have been updated successfully.`,
      })
    }, 1000)
  }

  // Handle password update
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password
    if (password.new !== password.confirm) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      })
      return
    }

    if (password.new.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setPassword({
        current: "",
        new: "",
        confirm: "",
      })
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-8 w-8 text-inclusion-teal" />
            Settings
          </h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <form onSubmit={(e) => handleSubmit(e, "profile")}>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your profile information and how it appears on the platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={user.name} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization</Label>
                        <Input
                          id="organization"
                          name="organization"
                          value={user.organization}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" name="position" value={user.position} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={user.phone} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={user.bio}
                        onChange={handleInputChange}
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        Brief description of your role and experience in disability inclusion.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Set your language, timezone, and other preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={user.language} onValueChange={(value) => setUser({ ...user, language: value })}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="bangla">Bangla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={user.timezone} onValueChange={(value) => setUser({ ...user, timezone: value })}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC+6:00">Bangladesh (UTC+6:00)</SelectItem>
                      <SelectItem value="UTC+0:00">UTC+0:00</SelectItem>
                      <SelectItem value="UTC+1:00">UTC+1:00</SelectItem>
                      <SelectItem value="UTC-5:00">Eastern Time (UTC-5:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <form onSubmit={(e) => handleSubmit(e, "notifications")}>
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure which email notifications you receive from the platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-new-resources">New Resources</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when new resources are added to the platform.
                      </p>
                    </div>
                    <Switch
                      id="email-new-resources"
                      checked={notifications.email.newResources}
                      onCheckedChange={() => handleNotificationToggle("email", "newResources")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-course-updates">Course Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about updates to courses you're enrolled in.
                      </p>
                    </div>
                    <Switch
                      id="email-course-updates"
                      checked={notifications.email.courseUpdates}
                      onCheckedChange={() => handleNotificationToggle("email", "courseUpdates")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-certificates">Certificates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when you earn a new certificate.
                      </p>
                    </div>
                    <Switch
                      id="email-certificates"
                      checked={notifications.email.certificates}
                      onCheckedChange={() => handleNotificationToggle("email", "certificates")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-newsletter">Newsletter</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive our monthly newsletter with updates and disability inclusion news.
                      </p>
                    </div>
                    <Switch
                      id="email-newsletter"
                      checked={notifications.email.newsletter}
                      onCheckedChange={() => handleNotificationToggle("email", "newsletter")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>In-App Notifications</CardTitle>
                <CardDescription>
                  Configure which in-app notifications you receive while using the platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inapp-new-resources">New Resources</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when new resources are added to the platform.
                      </p>
                    </div>
                    <Switch
                      id="inapp-new-resources"
                      checked={notifications.inApp.newResources}
                      onCheckedChange={() => handleNotificationToggle("inApp", "newResources")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inapp-course-updates">Course Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about updates to courses you're enrolled in.
                      </p>
                    </div>
                    <Switch
                      id="inapp-course-updates"
                      checked={notifications.inApp.courseUpdates}
                      onCheckedChange={() => handleNotificationToggle("inApp", "courseUpdates")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inapp-certificates">Certificates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when you earn a new certificate.
                      </p>
                    </div>
                    <Switch
                      id="inapp-certificates"
                      checked={notifications.inApp.certificates}
                      onCheckedChange={() => handleNotificationToggle("inApp", "certificates")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inapp-system-updates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about platform updates and maintenance.
                      </p>
                    </div>
                    <Switch
                      id="inapp-system-updates"
                      checked={notifications.inApp.systemUpdates}
                      onCheckedChange={() => handleNotificationToggle("inApp", "systemUpdates")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
                <CardDescription>
                  Configure which SMS notifications you receive (additional charges may apply).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-certificates">Certificate Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive SMS notifications when you earn a new certificate.
                      </p>
                    </div>
                    <Switch
                      id="sms-certificates"
                      checked={notifications.sms.certificates}
                      onCheckedChange={() => handleNotificationToggle("sms", "certificates")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-deadlines">Deadline Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive SMS reminders about upcoming course deadlines.
                      </p>
                    </div>
                    <Switch
                      id="sms-deadlines"
                      checked={notifications.sms.deadlineReminders}
                      onCheckedChange={() => handleNotificationToggle("sms", "deadlineReminders")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Notification Frequency</CardTitle>
                <CardDescription>Configure how often you receive email notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={notifications.frequency}
                  onValueChange={(value) => setNotifications({ ...notifications, frequency: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <Label htmlFor="immediate">Immediate</Label>
                    <p className="text-sm text-muted-foreground ml-2">Receive notifications as events occur.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily Digest</Label>
                    <p className="text-sm text-muted-foreground ml-2">Receive a daily summary of all notifications.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground ml-2">Receive a weekly summary of all notifications.</p>
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-6">
          <form onSubmit={(e) => handleSubmit(e, "accessibility")}>
            <Card>
              <CardHeader>
                <CardTitle>Visual Preferences</CardTitle>
                <CardDescription>Customize the visual appearance of the platform to suit your needs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-size">Text Size</Label>
                      <span className="text-sm">{accessibilitySettings.textSize}%</span>
                    </div>
                    <Slider
                      id="text-size"
                      min={75}
                      max={200}
                      step={5}
                      value={[accessibilitySettings.textSize]}
                      onValueChange={(value) => handleAccessibilityChange("textSize", value[0])}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>A</span>
                      <span className="text-xl">A</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="high-contrast">High Contrast</Label>
                      <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                    </div>
                    <Switch
                      id="high-contrast"
                      checked={accessibilitySettings.highContrast}
                      onCheckedChange={(checked) => handleAccessibilityChange("highContrast", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="color-blind-mode">Color Blind Mode</Label>
                    <Select
                      value={accessibilitySettings.colorBlindMode}
                      onValueChange={(value) => handleAccessibilityChange("colorBlindMode", value)}
                    >
                      <SelectTrigger id="color-blind-mode">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="protanopia">Protanopia (Red-Blind)</SelectItem>
                        <SelectItem value="deuteranopia">Deuteranopia (Green-Blind)</SelectItem>
                        <SelectItem value="tritanopia">Tritanopia (Blue-Blind)</SelectItem>
                        <SelectItem value="achromatopsia">Achromatopsia (Monochromacy)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-spacing">Text Spacing</Label>
                      <span className="text-sm">{accessibilitySettings.textSpacing}x</span>
                    </div>
                    <Slider
                      id="text-spacing"
                      min={1}
                      max={2}
                      step={0.1}
                      value={[accessibilitySettings.textSpacing]}
                      onValueChange={(value) => handleAccessibilityChange("textSpacing", value[0])}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Motion & Animation</CardTitle>
                <CardDescription>
                  Control motion and animation settings for a more comfortable experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reduced-motion">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">
                        Minimize animations and transitions throughout the platform
                      </p>
                    </div>
                    <Switch
                      id="reduced-motion"
                      checked={accessibilitySettings.reducedMotion}
                      onCheckedChange={(checked) => handleAccessibilityChange("reducedMotion", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoplay-videos">Autoplay Videos</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically play videos when they appear on screen
                      </p>
                    </div>
                    <Switch
                      id="autoplay-videos"
                      checked={accessibilitySettings.autoplayVideos}
                      onCheckedChange={(checked) => handleAccessibilityChange("autoplayVideos", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Input & Navigation</CardTitle>
                <CardDescription>Customize how you interact with the platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="keyboard-navigation">Enhanced Keyboard Navigation</Label>
                      <p className="text-sm text-muted-foreground">Improved keyboard focus indicators and shortcuts</p>
                    </div>
                    <Switch
                      id="keyboard-navigation"
                      checked={accessibilitySettings.keyboardNavigation}
                      onCheckedChange={(checked) => handleAccessibilityChange("keyboardNavigation", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="cursor-size">Cursor Size</Label>
                    <Select
                      value={accessibilitySettings.cursorSize}
                      onValueChange={(value) => handleAccessibilityChange("cursorSize", value)}
                    >
                      <SelectTrigger id="cursor-size">
                        <SelectValue placeholder="Select cursor size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="x-large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="screen-reader-mode">Screen Reader Optimized</Label>
                      <p className="text-sm text-muted-foreground">Optimize content for screen readers</p>
                    </div>
                    <Switch
                      id="screen-reader-mode"
                      checked={accessibilitySettings.screenReaderMode}
                      onCheckedChange={(checked) => handleAccessibilityChange("screenReaderMode", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sound-effects">Sound Effects</Label>
                      <p className="text-sm text-muted-foreground">Play sound effects for notifications and actions</p>
                    </div>
                    <Switch
                      id="sound-effects"
                      checked={accessibilitySettings.soundEffects}
                      onCheckedChange={(checked) => handleAccessibilityChange("soundEffects", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Reset to Defaults
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings and password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      name="current"
                      type={showPassword ? "text" : "password"}
                      value={password.current}
                      onChange={handlePasswordChange}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    name="new"
                    type={showPassword ? "text" : "password"}
                    value={password.new}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirm"
                    type={showPassword ? "text" : "password"}
                    value={password.confirm}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
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
                        Updating Password...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </div>
              </form>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={user.twoFactorEnabled}
                    onCheckedChange={(checked) => setUser({ ...user, twoFactorEnabled: checked })}
                  />
                </div>

                {user.twoFactorEnabled && (
                  <div className="rounded-md bg-muted p-4">
                    <p className="text-sm font-medium">Two-factor authentication is enabled</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      You will be asked to enter a verification code when signing in from a new device.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Manage 2FA Settings
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage third-party accounts connected to your profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Microsoft</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions that affect your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
