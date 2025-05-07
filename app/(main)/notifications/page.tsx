"use client"

import { useState } from "react"
import {
  Bell,
  Settings,
  Mail,
  Calendar,
  FileText,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Filter,
  Search,
  ChevronRight,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AccessibilityControls } from "@/components/accessibility-controls"

// Mock notification data
const notificationData = [
  {
    id: 1,
    title: "New Resource Added",
    message: "A new resource 'Inclusive WASH Guidelines' has been added to the platform.",
    type: "resource",
    date: "2024-04-15T10:30:00",
    read: false,
    actionUrl: "#",
    actionText: "View Resource",
  },
  {
    id: 2,
    title: "Training Reminder",
    message: "Your 'Disability Data Collection' training module is due in 3 days.",
    type: "training",
    date: "2024-04-14T14:45:00",
    read: false,
    actionUrl: "#",
    actionText: "Continue Training",
  },
  {
    id: 3,
    title: "Certificate Available",
    message: "Your certificate for 'Introduction to Disability Inclusion' is now available for download.",
    type: "certificate",
    date: "2024-04-10T09:15:00",
    read: true,
    actionUrl: "#",
    actionText: "Download Certificate",
  },
  {
    id: 4,
    title: "Upcoming Webinar",
    message: "Reminder: 'Disability Inclusion in Humanitarian Response' webinar starts in 24 hours.",
    type: "event",
    date: "2024-04-08T16:20:00",
    read: true,
    actionUrl: "#",
    actionText: "Join Webinar",
  },
  {
    id: 5,
    title: "System Maintenance",
    message: "The platform will be undergoing maintenance on April 20, 2024, from 2:00 AM to 4:00 AM UTC.",
    type: "system",
    date: "2024-04-05T11:10:00",
    read: true,
    actionUrl: "#",
    actionText: "Learn More",
  },
  {
    id: 6,
    title: "New Training Module",
    message: "A new training module 'Inclusive Shelter Design' is now available.",
    type: "training",
    date: "2024-04-03T13:25:00",
    read: true,
    actionUrl: "#",
    actionText: "Start Training",
  },
  {
    id: 7,
    title: "Resource Update",
    message: "The 'Inclusive Education Guidelines' resource has been updated with new content.",
    type: "resource",
    date: "2024-03-28T15:40:00",
    read: true,
    actionUrl: "#",
    actionText: "View Updates",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [subscriptionPreferences, setSubscriptionPreferences] = useState({
    newResources: true,
    trainingReminders: true,
    events: true,
    systemUpdates: false,
    newsletter: true,
  })

  // Filter notifications based on search and filter criteria
  const filteredNotifications = notifications.filter((notification) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())

    // Type filter
    const matchesType = selectedType === "all" || notification.type === selectedType

    return matchesSearch && matchesType
  })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date)
    }
  }

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case "resource":
        return <FileText className="h-5 w-5 text-inclusion-blue" />
      case "training":
        return <BookOpen className="h-5 w-5 text-inclusion-purple" />
      case "certificate":
        return <Download className="h-5 w-5 text-inclusion-green" />
      case "event":
        return <Calendar className="h-5 w-5 text-inclusion-orange" />
      case "system":
        return <Settings className="h-5 w-5 text-inclusion-red" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  // Toggle subscription preference
  const toggleSubscription = (key) => {
    setSubscriptionPreferences({
      ...subscriptionPreferences,
      [key]: !subscriptionPreferences[key],
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* Accessibility Controls */}
      <AccessibilityControls />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-inclusion-orange/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Bell className="h-12 w-12 text-inclusion-orange mb-2" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-inclusion-orange">
                Notifications & Subscriptions
              </h1>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Manage your notification preferences and stay updated on new resources, training opportunities, and
                platform updates.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="notifications" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="subscriptions">Subscription Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="notifications" className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Your Notifications</h2>
                    <p className="text-muted-foreground">
                      View and manage your notifications from across the platform.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={markAllAsRead}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark All as Read
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search notifications..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>

                {showFilters && (
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="space-y-2">
                      <label htmlFor="type-filter" className="text-sm font-medium">
                        Notification Type
                      </label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger id="type-filter">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="resource">Resources</SelectItem>
                          <SelectItem value="training">Training</SelectItem>
                          <SelectItem value="certificate">Certificates</SelectItem>
                          <SelectItem value="event">Events</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No notifications found</h3>
                      <p className="text-muted-foreground">
                        {searchTerm || selectedType !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "You don't have any notifications yet"}
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <Card
                        key={notification.id}
                        className={`overflow-hidden ${notification.read ? "" : "border-l-4 border-inclusion-orange"}`}
                      >
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full ${
                                  notification.read ? "bg-muted" : "bg-inclusion-orange/10"
                                } flex items-center justify-center`}
                              >
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div>
                                <CardTitle className="text-lg">{notification.title}</CardTitle>
                                <CardDescription className="text-xs">{formatDate(notification.date)}</CardDescription>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => deleteNotification(notification.id)}
                              aria-label="Delete notification"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <p className="text-muted-foreground">{notification.message}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <Button variant="outline" size="sm" asChild>
                            <a href={notification.actionUrl}>
                              {notification.actionText}
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </a>
                          </Button>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-inclusion-blue"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Mark as Read
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="subscriptions" className="mt-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Subscription Preferences</h2>
                  <p className="text-muted-foreground">
                    Manage your notification preferences and subscription settings.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Channels</CardTitle>
                    <CardDescription>Choose how you want to receive notifications.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-inclusion-blue/10 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-inclusion-blue" />
                        </div>
                        <div>
                          <p className="font-medium">In-App Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive notifications within the platform.</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-muted-foreground mr-2">Always enabled</p>
                        <Switch checked={true} disabled />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-inclusion-purple/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-inclusion-purple" />
                        </div>
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                        </div>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                        aria-label="Toggle email notifications"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-inclusion-teal/10 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-inclusion-teal" />
                        </div>
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive push notifications on your device.</p>
                        </div>
                      </div>
                      <Switch
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                        aria-label="Toggle push notifications"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Types</CardTitle>
                    <CardDescription>Choose which types of notifications you want to receive.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="new-resources"
                        checked={subscriptionPreferences.newResources}
                        onCheckedChange={() => toggleSubscription("newResources")}
                      />
                      <label
                        htmlFor="new-resources"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        New Resources
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="training-reminders"
                        checked={subscriptionPreferences.trainingReminders}
                        onCheckedChange={() => toggleSubscription("trainingReminders")}
                      />
                      <label
                        htmlFor="training-reminders"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Training Reminders
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="events"
                        checked={subscriptionPreferences.events}
                        onCheckedChange={() => toggleSubscription("events")}
                      />
                      <label
                        htmlFor="events"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Events & Webinars
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="system-updates"
                        checked={subscriptionPreferences.systemUpdates}
                        onCheckedChange={() => toggleSubscription("systemUpdates")}
                      />
                      <label
                        htmlFor="system-updates"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        System Updates
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={subscriptionPreferences.newsletter}
                        onCheckedChange={() => toggleSubscription("newsletter")}
                      />
                      <label
                        htmlFor="newsletter"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Monthly Newsletter
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-inclusion-orange hover:bg-inclusion-orange/90">
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Email Frequency</CardTitle>
                    <CardDescription>Choose how often you want to receive email notifications.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email-frequency" className="text-sm font-medium">
                        Email Digest Frequency
                      </label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="email-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (As they happen)</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Digest</SelectItem>
                          <SelectItem value="never">Never (Disable email digests)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-inclusion-orange hover:bg-inclusion-orange/90">
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Information Section */}
        <section className="w-full py-12 md:py-24 bg-inclusion-blue/5 border-t">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight text-inclusion-blue mb-6 text-center">
                About Notifications
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-inclusion-blue/10 flex items-center justify-center">
                      <Info className="h-6 w-6 text-inclusion-blue" />
                    </div>
                    <CardTitle className="text-center mt-2">Types of Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-inclusion-blue mt-0.5" />
                        <span>New resources and updates to existing resources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BookOpen className="h-4 w-4 text-inclusion-purple mt-0.5" />
                        <span>Training reminders and new training modules</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-inclusion-orange mt-0.5" />
                        <span>Upcoming events, webinars, and workshops</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Settings className="h-4 w-4 text-inclusion-red mt-0.5" />
                        <span>System updates and maintenance notifications</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-inclusion-teal/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-inclusion-teal" />
                    </div>
                    <CardTitle className="text-center mt-2">Email Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Email notifications can be sent immediately or as a digest. You can choose the frequency that
                      works best for you.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-inclusion-teal mt-0.5" />
                        <span>Immediate: Sent as events occur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-inclusion-teal mt-0.5" />
                        <span>Daily Digest: Sent once a day</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-inclusion-teal mt-0.5" />
                        <span>Weekly Digest: Sent once a week</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-inclusion-orange/10 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-inclusion-orange" />
                    </div>
                    <CardTitle className="text-center mt-2">Privacy & Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      We respect your privacy and are committed to protecting your data. You can unsubscribe from
                      notifications at any time.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-inclusion-orange mt-0.5" />
                        <span>Your email is never shared with third parties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-inclusion-orange mt-0.5" />
                        <span>Unsubscribe at any time with one click</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-inclusion-orange mt-0.5" />
                        <span>GDPR compliant data handling</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
