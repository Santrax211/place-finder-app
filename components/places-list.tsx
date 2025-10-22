"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PlacesList({ places, selectedPlace, onSelectPlace, onToggleFavorite, isFavorited }) {
  if (places.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-center">
        <div>
          <p className="text-muted-foreground">Busca un lugar para comenzar</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {places.map((place) => (
        <div
          key={place.place_id}
          onClick={() => onSelectPlace(place)}
          className={`p-4 border-b border-border cursor-pointer transition-colors ${
            selectedPlace?.place_id === place.place_id ? "bg-accent/10 border-l-4 border-l-accent" : "hover:bg-muted"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{place.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{place.address || place.display_name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite(place)
              }}
              className={`flex-shrink-0 ${
                isFavorited(place) ? "text-accent" : "text-muted-foreground hover:text-accent"
              }`}
            >
              <Heart className="w-4 h-4" fill={isFavorited(place) ? "currentColor" : "none"} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
