"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  address: string
  latitude: number
  longitude: number
  radius: number
}

const Map = ({ address, latitude, longitude, radius }: MapProps) => {
  const [map, setMap] = useState<any>(null)

  useEffect(() => {
    if (map) {
      map.remove()
    }

    const initMap = async () => {
      const L = (await import('leaflet')).default

      // Fix marker icon issues
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/images/marker-icon-2x.png',
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
      })

      // Convert miles to meters for the circle radius
      const radiusInMeters = radius * 1609.34

      const mapInstance = L.map('map').setView([latitude, longitude], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance)

      L.marker([latitude, longitude]).addTo(mapInstance)
        .bindPopup(`<b>Location</b><br>${address}`)
        .openPopup()

      L.circle([latitude, longitude], {
        color: '#003087',
        fillColor: '#1a4fab',
        fillOpacity: 0.3,
        radius: radiusInMeters
      }).addTo(mapInstance)

      setMap(mapInstance)
    }

    initMap()

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [address, latitude, longitude, radius])

  return <div id="map" className="h-[400px] w-full rounded-lg mt-4" />
}

export default dynamic(() => Promise.resolve(Map), {
  ssr: false
})