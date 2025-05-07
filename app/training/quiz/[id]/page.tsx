"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CheckCircle,
  Clock,
  HelpCircle,
  ChevronLeft,
  AlertTriangle,
  Send,
  ArrowRight,
  ArrowLeft,
  Flag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

// Mock quiz data
const QUIZ_DATA = {
  id: "inclusive-workplace-101-quiz",
  title: "Creating an Inclusive Workplace - Final Assessment",
  description: "Test your knowledge on creating inclusive workplaces for people with disabilities.",
  timeLimit: 30, // minutes
  passingScore: 70,
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
      minWords: 30,
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
    {
      id: "q6",
      type: "multiple-select",
      question: "Which of the following are examples of assistive technologies? (Select all that apply)",
      options: ["Screen readers", "Braille displays", "Voice recognition software", "Standard computer mouse"],
      correctAnswers: [0, 1, 2],
    },
    {
      id: "q7",
      type: "true-false",
      question: "The social model of disability focuses on how society creates barriers for people with impairments.",
      options: ["True", "False"],
      correctAnswer: 0,
    },
    {
      id: "q8",
      type: "short-answer",
      question: "Explain the concept of 'reasonable accommodation' and provide an example in a workplace setting.",
      correctAnswer: null,
      minWords: 40,
    },
    {
      id: "q9",
      type: "multiple-choice",
      question: "Which of the following is an example of inclusive language?",
      options: [
        "Wheelchair-bound person",
        "Person with a disability",
        "Handicapped individual",
        "Special needs person",
      ],
      correctAnswer: 1,
    },
    {
      id: "q10",
      type: "multiple-select",
      question: "Which of the following are benefits of an inclusive workplace? (Select all that apply)",
      options: [
        "Increased innovation and creativity",
        "Improved employee morale and retention",
        "Reduced legal compliance requirements",
        "Access to a wider talent pool",
      ],
      correctAnswers: [0, 1, 3],
    },
  ],
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | number[] | string | null)[]>(
    Array(QUIZ_DATA.questions.length).fill(null),
  )
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([])
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_DATA.timeLimit * 60) // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  const question = QUIZ_DATA.questions[currentQuestion]

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Calculate progress
  const progress = Math.round((answers.filter((a) => a !== null).length / QUIZ_DATA.questions.length) * 100)

  // Handle single choice answer
  const handleSingleAnswer = (value: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  // Handle multiple choice answer
  const handleMultipleAnswer = (value: number) => {
    const currentAnswer = (answers[currentQuestion] as number[]) || []
    let newAnswer: number[]

    if (currentAnswer.includes(value)) {
      newAnswer = currentAnswer.filter((v) => v !== value)
    } else {
      newAnswer = [...currentAnswer, value]
    }

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = newAnswer
    setAnswers(newAnswers)
  }

  // Handle text answer
  const handleTextAnswer = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  // Toggle flagged question
  const toggleFlagged = (index: number) => {
    if (flaggedQuestions.includes(index)) {
      setFlaggedQuestions(flaggedQuestions.filter((q) => q !== index))
    } else {
      setFlaggedQuestions([...flaggedQuestions, index])
    }
  }

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestion < QUIZ_DATA.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Submit quiz
  const submitQuiz = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setQuizSubmitted(true)
      setShowResults(true)
      setIsSubmitting(false)

      // Calculate score for auto-graded questions
      const answeredQuestions = answers.filter(
        (a, i) => a !== null && QUIZ_DATA.questions[i].type !== "short-answer",
      ).length

      const correctAnswers = answers.reduce((count, answer, index) => {
        const question = QUIZ_DATA.questions[index]

        if (question.type === "short-answer") {
          return count // Skip short answer questions
        }

        if (question.type === "multiple-select") {
          const selectedAnswers = (answer as number[]) || []
          const correctAnswers = question.correctAnswers as number[]

          // Check if arrays are equal (same length and all items match)
          const isCorrect =
            selectedAnswers.length === correctAnswers.length && correctAnswers.every((a) => selectedAnswers.includes(a))

          return isCorrect ? count + 1 : count
        }

        return answer === question.correctAnswer ? count + 1 : count
      }, 0)

      const score = Math.round((correctAnswers / answeredQuestions) * 100)

      toast({
        title: score >= QUIZ_DATA.passingScore ? "Quiz Passed!" : "Quiz Completed",
        description: `You scored ${score}%. ${score >= QUIZ_DATA.passingScore ? "Congratulations!" : "Please review your answers."}`,
        variant: score >= QUIZ_DATA.passingScore ? "default" : "destructive",
      })
    }, 2000)
  }

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    const answer = answers[currentQuestion]

    if (answer === null) return false

    if (Array.isArray(answer)) {
      return answer.length > 0
    }

    if (typeof answer === "string") {
      return answer.trim().length > 0
    }

    return true
  }

  // Count words in text
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length
  }

  // Render question content
  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple-choice":
      case "true-false":
        return (
          <RadioGroup
            value={answers[currentQuestion]?.toString() || ""}
            onValueChange={(value) => handleSingleAnswer(Number.parseInt(value))}
            disabled={quizSubmitted}
          >
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={`${question.id}-option-${index}`}
                  className={`flex items-center space-x-2 p-3 rounded-md border ${
                    answers[currentQuestion] === index
                      ? "border-inclusion-purple bg-inclusion-purple/5"
                      : "border-muted"
                  }`}
                >
                  <RadioGroupItem value={index.toString()} id={`${question.id}-option-${index}`} />
                  <Label htmlFor={`${question.id}-option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>

                  {quizSubmitted && (
                    <>
                      {index === question.correctAnswer && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {answers[currentQuestion] === index && index !== question.correctAnswer && (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </RadioGroup>
        )

      case "multiple-select":
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const currentAnswers = (answers[currentQuestion] as number[]) || []
              const isSelected = currentAnswers.includes(index)

              return (
                <div
                  key={`${question.id}-option-${index}`}
                  className={`flex items-center space-x-2 p-3 rounded-md border ${
                    isSelected ? "border-inclusion-purple bg-inclusion-purple/5" : "border-muted"
                  }`}
                >
                  <Checkbox
                    id={`${question.id}-option-${index}`}
                    checked={isSelected}
                    onCheckedChange={() => handleMultipleAnswer(index)}
                    disabled={quizSubmitted}
                  />
                  <Label htmlFor={`${question.id}-option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>

                  {quizSubmitted && (
                    <>
                      {(question.correctAnswers as number[]).includes(index) && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {isSelected && !(question.correctAnswers as number[]).includes(index) && (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )

      case "short-answer":
        const answer = (answers[currentQuestion] as string) || ""
        const wordCount = countWords(answer)
        const minWords = question.minWords || 0

        return (
          <div className="space-y-3">
            <Textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => handleTextAnswer(e.target.value)}
              disabled={quizSubmitted}
              className="min-h-[150px]"
            />
            <div className="flex justify-between text-sm">
              <span className={wordCount < minWords ? "text-red-500" : "text-muted-foreground"}>
                Word count: {wordCount} {minWords > 0 ? `(minimum: ${minWords})` : ""}
              </span>
              {quizSubmitted && (
                <span className="text-amber-600 font-medium">This answer will be reviewed by an instructor</span>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Button variant="ghost" size="sm" className="mb-2" onClick={() => setShowExitConfirm(true)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Exit Quiz
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{QUIZ_DATA.title}</h1>
          <p className="text-muted-foreground">{QUIZ_DATA.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Clock className="h-4 w-4" />
            Time Remaining: {formatTime(timeRemaining)}
          </Badge>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFlagged(currentQuestion)}
            className={flaggedQuestions.includes(currentQuestion) ? "bg-amber-50" : ""}
          >
            <Flag className={`h-4 w-4 mr-1 ${flaggedQuestions.includes(currentQuestion) ? "text-amber-500" : ""}`} />
            {flaggedQuestions.includes(currentQuestion) ? "Unflag" : "Flag for Review"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_250px]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="px-3 py-1">
                  Question {currentQuestion + 1} of {QUIZ_DATA.questions.length}
                </Badge>
                <Badge
                  variant={
                    question.type === "multiple-choice"
                      ? "default"
                      : question.type === "true-false"
                        ? "secondary"
                        : question.type === "multiple-select"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {question.type === "multiple-choice"
                    ? "Multiple Choice"
                    : question.type === "true-false"
                      ? "True/False"
                      : question.type === "multiple-select"
                        ? "Select All That Apply"
                        : "Short Answer"}
                </Badge>
              </div>
              <CardTitle className="text-xl mt-2">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>{renderQuestionContent()}</CardContent>
            <CardFooter className="flex justify-between pt-3">
              <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              {currentQuestion < QUIZ_DATA.questions.length - 1 ? (
                <Button onClick={nextQuestion} disabled={!isCurrentQuestionAnswered()}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={() => setShowConfirmSubmit(true)} disabled={!isCurrentQuestionAnswered()}>
                  Submit Quiz
                  <Send className="h-4 w-4 ml-1" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quiz Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                {answers.filter((a) => a !== null).length} of {QUIZ_DATA.questions.length} questions answered
              </p>

              <Separator />

              <div className="grid grid-cols-5 gap-2">
                {QUIZ_DATA.questions.map((_, index) => {
                  const isAnswered = answers[index] !== null
                  const isFlagged = flaggedQuestions.includes(index)
                  const isCurrent = currentQuestion === index

                  return (
                    <Button
                      key={`question-nav-${index}`}
                      variant="outline"
                      size="sm"
                      className={`h-10 w-10 p-0 ${
                        isCurrent
                          ? "border-inclusion-purple bg-inclusion-purple/10"
                          : isAnswered
                            ? "bg-inclusion-purple text-white hover:bg-inclusion-purple/90"
                            : ""
                      } ${isFlagged ? "ring-2 ring-amber-500" : ""}`}
                      onClick={() => setCurrentQuestion(index)}
                    >
                      {index + 1}
                    </Button>
                  )
                })}
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center text-sm">
                  <div className="w-4 h-4 rounded-sm bg-inclusion-purple mr-2"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-4 h-4 rounded-sm border border-muted mr-2"></div>
                  <span>Unanswered</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-4 h-4 rounded-sm border border-muted ring-2 ring-amber-500 mr-2"></div>
                  <span>Flagged for review</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quiz Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time Limit:</span>
                <span>{QUIZ_DATA.timeLimit} minutes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Passing Score:</span>
                <span>{QUIZ_DATA.passingScore}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Questions:</span>
                <span>{QUIZ_DATA.questions.length}</span>
              </div>

              <Separator className="my-2" />

              <div className="text-sm text-muted-foreground">
                <HelpCircle className="h-4 w-4 inline-block mr-1" />
                <span>Need help? Contact your instructor or administrator for assistance.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirm Submit Dialog */}
      <Dialog open={showConfirmSubmit} onOpenChange={setShowConfirmSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Quiz?</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your quiz? You won't be able to change your answers after submission.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Questions answered:</span> {answers.filter((a) => a !== null).length} of{" "}
                {QUIZ_DATA.questions.length}
              </p>

              {flaggedQuestions.length > 0 && (
                <p className="text-sm text-amber-600">
                  <Flag className="h-4 w-4 inline-block mr-1" />
                  You have {flaggedQuestions.length} question(s) flagged for review.
                </p>
              )}

              {answers.some((a) => a === null) && (
                <p className="text-sm text-red-600">
                  <AlertTriangle className="h-4 w-4 inline-block mr-1" />
                  You have {answers.filter((a) => a === null).length} unanswered question(s).
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>
              Continue Quiz
            </Button>
            <Button
              onClick={() => {
                setShowConfirmSubmit(false)
                submitQuiz()
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
                  Submitting...
                </>
              ) : (
                "Submit Quiz"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Exit Confirm Dialog */}
      <Dialog open={showExitConfirm} onOpenChange={setShowExitConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit Quiz?</DialogTitle>
            <DialogDescription>Are you sure you want to exit? Your progress will be lost.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExitConfirm(false)}>
              Continue Quiz
            </Button>
            <Button variant="destructive" onClick={() => router.push("/training")}>
              Exit Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
