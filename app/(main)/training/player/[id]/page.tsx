"use client"

import { Switch } from "@/components/ui/switch"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Download,
  FileText,
  Pause,
  Play,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  List,
  X,
  Maximize,
  Minimize,
  Settings,
  Languages,
  HelpCircle,
  BookOpen,
  SkipForward,
  SkipBack,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock course data
const COURSE_DATA = {
  id: "inclusive-workplace-101",
  title: "Creating an Inclusive Workplace",
  description: "Learn how to create and maintain an inclusive workplace environment for people with disabilities.",
  modules: [
    {
      id: "module-1",
      title: "Understanding Disability Inclusion",
      type: "video",
      duration: "15:30",
      completed: true,
      content: "/placeholder.svg?height=720&width=1280&text=Video+Module",
    },
    {
      id: "module-2",
      title: "Legal Framework and Compliance",
      type: "document",
      duration: "20 pages",
      completed: true,
      content: "/placeholder.svg?height=1123&width=794&text=PDF+Document",
    },
    {
      id: "module-3",
      title: "Accessible Communication",
      type: "video",
      duration: "12:45",
      completed: false,
      content: "/placeholder.svg?height=720&width=1280&text=Video+Module",
    },
    {
      id: "module-4",
      title: "Workplace Accommodations",
      type: "interactive",
      duration: "25 min",
      completed: false,
      content: null,
    },
    {
      id: "module-5",
      title: "Knowledge Check",
      type: "quiz",
      duration: "10 questions",
      completed: false,
      content: null,
    },
  ],
  progress: 40,
  languages: ["English", "Bangla"],
}

// Mock quiz data
const QUIZ_DATA = {
  questions: [
    {
      id: "q1",
      type: "multiple-choice",
      question: "Which of the following is NOT typically considered a reasonable accommodation under disability laws?",
      options: [
        "Flexible work schedules",
        "Providing specialized equipment",
        "Complete exemption from essential job functions",
        "Modifying workplace policies",
      ],
      correctAnswer: 2,
    },
    {
      id: "q2",
      type: "true-false",
      question: "Employers are required to provide the exact accommodation requested by an employee with a disability.",
      options: ["True", "False"],
      correctAnswer: 1,
    },
    {
      id: "q3",
      type: "multiple-choice",
      question: "Which approach is most effective when communicating with a person who has a hearing impairment?",
      options: [
        "Speaking loudly and slowly",
        "Facing the person and speaking clearly",
        "Using complex hand gestures",
        "Avoiding direct eye contact",
      ],
      correctAnswer: 1,
    },
    {
      id: "q4",
      type: "short-answer",
      question: "Describe one way to make digital content more accessible for people with visual impairments.",
      correctAnswer: null, // Will be evaluated by instructor
    },
    {
      id: "q5",
      type: "multiple-choice",
      question: "What is the primary purpose of universal design?",
      options: [
        "To create separate facilities for people with disabilities",
        "To design products and environments usable by all people without adaptation",
        "To comply with minimum legal requirements",
        "To reduce construction costs",
      ],
      correctAnswer: 1,
    },
  ],
}

