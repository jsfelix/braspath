import { City } from '../entities/city'
import { Id } from '../entities/id'
import { CityRepository } from '../repositories/city-repository'
import { CityNotFoundError } from './errors/city-not-found-error'
import { NotPathBetweenCitiesError } from './errors/not-path-between-cities-error'

interface GetShortestDistanceInput {
  idA: string
  idB: string
}

export class GetShortestDistanceUseCase {
  constructor(private cityRepository: CityRepository) {}

  public async execute({ idA, idB }: GetShortestDistanceInput) {
    const startCity = await this.cityRepository.findById(new Id(idA))
    const endCity = await this.cityRepository.findById(new Id(idB))
    if (!startCity || !endCity) throw new CityNotFoundError()

    const data = await this.cityRepository.listAll()
    const queue = [
      {
        city: startCity,
        distance: 0,
        path: [startCity.fullName],
      },
    ]
    const visited = new Set()

    while (queue.length > 0) {
      const { city, distance, path } = queue.shift() as {
        city: City
        distance: number
        path: string[]
      }

      if (city.id.value === idB) {
        return { distance, path }
      }

      for (const neighbor of city.boundaryCities) {
        if (!visited.has(neighbor.id)) {
          const neighborCity = data.find(
            (m) => m.id.value === neighbor.id,
          ) as City
          const neighborDistance = distance + city.distanceTo(neighborCity)
          const neighborPath = [...path, neighborCity.fullName]
          queue.push({
            city: neighborCity,
            distance: neighborDistance,
            path: neighborPath,
          })
          visited.add(neighbor.id)
        }
      }
    }

    throw new NotPathBetweenCitiesError()
  }
}
