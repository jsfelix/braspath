import { Entity } from '@/domain/entities/entity'

import { Optional } from '../types/optional'
import { City } from './city'
import { EndCityReachedError } from './errors/end-city-reached-error'
import { NotBoundaryCityError } from './errors/not-boundary-city-error'
import { Id } from './id'
import { User } from './user'

interface PathProps {
  user: User
  startCity: City
  endCity: City
  cities: City[]
  distance: number
  startedAt: Date
  finishedAt?: Date
}

export class Path extends Entity<PathProps> {
  get user() {
    return this.props.user
  }

  get startCity() {
    return this.props.startCity
  }

  get endCity() {
    return this.props.endCity
  }

  get cities() {
    return this.props.cities
  }

  get distance() {
    return this.props.distance
  }

  get startedAt() {
    return this.props.startedAt
  }

  get finishedAt() {
    return this.props.finishedAt
  }

  private finish() {
    this.props.finishedAt = new Date()
  }

  public addCity(city: City) {
    if (this.finishedAt) throw new EndCityReachedError()
    const lastCity = this.props.cities[this.props.cities.length - 1]
    if (!lastCity.boundaryCities.map((c) => c.id).includes(city.id.value))
      throw new NotBoundaryCityError()
    this.props.distance += lastCity.distanceTo(city)
    this.props.cities.push(city)
    if (city.id.value === this.endCity.id.value) this.finish()
  }

  public static create(
    props: Optional<PathProps, 'cities' | 'distance' | 'startedAt'>,
    id?: Id,
  ) {
    const path = new Path(
      {
        ...props,
        cities: [props.startCity],
        distance: 0,
        startedAt: new Date(),
      },
      id,
    )
    return path
  }
}
