"use client"

import { Heart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FavoritesList({ favorites, onSelectPlace, onToggleFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-center">
        <div>
          <Heart className="w-12 h-12 mx-auto mb-2 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No hay favoritos guardados</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 bg-muted/50 border-b border-border">
        <p className="text-sm font-semibold text-foreground">
          {favorites.length} favorito{favorites.length !== 1 ? "s" : ""}
        </p>
      </div>
      {favorites.map((place) => (
        <div
          key={place.place_id}
          onClick={() => onSelectPlace(place)}
          className="p-4 border-b border-border cursor-pointer hover:bg-muted transition-colors"
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
              className="flex-shrink-0 text-accent hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
