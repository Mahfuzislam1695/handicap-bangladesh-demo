"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, ZoomIn, ZoomOut, Contrast, Volume2, EyeOff } from "lucide-react"

export function AccessibilityControls() {
  const [theme, setTheme] = useState("light")
  const [fontSize, setFontSize] = useState("base")
  const [highContrast, setHighContrast] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSynthesisAvailable, setSpeechSynthesisAvailable] = useState(false)

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === "undefined") return

    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (systemPrefersDark) {
      setTheme("dark")
    }

    // Initialize font size from localStorage
    const savedFontSize = localStorage.getItem("fontSize")
    if (savedFontSize) {
      setFontSize(savedFontSize)
    }

    // Initialize high contrast from localStorage
    const savedHighContrast = localStorage.getItem("highContrast") === "true"
    setHighContrast(savedHighContrast)

    // Check if speech synthesis is available
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSynthesisAvailable(true)
    }

    // Apply initial settings
    applySettings(savedTheme || (systemPrefersDark ? "dark" : "light"), savedFontSize || "base", savedHighContrast)
  }, [])

  const applySettings = (newTheme, newFontSize, newHighContrast) => {
    // Apply theme
    document.documentElement.classList.remove("light", "dark", "black-white")
    document.documentElement.classList.add(newTheme)

    // Apply font size
    document.documentElement.classList.remove("text-size-base", "text-size-large", "text-size-larger")
    document.documentElement.classList.add(`text-size-${newFontSize}`)

    // Apply high contrast
    if (newHighContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  const toggleTheme = () => {
    // Cycle through themes: light -> dark -> black-white -> light
    let newTheme
    if (theme === "light") {
      newTheme = "dark"
    } else if (theme === "dark") {
      newTheme = "black-white"
    } else {
      newTheme = "light"
    }

    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applySettings(newTheme, fontSize, highContrast)
  }

  const changeFontSize = (increase) => {
    let newFontSize

    if (increase) {
      newFontSize = fontSize === "base" ? "large" : "larger"
    } else {
      newFontSize = fontSize === "larger" ? "large" : "base"
    }

    if (newFontSize !== fontSize) {
      setFontSize(newFontSize)
      localStorage.setItem("fontSize", newFontSize)
      applySettings(theme, newFontSize, highContrast)
    }
  }

  const toggleHighContrast = () => {
    const newHighContrast = !highContrast
    setHighContrast(newHighContrast)
    localStorage.setItem("highContrast", String(newHighContrast))
    applySettings(theme, fontSize, newHighContrast)
  }

  const toggleTextToSpeech = () => {
    if (!speechSynthesisAvailable) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      // Get all visible text from the main content
      const mainContent = document.getElementById("main-content")
      if (!mainContent) return

      // Extract text content, excluding hidden elements
      const textContent = Array.from(mainContent.querySelectorAll("h1, h2, h3, p, li, a"))
        .filter((el) => {
          const style = window.getComputedStyle(el)
          return style.display !== "none" && style.visibility !== "hidden"
        })
        .map((el) => el.textContent)
        .join(". ")
        .replace(/\s+/g, " ")
        .trim()

      const utterance = new SpeechSynthesisUtterance(textContent)
      utterance.lang = "en-US"
      utterance.rate = 0.9

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      window.speechSynthesis.speak(utterance)
      setIsSpeaking(true)
    }
  }

  return (
    <div
      className="fixed right-4 top-20 z-50 flex flex-col gap-2 bg-background border rounded-lg p-2 shadow-md"
      role="region"
      aria-label="Accessibility controls"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-pressed={theme !== "light"}
        aria-label={
          theme === "light"
            ? "Switch to dark mode"
            : theme === "dark"
              ? "Switch to black and white mode for color blind users"
              : "Switch to light mode"
        }
      >
        {theme === "light" ? (
          <Moon className="h-4 w-4" />
        ) : theme === "dark" ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => changeFontSize(true)}
        disabled={fontSize === "larger"}
        aria-label="Increase font size"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => changeFontSize(false)}
        disabled={fontSize === "base"}
        aria-label="Decrease font size"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleHighContrast}
        aria-pressed={highContrast}
        aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
      >
        <Contrast className="h-4 w-4" />
      </Button>

      {speechSynthesisAvailable && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTextToSpeech}
          aria-pressed={isSpeaking}
          aria-label={isSpeaking ? "Stop text-to-speech" : "Start text-to-speech"}
          className={isSpeaking ? "bg-primary text-primary-foreground" : ""}
        >
          <Volume2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
