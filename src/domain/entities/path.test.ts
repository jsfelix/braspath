import { City } from './city'
import { EndCityReachedError } from './errors/end-city-reached-error'
import { NotBoundaryCityError } from './errors/not-boundary-city-error'
import { Path } from './path'
import { User } from './user'

let startCity: City
let endCity: City
let middleCity: City
let user: User

describe('Path', () => {
  beforeEach(() => {
    endCity = City.create({
      name: 'São Paulo',
      state: 'SP',
      lat: 1,
      lon: 1,
      area: 123,
    })
    middleCity = City.create({
      name: 'Osasco',
      state: 'SP',
      lat: 2,
      lon: 2,
      area: 1234,
      boundaryCities: [
        {
          id: endCity.id.value,
          name: 'São Paulo',
          state: 'SP',
        },
      ],
    })
    startCity = City.create({
      name: 'Salvador',
      state: 'BA',
      lat: 10,
      lon: 10,
      area: 123456,
      boundaryCities: [
        {
          id: middleCity.id.value,
          name: 'Osasco',
          state: 'SP',
        },
      ],
    })
    endCity.boundaryCities = [
      {
        id: middleCity.id.value,
        name: 'Osasco',
        state: 'SP',
      },
    ]
    user = User.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
    })
  })

  it('should create a path', () => {
    const path = Path.create({ user, startCity, endCity })
    expect(path.user).toBeTruthy()
    expect(path.distance).toEqual(0)
    expect(path.startCity.name).toEqual('Salvador')
    expect(path.endCity.name).toEqual('São Paulo')
    expect(path.cities[0].name).toEqual('Salvador')
    expect(path.startedAt).toBeTruthy()
  })

  it('should add city to path', () => {
    const path = Path.create({ user, startCity, endCity })
    path.addCity(middleCity)
    expect(path.distance).toEqual(path.startCity.distanceTo(middleCity))
    expect(path.cities.length).toEqual(2)
  })

  it('should not add city if is not a boundary city of last city added', () => {
    const path = Path.create({ user, startCity, endCity })
    expect(() => path.addCity(endCity)).toThrow(NotBoundaryCityError)
  })

  it('should add last city of the path and finish game', () => {
    const path = Path.create({ user, startCity, endCity })
    path.addCity(middleCity)
    path.addCity(endCity)
    expect(path.finishedAt).toBeTruthy()
  })

  it('should not add city if endCity reached', () => {
    const path = Path.create({ user, startCity, endCity })
    path.addCity(middleCity)
    path.addCity(endCity)
    expect(() => path.addCity(middleCity)).toThrow(EndCityReachedError)
  })
})
