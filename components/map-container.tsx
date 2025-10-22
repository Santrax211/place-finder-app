"use client"

import { useEffect, useRef } from "react"

export function MapContainer({ selectedPlace, places, userLocation }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const leafletRef = useRef(null)

  useEffect(() => {
    // Importar Leaflet dinámicamente solo en el cliente
    const initMap = async () => {
      if (typeof window === 'undefined') return
      
      if (!leafletRef.current) {
        const L = await import('leaflet')
        await import('leaflet/dist/leaflet.css')
        leafletRef.current = L.default
      }

      const L = leafletRef.current
      if (!mapRef.current || !L) return

      // Inicializar mapa
      if (!mapInstanceRef.current) {
        const defaultLat = userLocation?.lat || 40.4168
        const defaultLng = userLocation?.lng || -3.7038

        mapInstanceRef.current = L.map(mapRef.current).setView([defaultLat, defaultLng], 13)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(mapInstanceRef.current)
      }

      // Limpiar marcadores anteriores
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []

      // Agregar marcador de ubicación del usuario
      if (userLocation) {
        const userMarker = L.circleMarker([userLocation.lat, userLocation.lng], {
          radius: 8,
          fillColor: "#3b82f6",
          color: "#1e40af",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        })
          .addTo(mapInstanceRef.current)
          .bindPopup("Tu ubicación")

        markersRef.current.push(userMarker)
      }

      // Agregar marcadores de lugares
      places.forEach((place) => {
        const marker = L.marker([place.lat, place.lon])
          .addTo(mapInstanceRef.current)
          .bindPopup(`<strong>${place.name}</strong><br/>${place.display_name}`)

        markersRef.current.push(marker)
      })

      // Centrar en lugar seleccionado
      if (selectedPlace) {
        mapInstanceRef.current.setView([selectedPlace.lat, selectedPlace.lon], 15)

        const selectedMarker = L.marker([selectedPlace.lat, selectedPlace.lon], {
          icon: L.icon({
            iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
        })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<strong>${selectedPlace.name}</strong>`)
          .openPopup()

        markersRef.current.push(selectedMarker)
      }
    }

    initMap()
  }, [selectedPlace, places, userLocation])

  return <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" style={{ minHeight: "400px" }} />
}