export class NotPathBetweenCitiesError extends Error {
  constructor() {
    super('coult not find a path between cities')
  }
}
