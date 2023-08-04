import { randomUUID } from 'node:crypto'

export class Id {
  private readonly _value: string

  get value() {
    return this._value
  }

  toString() {
    return this._value
  }

  constructor(id?: string) {
    this._value = id ?? randomUUID()
  }
}
