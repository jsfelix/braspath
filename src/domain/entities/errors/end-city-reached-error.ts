export class EndCityReachedError extends Error {
  constructor() {
    super('end city already reached')
  }
}
