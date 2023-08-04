import { Id } from './id'

describe('Id', () => {
  it('should create an Id', () => {
    const id = new Id()
    expect(id.value).toBeTruthy()
    expect(id.toString()).toBeTruthy()
  })
})
