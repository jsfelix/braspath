import { City } from '../entities/city'
import { Id } from '../entities/id'

export interface CityRepository {
  create(city: City): Promise<void>
  save(city: City): Promise<void>
  findById(id: Id): Promise<City | undefined>
  listAll(): Promise<City[]>
  listByState(state: string): Promise<City[]>
}
