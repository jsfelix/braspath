import readline from 'node:readline'

import { JSONCityRepository } from './application/repositories/json-city-repository'
import { Id } from './domain/entities/id'
import { Path } from './domain/entities/path'
import { User } from './domain/entities/user'
import { GetShortestDistanceUseCase } from './domain/use-cases/get-shortest-distance'

const cityRepository = new JSONCityRepository()

async function question(path: Path) {
  const rl = readline.createInterface(process.stdin, process.stdout)
  const lastCity = path.cities[path.cities.length - 1]
  const getShortestDistance = new GetShortestDistanceUseCase(cityRepository)
  const { distance, path: minPath } = await getShortestDistance.execute({
    idA: lastCity.id.value,
    idB: path.endCity.id.value,
  })
  console.log('Cidade inicial:', path.startCity.fullName)
  console.log('Cidade destino:', path.endCity.fullName)
  console.log(`Você está em \x1b[33m${lastCity.fullName} \x1b[0m`)
  console.log('')
  console.log('Distância percorrida:', Math.round(path.distance), 'km')
  console.log(
    'Distância mínima até o destino:',
    Math.round(distance),
    'km em',
    minPath.length - 1,
    `passo${minPath.length - 1 > 1 ? 's' : ''}`,
  )
  console.log(
    'Continue assim e termine o trajeto com',
    Math.round(distance + path.distance),
    'km em',
    path.cities.length + minPath.length - 2,
    `passo${path.cities.length + minPath.length - 2 > 1 ? 's' : ''}!`,
  )
  console.log()
  console.log('Opções para a próxima cidade:')
  console.table(
    lastCity.boundaryCities.map((bc) => ({
      id: bc.id,
      name: `${bc.name}/${bc.state}`,
    })),
  )
  if (path.finishedAt) {
    console.log('PARABÉNS!!! Alcançou o seu destino!')
    process.exit(0)
  }
  rl.question('Digite a próxima cidade: ', async (cityId) => {
    const city = await cityRepository.findById(new Id(cityId))
    if (!city) {
      console.error('Cidade inválida!')
      process.exit(1)
    }
    path.addCity(city)
    rl.close()
    console.clear()
    question(path)
  })
}

async function run() {
  const startCity = await cityRepository.findById(new Id(process.argv[2]))
  const endCity = await cityRepository.findById(new Id(process.argv[3]))
  console.clear()
  if (!startCity || !endCity) {
    console.error('usage: npm start startCityId endCityId')
    process.exit(1)
  }
  if (!endCity) {
    console.error('end city not found')
    process.exit(1)
  }
  const user = User.create({
    name: 'John Doe',
    email: 'johndoe@email.com',
  })
  const path = Path.create({
    user,
    startCity,
    endCity,
  })

  question(path)
}

run()
