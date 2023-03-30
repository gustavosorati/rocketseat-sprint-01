import { useEffect, useState } from 'react'
import * as Styled from './styles'
import { Marker, TileLayer } from 'react-leaflet'
import { renderToString } from 'react-dom/server'
import { divIcon } from 'leaflet'
import { api } from '@/services/http'

interface Props {
  cep: string
}

interface ICoodinates {
  latitude: string
  longitude: string
}

const iconMarkup = renderToString(
  <Styled.Icon>
    <img src="/logo.svg" alt="brand" />
  </Styled.Icon>,
)

const customMarkerIcon = divIcon({
  html: iconMarkup,
  iconSize: [0, 0],
  className: 'leaflet-div-icon',
})

export function GeoMap({ cep }: Props) {
  const [coordinates, setCoordinates] = useState<ICoodinates>({} as ICoodinates)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(`/location/coordinates/${cep}`)

        setCoordinates(response.data.coordinates)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    getCoordinates()
  }, [cep])

  if (isLoading) return <p>Carregando</p>

  return (
    <>
      <Styled.MapContainer
        id="map"
        center={[Number(coordinates.latitude), Number(coordinates.longitude)]}
        zoom={14}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="">OpenStreetMap</a> contributors'
          url={`https://maps.geoapify.com/v1/tile/positron/{z}/{x}/{y}.png?&apiKey=b03a45222f3c4983b87d57a8eb5d2ae3`}
        />
        <Marker
          position={[
            Number(coordinates.latitude),
            Number(coordinates.longitude),
          ]}
          icon={customMarkerIcon}
        />
      </Styled.MapContainer>
    </>
  )
}