export default function TrainingPlayerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentModule, setCurrentModule] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showModuleList, setShowModuleList] = useState(false)
  const [language, setLanguage] = useState("English")
  const [quizAnswers, setQuizAnswers] = useState<(number | string | null)[]>([])
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showCertificateDialog, setShowCertificateDialog] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showAccessibilitySettings, setShowAccessibilitySettings] = useState(false)
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    captions: true,
    highContrast: false,
    textSize: "medium",
    playbackSpeed: 1,
  })

  const module = COURSE_DATA.modules[currentModule]

  useEffect(() => {
    // Reset state when module changes
    setIsPlaying(false)
    setQuizAnswers([])
    setQuizSubmitted(false)
  }, [currentModule])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handlePrevModule = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1)
    }
  }

  const handleNextModule = () => {
    if (currentModule < COURSE_DATA.modules.length - 1) {
      setCurrentModule(currentModule + 1)
    } else {
      // If we're at the last module, show certificate dialog
      setShowCertificateDialog(true)
    }
  }

  const handleQuizAnswer = (questionIndex: number, answer: number | string) => {
    if (quizSubmitted) return

    const newAnswers = [...quizAnswers]
    newAnswers[questionIndex] = answer
    setQuizAnswers(newAnswers)
  }

  const handleQuizSubmit = () => {
    // Check if all questions are answered
    if (quizAnswers.length < QUIZ_DATA.questions.length) {
      toast({
        title: "Please answer all questions",
        description: "You need to answer all questions before submitting.",
        variant: "destructive",
      })
      return
    }

    setQuizSubmitted(true)

    // Calculate score
    let correctAnswers = 0
    QUIZ_DATA.questions.forEach((question, index) => {
      if (question.type !== "short-answer" && quizAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / (QUIZ_DATA.questions.length - 1)) * 100)

    if (score >= 70) {
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score}%. You have passed this module.`,
      })

      // Mark module as completed
      const updatedModules = [...COURSE_DATA.modules]
      updatedModules[currentModule].completed = true

      // If this is the last module, show certificate
      if (currentModule === COURSE_DATA.modules.length - 1) {
        setTimeout(() => {
          setShowCertificateDialog(true)
        }, 1500)
      }
    } else {
      toast({
        title: "Quiz Completed",
        description: `You scored ${score}%. You need 70% to pass. Please try again.`,
        variant: "destructive",
      })
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const renderModuleContent = () => {
    switch (module.type) {
      case "video":
        return (
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={module.content as string}
              className="w-full h-full"
              poster="/placeholder.svg?height=720&width=1280&text=Video+Module"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={handlePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>

              <Progress value={30} className="flex-1" />

              <Button variant="ghost" size="icon" onClick={handleMuteToggle} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              <span className="text-sm text-white">4:35 / 15:30</span>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAccessibilitySettings(true)}
                aria-label="Accessibility settings"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>

            {accessibilitySettings.captions && (
              <div className="absolute bottom-16 left-0 right-0 bg-black/80 p-2 text-center text-white">
                <p className={`text-${accessibilitySettings.textSize}`}>
                  [Captions would appear here in a real implementation]
                </p>
              </div>
            )}
          </div>
        )

      case "document":
        return (
          <div className="bg-white rounded-lg overflow-hidden border">
            <div className="bg-gray-100 p-3 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                <span className="font-medium">Document Viewer</span>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[130px] h-8">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSE_DATA.languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </Button>
              </div>
            </div>
            <div className="p-4 flex justify-center">
              <div className="relative w-full max-w-3xl">
                <img
                  src={(module.content as string) || "/placeholder.svg"}
                  alt="Document preview"
                  className="max-h-[600px] w-full object-contain border shadow-sm"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white/90 p-2 rounded-full shadow">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">Page 1 of 20</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case "quiz":
        return (
          <div className="bg-white rounded-lg overflow-hidden border p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Knowledge Check</h3>
              <p className="text-muted-foreground">
                Complete this quiz to test your understanding of the course material.
              </p>
            </div>

            <div className="space-y-8">
              {QUIZ_DATA.questions.map((question, qIndex) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-medium">
                      Question {qIndex + 1}: {question.question}
                    </h4>
                    <Badge variant={quizSubmitted ? "outline" : "secondary"}>
                      {question.type === "multiple-choice"
                        ? "Multiple Choice"
                        : question.type === "true-false"
                          ? "True/False"
                          : "Short Answer"}
                    </Badge>
                  </div>

                  {question.type === "short-answer" ? (
                    <div className="mt-2">
                      <Textarea
                        placeholder="Type your answer here..."
                        rows={4}
                        value={(quizAnswers[qIndex] as string) || ""}
                        onChange={(e) => handleQuizAnswer(qIndex, e.target.value)}
                        disabled={quizSubmitted}
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <RadioGroup
                      value={quizAnswers[qIndex]?.toString() || ""}
                      onValueChange={(value) => handleQuizAnswer(qIndex, Number.parseInt(value))}
                      disabled={quizSubmitted}
                    >
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <div
                            key={`${question.id}-option-${oIndex}`}
                            className={`flex items-center space-x-2 p-2 rounded ${quizSubmitted && oIndex === question.correctAnswer
                                ? "bg-green-50"
                                : quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== question.correctAnswer
                                  ? "bg-red-50"
                                  : ""
                              }`}
                          >
                            <RadioGroupItem value={oIndex.toString()} id={`${question.id}-option-${oIndex}`} />
                            <Label htmlFor={`${question.id}-option-${oIndex}`} className="flex-1">
                              {option}
                            </Label>
                            {quizSubmitted && oIndex === question.correctAnswer && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                            {quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== question.correctAnswer && (
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}

                  {quizSubmitted && question.type !== "short-answer" && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <p className="font-medium">Explanation:</p>
                      <p className="text-muted-foreground">
                        {question.id === "q1"
                          ? "While employers must provide reasonable accommodations, they are not required to exempt employees from essential job functions, as this would fundamentally alter the nature of the position."
                          : question.id === "q2"
                            ? "Employers must provide a reasonable accommodation, but it doesn't have to be the exact one requested if an alternative effective accommodation is available."
                            : question.id === "q3"
                              ? "Facing the person and speaking clearly allows for lip reading and better understanding of facial expressions, which is helpful for many people with hearing impairments."
                              : question.id === "q5"
                                ? "Universal design focuses on creating products and environments that are usable by all people to the greatest extent possible, without the need for adaptation or specialized design."
                                : ""}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!quizSubmitted ? (
              <div className="mt-6 flex justify-end">
                <Button onClick={handleQuizSubmit}>Submit Quiz</Button>
              </div>
            ) : (
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setQuizSubmitted(false)}>
                  Try Again
                </Button>
                <Button onClick={handleNextModule}>Continue to Next Module</Button>
              </div>
            )}
          </div>
        )

      case "interactive":
        return (
          <div className="bg-white rounded-lg overflow-hidden border">
            <div className="bg-gray-100 p-3 flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                <span className="font-medium">Interactive Exercise</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Workplace Accommodations Scenario</h3>
              <p className="mb-6">
                In this interactive exercise, you'll work through real-world scenarios to practice identifying
                appropriate workplace accommodations.
              </p>

              <div className="border rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-2">Scenario:</h4>
                <p className="mb-4">
                  Sarah is a new employee with low vision who works as a data analyst. She needs to review large
                  spreadsheets and create reports. What accommodations might be appropriate?
                </p>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="option1" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="option1">Screen magnification software</Label>
                      <p className="text-sm text-muted-foreground">
                        Software that enlarges screen content for easier viewing
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="option2" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="option2">Screen reader technology</Label>
                      <p className="text-sm text-muted-foreground">Software that reads screen content aloud</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="option3" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="option3">Larger monitor</Label>
                      <p className="text-sm text-muted-foreground">A larger display to make content easier to see</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="option4" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="option4">High-contrast color settings</Label>
                      <p className="text-sm text-muted-foreground">Modified display settings to increase visibility</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Submit Answers</Button>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center p-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">Content not available</p>
          </div>
        )
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Button variant="ghost" size="sm" className="mb-2" onClick={() => router.push("/training")}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Courses
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{COURSE_DATA.title}</h1>
          <p className="text-muted-foreground">{COURSE_DATA.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowModuleList(!showModuleList)}>
            <List className="h-4 w-4 mr-1" />
            Modules
          </Button>

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[130px]">
              <Languages className="h-4 w-4 mr-1" />
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {COURSE_DATA.languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={() => setShowAccessibilitySettings(true)}>
            <Settings className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{module.title}</h2>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {module.duration}
            </Badge>
          </div>

          {renderModuleContent()}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevModule} disabled={currentModule === 0}>
              <SkipBack className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <Button onClick={handleNextModule} disabled={module.type === "quiz" && !quizSubmitted}>
              Next
              <SkipForward className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {showModuleList && (
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="p-4 bg-muted flex items-center justify-between">
              <h3 className="font-medium">Course Modules</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowModuleList(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium">Course Progress</p>
                <Badge variant="outline">{COURSE_DATA.progress}%</Badge>
              </div>

              <Progress value={COURSE_DATA.progress} className="mb-6" />

              <div className="space-y-2">
                {COURSE_DATA.modules.map((mod, index) => (
                  <div
                    key={mod.id}
                    className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${currentModule === index
                        ? "bg-inclusion-purple/10 border border-inclusion-purple/30"
                        : "hover:bg-muted"
                      }`}
                    onClick={() => setCurrentModule(index)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${mod.completed
                            ? "bg-green-100 text-green-600"
                            : currentModule === index
                              ? "bg-inclusion-purple/20 text-inclusion-purple"
                              : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {mod.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{mod.title}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          {mod.type === "video" ? (
                            <Play className="h-3 w-3 mr-1" />
                          ) : mod.type === "document" ? (
                            <FileText className="h-3 w-3 mr-1" />
                          ) : mod.type === "quiz" ? (
                            <HelpCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <BookOpen className="h-3 w-3 mr-1" />
                          )}
                          {mod.type.charAt(0).toUpperCase() + mod.type.slice(1)} • {mod.duration}
                        </div>
                      </div>
                    </div>

                    {mod.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Certificate Dialog */}
      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Course Completed!</DialogTitle>
            <DialogDescription>Congratulations on completing the course. Your certificate is ready.</DialogDescription>
          </DialogHeader>
          <div className="py-4 flex flex-col items-center">
            <div className="relative w-full h-64 border-8 border-inclusion-purple/20 rounded-lg mb-4">
              <Image
                src="/placeholder.svg?height=300&width=400&text=Certificate"
                alt="Certificate preview"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mb-4">
              Your certificate has been added to your profile. You can view and download it at any time.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => router.push("/dashboard/certificates")}>
              View All Certificates
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-1" />
              Download Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Accessibility Settings Dialog */}
      <Dialog open={showAccessibilitySettings} onOpenChange={setShowAccessibilitySettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accessibility Settings</DialogTitle>
            <DialogDescription>Customize your learning experience to meet your needs.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="captions">Closed Captions</Label>
                <p className="text-sm text-muted-foreground">Show text captions for video content</p>
              </div>
              <Switch
                id="captions"
                checked={accessibilitySettings.captions}
                onCheckedChange={(checked) => setAccessibilitySettings({ ...accessibilitySettings, captions: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="highContrast">High Contrast</Label>
                <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
              </div>
              <Switch
                id="highContrast"
                checked={accessibilitySettings.highContrast}
                onCheckedChange={(checked) =>
                  setAccessibilitySettings({ ...accessibilitySettings, highContrast: checked })
                }
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="textSize">Text Size</Label>
              <Select
                value={accessibilitySettings.textSize}
                onValueChange={(value) => setAccessibilitySettings({ ...accessibilitySettings, textSize: value })}
              >
                <SelectTrigger id="textSize">
                  <SelectValue placeholder="Select text size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="x-large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="playbackSpeed">Playback Speed</Label>
              <Select
                value={accessibilitySettings.playbackSpeed.toString()}
                onValueChange={(value) =>
                  setAccessibilitySettings({ ...accessibilitySettings, playbackSpeed: Number.parseFloat(value) })
                }
              >
                <SelectTrigger id="playbackSpeed">
                  <SelectValue placeholder="Select playback speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5x</SelectItem>
                  <SelectItem value="0.75">0.75x</SelectItem>
                  <SelectItem value="1">1x (Normal)</SelectItem>
                  <SelectItem value="1.25">1.25x</SelectItem>
                  <SelectItem value="1.5">1.5x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAccessibilitySettings(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAccessibilitySettings(false)}>Apply Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
