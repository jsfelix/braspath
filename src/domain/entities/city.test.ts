import { City } from './city'

describe('City', () => {
  it('should create a City', () => {
    const city = City.create({
      name: 'Salvador',
      state: 'BA',
      area: 1234,
      lat: 0,
      lon: 0,
    })
    expect(city.name).toEqual('Salvador')
    expect(city.state).toEqual('BA')
    expect(city.fullName).toEqual('Salvador/BA')
    expect(city.lat).toEqual(0)
    expect(city.lon).toEqual(0)
    expect(city.area).toEqual(1234)
    expect(city.boundaryCities.length).toEqual(0)
  })

  it('should calculate distance between two cities', () => {
    const city = City.create({
      name: 'Salvador',
      state: 'BA',
      area: 1234,
      lat: -13.0069,
      lon: -38.4864,
    })
    const cityB = City.create({
      name: 'Feira de Santana',
      state: 'BA',
      area: 1234,
      lat: -12.2568,
      lon: -38.9616,
      boundaryCities: [
        {
          id: '123',
          name: 'Cidade A',
          state: 'BA',
        },
      ],
    })
    expect(Math.round(city.distanceTo(cityB))).toEqual(98)
  })
})
