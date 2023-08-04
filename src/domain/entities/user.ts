import { Entity } from '@/shared/entities/entity'

import { Id } from './id'

interface UserProps {
  name: string
  email: string
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  public static create(props: UserProps, id?: Id) {
    const user = new User(props, id)
    return user
  }
}
