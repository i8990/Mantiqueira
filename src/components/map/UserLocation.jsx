import { useEffect, useState } from 'react'
import { useMap, Circle, CircleMarker } from 'react-leaflet'
import useAppStore from '../../stores/useAppStore'

export default function UserLocation() {
  const map = useMap()
  const setUserLocation = useAppStore(s => s.setUserLocation)
  const [position, setPosition] = useState(null)
  const [accuracy, setAccuracy] = useState(0)

  useEffect(() => {
    if (!navigator.geolocation) return

    function handlePosition(pos) {
      const latlng = [pos.coords.latitude, pos.coords.longitude]
      setPosition(latlng)
      setAccuracy(pos.coords.accuracy)
      setUserLocation(latlng)
    }

    navigator.geolocation.getCurrentPosition(handlePosition, () => {}, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })

    const watchId = navigator.geolocation.watchPosition(handlePosition, () => {}, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000,
    })

    return () => navigator.geolocation.clearWatch(watchId)
  }, [setUserLocation])

  if (!position) return null

  return (
    <>
      <Circle
        center={position}
        radius={accuracy}
        pathOptions={{
          color: '#3CE87A',
          fillColor: '#3CE87A',
          fillOpacity: 0.08,
          weight: 1,
          opacity: 0.3,
        }}
      />
      <CircleMarker
        center={position}
        radius={6}
        pathOptions={{
          color: '#fff',
          weight: 2,
          fillColor: '#3CE87A',
          fillOpacity: 1,
        }}
      />
    </>
  )
}
