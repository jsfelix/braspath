import { Id } from '@/domain/entities/id'

export abstract class Entity<Props> {
  private readonly _id: Id

  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: Id) {
    this.props = props
    this._id = id ?? new Id()
  }
}
