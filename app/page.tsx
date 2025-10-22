"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { MapContainer } from "@/components/map-container"
import { PlacesList } from "@/components/places-list"
import { FavoritesList } from "@/components/favorites-list"

export default function Home() {
  const [places, setPlaces] = useState([])
  const [favorites, setFavorites] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [userLocation, setUserLocation] = useState(null)

  // Cargar favoritos del localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites")
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
    // Obtener ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [])

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const handleSearch = async (query) => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=10`,
      )
      const data = await response.json()
      setPlaces(data)
      if (data.length > 0) {
        setSelectedPlace(data[0])
      }
    } catch (error) {
      console.error("Error searching places:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (place) => {
    const isFavorited = favorites.some((fav) => fav.place_id === place.place_id)
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.place_id !== place.place_id))
    } else {
      setFavorites([...favorites, place])
    }
  }

  const isFavorited = (place) => {
    return favorites.some((fav) => fav.place_id === place.place_id)
  }

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        <Header onToggleFavorites={() => setShowFavorites(!showFavorites)} />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-96 flex flex-col bg-card border-r border-border overflow-hidden">
            <SearchBar onSearch={handleSearch} loading={loading} />

            {showFavorites ? (
              <FavoritesList favorites={favorites} onSelectPlace={setSelectedPlace} onToggleFavorite={toggleFavorite} />
            ) : (
              <PlacesList
                places={places}
                selectedPlace={selectedPlace}
                onSelectPlace={setSelectedPlace}
                onToggleFavorite={toggleFavorite}
                isFavorited={isFavorited}
              />
            )}
          </div>

          {/* Map */}
          <div className="hidden md:flex flex-1">
            <MapContainer selectedPlace={selectedPlace} places={places} userLocation={userLocation} />
          </div>
        </div>

        {/* Mobile Map View */}
        <div className="md:hidden flex-1 border-t border-border">
          <MapContainer selectedPlace={selectedPlace} places={places} userLocation={userLocation} />
        </div>
      </div>
    </ThemeProvider>
  )
}
