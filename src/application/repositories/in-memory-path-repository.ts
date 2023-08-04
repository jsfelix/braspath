import { Id } from '@/domain/entities/id'
import { Path } from '@/domain/entities/path'
import { PathRepository } from '@/domain/repositories/path-repository'

export class InMemoryPathRepository implements PathRepository {
  private paths: Path[] = []

  public async create(path: Path): Promise<void> {
    this.paths.push(path)
  }

  public async save(path: Path): Promise<void> {
    const index = this.paths.findIndex(
      (findPath) => findPath.id.value === path.id.value,
    )
    this.paths[index] = path
  }

  public async findById(id: Id): Promise<Path | undefined> {
    return this.paths.find((path) => path.id.value === id.value)
  }
}
