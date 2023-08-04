import { Id } from '../entities/id'
import { Path } from '../entities/path'

export interface PathRepository {
  create(path: Path): Promise<void>
  save(path: Path): Promise<void>
  findById(id: Id): Promise<Path | undefined>
}
