import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRpository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcrypt'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'
let usersRepository: InMemoryUsersRpository
let SUT: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRpository()
    SUT = new GetUserProfileUseCase(usersRepository)
  })
  it('should be albe to get user profile', async () => {
    const createdUser = await usersRepository.create({
      nome: 'Marcos Monteiro',
      email: 'marcos@marcos22.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await SUT.execute({
      userId: createdUser.id,
    })

    expect(user.nome).toEqual('Marcos Monteiro')
  })

  it('should not be albe to get user profile with wrong id', async () => {
    expect(() =>
      SUT.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
