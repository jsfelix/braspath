import { Entity } from '@/shared/entities/entity'
import { Optional } from '@/shared/types/optional'

import { Id } from './id'

interface BoundaryCity {
  id: string
  name: string
  state: string
}

interface CityProps {
  name: string
  state: string
  lat: number
  lon: number
  area: number
  boundaryCities: BoundaryCity[]
}

export class City extends Entity<CityProps> {
  get name() {
    return this.props.name
  }

  get state() {
    return this.props.state
  }

  get fullName() {
    return `${this.props.name}/${this.props.state}`
  }

  get lat() {
    return this.props.lat
  }

  get lon() {
    return this.props.lon
  }

  get area() {
    return this.props.area
  }

  set boundaryCities(boundaryCities: BoundaryCity[]) {
    this.props.boundaryCities = boundaryCities.map((bc) => ({
      id: bc.id,
      name: bc.name,
      state: bc.state,
    }))
  }

  get boundaryCities() {
    return this.props.boundaryCities
  }

  private static degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180)
  }

  public static create(props: Optional<CityProps, 'boundaryCities'>, id?: Id) {
    const city = new City(
      {
        ...props,
        boundaryCities: props.boundaryCities ?? [],
      },
      id,
    )
    return city
  }

  public distanceTo(city: City): number {
    const earthRadiusKm = 6371
    let lat1 = this.lat
    let lat2 = city.lat
    const lon1 = this.lon
    const lon2 = city.lon

    // Convert latitude and longitude from degrees to radians
    const dLat = City.degreesToRadians(lat2 - lat1)
    const dLon = City.degreesToRadians(lon2 - lon1)

    // Convert latitudes to radians
    lat1 = City.degreesToRadians(lat1)
    lat2 = City.degreesToRadians(lat2)

    // Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    // Calculate the distance
    const distance = earthRadiusKm * c

    return distance
  }
}
