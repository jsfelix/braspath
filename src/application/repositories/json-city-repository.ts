import json from '@/../.data/cities.json'
import { City } from '@/domain/entities/city'
import { Id } from '@/domain/entities/id'
import { CityRepository } from '@/domain/repositories/city-repository'

type CityJSON = {
  id: string
  name: string
  state: string
  lat: number
  lon: number
  area: number
  boundaryCities: {
    id: string
    name: string
    state: string
  }[]
}

const citiesJSON: CityJSON[] = json as CityJSON[]

export class JSONCityRepository implements CityRepository {
  private cities: City[] = []

  constructor() {
    citiesJSON.forEach(
      ({ name, state, lat, lon, area, boundaryCities, id }) => {
        const city = City.create(
          {
            name,
            state,
            lat,
            lon,
            area,
            boundaryCities,
          },
          new Id(id),
        )
        this.cities.push(city)
      },
    )
  }

  public async create(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async save(city: City): Promise<void> {
    const index = this.cities.findIndex((findCity) => findCity.id === city.id)
    this.cities[index] = city
  }

  public async findById(id: Id): Promise<City | undefined> {
    const city = this.cities.find((city) => city.id.value === id.value)
    if (!city) return undefined
    return city
  }

  public async listAll(): Promise<City[]> {
    return this.cities
  }

  public async listByState(state: string): Promise<City[]> {
    return this.cities.filter((city) => city.state === state)
  }
}
