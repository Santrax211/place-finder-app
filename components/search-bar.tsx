"use client"

import { useState } from "react"
import { Search, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-border">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar lugares..."
          className="flex-1 px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </Button>
      </div>
    </form>
  )
}
