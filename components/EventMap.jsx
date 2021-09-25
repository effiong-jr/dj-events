import { useState, useEffect } from 'react'
import Image from 'next/image'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const EventMap = ({ event }) => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    width: '100%',
    height: '500px',
    zoom: 12,
  })

  useEffect(() => {
    // Get latitude & longitude from address.
    const fetchAddress = async () => {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${event.address}&apiKey=${process.env.GEOAPIFY_API_KEY}`
      )

      const address = await res.json()

      if (res.ok) {
        const lat = address.features[0].properties.lat
        const lng = address.features[0].properties.lon

        setLat(lat)
        setLng(lng)
        setViewport({ ...viewport, latitude: lat, longitude: lng })
        setLoading(false)
      } else {
        console.log('Address Error')
      }
    }

    fetchAddress()
  }, [])

  if (loading) {
    return false
  }

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      {' '}
      <Marker key={event.id} latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" width={30} height={30} alt="marker" />
      </Marker>{' '}
    </ReactMapGl>
  )
}

export default EventMap
