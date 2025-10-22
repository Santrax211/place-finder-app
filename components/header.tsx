"use client"

import { useState, useEffect } from "react"
import { MapPin, Moon, Sun, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header({ onToggleFavorites }) {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <header className="bg-primary text-primary-foreground px-4 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          <h1 className="text-2xl font-bold">PlaceFinder</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorites}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Heart className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
