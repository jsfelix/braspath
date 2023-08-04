import { User } from './user'

describe('User', () => {
  it('should create an user', () => {
    const user = User.create({ name: 'John Doe', email: 'johndoe@email.com' })
    expect(user.id.value).toBeTruthy()
    expect(user.name).toEqual('John Doe')
  })
})
