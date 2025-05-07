import Link from "next/link"
import {
  Keyboard,
  Eye,
  Volume2,
  MousePointer,
  ZoomIn,
  Contrast,
  Languages,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Accessibility,
  FileText,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccessibilityControls } from "@/components/accessibility-controls"

export default function AccessibilityPage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-inclusion-purple/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Accessibility className="h-12 w-12 text-inclusion-purple mb-2" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-inclusion-purple">
                Accessibility Features
              </h1>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Our platform is designed to be accessible to all users, including persons with disabilities. Learn about
                the accessibility features available and how to use them.
              </p>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-inclusion-blue mb-6">Our Accessibility Commitment</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  The Disability Inclusion Hub is committed to ensuring that our platform is accessible to all users,
                  including persons with disabilities. We follow the Web Content Accessibility Guidelines (WCAG) 2.1 at
                  the AA level and continuously work to improve the accessibility of our platform.
                </p>
                <p>
                  Our accessibility features are designed to accommodate users with various disabilities, including
                  visual, auditory, motor, and cognitive impairments. We believe that accessibility is not just about
                  compliance with standards, but about creating an inclusive experience for all users.
                </p>
                <p>
                  This page provides information on the accessibility features available on our platform and how to use
                  them. If you encounter any accessibility barriers or have suggestions for improvement, please contact
                  us through our{" "}
                  <Link href="/contact" className="text-inclusion-blue hover:underline">
                    Contact & Support
                  </Link>{" "}
                  page.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Features Tabs */}
        <section className="w-full py-12 md:py-24 bg-inclusion-purple/5">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-inclusion-purple mb-8 text-center">
              Available Accessibility Features
            </h2>

            <Tabs defaultValue="visual" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="visual">Visual</TabsTrigger>
                <TabsTrigger value="keyboard">Keyboard</TabsTrigger>
                <TabsTrigger value="screen-reader">Screen Reader</TabsTrigger>
                <TabsTrigger value="language">Language</TabsTrigger>
              </TabsList>

              <TabsContent value="visual" className="mt-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ZoomIn className="h-5 w-5 text-inclusion-purple" />
                        Text Size Adjustment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        You can adjust the text size on our platform to make it easier to read. Use the text size
                        controls in the accessibility panel to increase or decrease the font size.
                      </p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available on all pages</span>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Contrast className="h-5 w-5 text-inclusion-purple" />
                        High Contrast Mode
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        High contrast mode increases the contrast between text and background colors, making content
                        easier to read for users with low vision or color vision deficiencies.
                      </p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available on all pages</span>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5 text-inclusion-purple" />
                        Color Blind Mode
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Our black and white mode is designed for users with color blindness. It removes all colors and
                        displays content in black and white, ensuring that information is not conveyed by color alone.
                      </p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available on all pages</span>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-inclusion-purple" />
                        Alternative Text
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        All images on our platform have alternative text descriptions, which are read by screen readers
                        to provide context for users who cannot see the images.
                      </p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available for all images</span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="keyboard" className="mt-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Keyboard className="h-5 w-5 text-inclusion-blue" />
                        Keyboard Navigation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Our platform is fully navigable using only a keyboard. You can use the Tab key to move through
                        interactive elements, Enter to activate them, and Escape to close dialogs.
                      </p>
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium">Common Keyboard Shortcuts:</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <kbd className="px-2 py-1 rounded bg-muted text-xs">Tab</kbd>
                            <span>Move to the next interactive element</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <kbd className="px-2 py-1 rounded bg-muted text-xs">Shift + Tab</kbd>
                            <span>Move to the previous interactive element</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <kbd className="px-2 py-1 rounded bg-muted text-xs">Enter</kbd>
                            <span>Activate the current element</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <kbd className="px-2 py-1 rounded bg-muted text-xs">Escape</kbd>
                            <span>Close dialogs or menus</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available on all pages</span>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ArrowRight className="h-5 w-5 text-inclusion-blue" />
                        Skip to Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        A "Skip to Content" link is available at the top of each page, allowing keyboard users to bypass
                        the navigation menu and go directly to the main content. This link becomes visible when it
                        receives keyboard focus.
                      </p>
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium">How to Use:</h4>
                        <ol className="space-y-1 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="bg-inclusion-blue/10 text-inclusion-blue rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                              1
                            </span>
                            <span>When a page loads, press the Tab key once.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-inclusion-blue/10 text-inclusion-blue rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                              2
                            </span>
                            <span>The "Skip to Content" link will appear at the top of the page.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-inclusion-blue/10 text-inclusion-blue rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                              3
                            </span>
                            <span>Press Enter to activate the link and jump to the main content.</span>
                          </li>
                        </ol>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available on all pages</span>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MousePointer className="h-5 w-5 text-inclusion-blue" />
                        Focus Indicators
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        All interactive elements on our platform have visible focus indicators, making it clear which
                        element is currently focused when navigating with a keyboard.
                      </p>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                          <div className="w-full h-12 bg-muted rounded-md mb-2 flex items-center justify-center">
                            <div className="w-20 h-8 bg-inclusion-blue rounded-md ring-2 ring-offset-2 ring-inclusion-blue"></div>
                          </div>
                          <p className="text-sm font-medium">Button Focus</p>
                          <p className="text-xs text-muted-foreground">Buttons show a ring around them when focused.</p>
                        </div>
                        <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                          <div className="w-full h-12 bg-muted rounded-md mb-2 flex items-center justify-center">
                            <div className="w-32 h-8 bg-background border rounded-md ring-2 ring-offset-2 ring-inclusion-blue"></div>
                          </div>
                          <p className="text-sm font-medium">Input Focus</p>
                          <p className="text-xs text-muted-foreground">
                            Form inputs show a highlighted border when focused.
                          </p>
                        </div>
                        <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                          <div className="w-full h-12 bg-muted rounded-md mb-2 flex items-center justify-center">
                            <div className="text-inclusion-blue underline decoration-2 underline-offset-4">
                              Link Text
                            </div>
                          </div>
                          <p className="text-sm font-medium">Link Focus</p>
                          <p className="text-xs text-muted-foreground">
                            Links show an underline and color change when focused.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available for all interactive elements</span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="screen-reader" className="mt-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Volume2 className="h-5 w-5 text-inclusion-teal" />
                        Screen Reader Compatibility
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Our platform is compatible with popular screen readers, including JAWS, NVDA, VoiceOver, and
                        TalkBack. We use semantic HTML and ARIA attributes to ensure that screen readers can accurately
                        interpret the content.
                      </p>
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium">Supported Screen Readers:</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>JAWS (Windows)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>NVDA (Windows)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>VoiceOver (macOS, iOS)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>TalkBack (Android)</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available on all pages</span>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Volume2 className="h-5 w-5 text-inclusion-teal" />
                        Text-to-Speech
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Our platform includes a built-in text-to-speech feature that can read the content of the page
                        aloud. This feature is available through the accessibility controls panel and can be activated
                        with a single click.
                      </p>
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium">How to Use:</h4>
                        <ol className="space-y-1 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="bg-inclusion-teal/10 text-inclusion-teal rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                              1
                            </span>
                            <span>Click on the accessibility icon in the side panel.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-inclusion-teal/10 text-inclusion-teal rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                              2
                            </span>
                            <span>Click on the text-to-speech button (speaker icon).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-inclusion-teal/10 text-inclusion-teal rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                              3
                            </span>
                            <span>The content of the page will be read aloud.</span>
                          </li>
                        </ol>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available on all pages</span>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-inclusion-teal" />
                        Accessible Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        All documents and resources on our platform are designed to be accessible to screen readers.
                        This includes proper document structure, alternative text for images, and descriptive link text.
                      </p>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                          <FileText className="h-10 w-10 text-inclusion-teal mb-2" />
                          <p className="text-sm font-medium">PDF Documents</p>
                          <p className="text-xs text-muted-foreground">
                            Tagged PDFs with proper headings and alternative text.
                          </p>
                        </div>
                        <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                          <FileText className="h-10 w-10 text-inclusion-blue mb-2" />
                          <p className="text-sm font-medium">Word Documents</p>
                          <p className="text-xs text-muted-foreground">
                            Structured with headings, alternative text, and proper reading order.
                          </p>
                        </div>
                        <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                          <Volume2 className="h-10 w-10 text-inclusion-purple mb-2" />
                          <p className="text-sm font-medium">Audio & Video</p>
                          <p className="text-xs text-muted-foreground">
                            Transcripts and captions available for all multimedia content.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available for all resources</span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="language" className="mt-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Languages className="h-5 w-5 text-inclusion-orange" />
                        Multilingual Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Our platform is available in both English and Bangla, allowing users to access content in their
                        preferred language. You can switch between languages using the language toggle in the header.
                      </p>
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium">How to Change Language:</h4>
                        <ol className="space-y-1 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="bg-inclusion-orange/10 text-inclusion-orange rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                              1
                            </span>
                            <span>Click on the language toggle in the header (English/বাংলা).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-inclusion-orange/10 text-inclusion-orange rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                              2
                            </span>
                            <span>Select your preferred language.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-inclusion-orange/10 text-inclusion-orange rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                              3
                            </span>
                            <span>The page will reload with content in the selected language.</span>
                          </li>
                        </ol>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available on all pages</span>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-inclusion-orange" />
                        Simplified Language
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        We strive to use clear and simple language throughout our platform, avoiding jargon and complex
                        terminology where possible. This makes our content more accessible to users with cognitive
                        disabilities and those who are not fluent in the language.
                      </p>
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium">Our Approach:</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Short, clear sentences</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Everyday language instead of technical terms</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Explanations for necessary technical terms</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Consistent terminology throughout the platform</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Available on all pages</span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Device Compatibility */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-inclusion-blue mb-8 text-center">
                Device Compatibility
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-inclusion-blue/10 flex items-center justify-center">
                      <Monitor className="h-6 w-6 text-inclusion-blue" />
                    </div>
                    <CardTitle className="mt-2">Desktop</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Our platform is fully compatible with desktop computers running Windows, macOS, and Linux
                      operating systems. We support all major browsers, including Chrome, Firefox, Safari, and Edge.
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-inclusion-teal/10 flex items-center justify-center">
                      <Tablet className="h-6 w-6 text-inclusion-teal" />
                    </div>
                    <CardTitle className="mt-2">Tablet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Our platform is responsive and works well on tablets running iOS and Android. The interface adapts
                      to different screen sizes, ensuring a good user experience on tablet devices.
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-inclusion-purple/10 flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-inclusion-purple" />
                    </div>
                    <CardTitle className="mt-2">Mobile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Our platform is fully responsive and optimized for mobile devices. The interface adapts to small
                      screens, making it easy to access content and features on smartphones.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Feedback */}
        <section className="w-full py-12 md:py-24 bg-inclusion-teal/10">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-inclusion-teal mb-4">Accessibility Feedback</h2>
              <p className="text-muted-foreground mb-8">
                We are committed to continuously improving the accessibility of our platform. If you encounter any
                accessibility barriers or have suggestions for improvement, please let us know.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-inclusion-teal hover:bg-inclusion-teal/90">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View Accessibility Statement
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
