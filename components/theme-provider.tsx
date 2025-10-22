"use client"

import { useEffect, useState } from "react"

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme") || "light"
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }
  }, [])

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const newTheme = theme === "light" ? "dark" : "light"
      setTheme(newTheme)
      localStorage.setItem("theme", newTheme)
      document.documentElement.classList.toggle("dark", newTheme === "dark")
    }
  }

  if (!mounted) return <>{children}</>

  return <div data-theme-toggle={toggleTheme}>{children}</div>
}