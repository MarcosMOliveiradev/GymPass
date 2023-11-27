import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRpository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRpository
let SUT: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRpository()
    SUT = new AuthenticateUseCase(usersRepository)
  })
  it('should be albe to Authentication', async () => {
    await usersRepository.create({
      nome: 'Marcos Monteiro',
      email: 'marcos@marcos22.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await SUT.execute({
      email: 'marcos@marcos22.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  // email no existe
  it('should not be albe to Authentication with wrong email', async () => {
    await usersRepository.create({
      nome: 'Marcos Monteiro',
      email: 'marcos@marcos22.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      SUT.execute({
        email: 'marcos@marcos22.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  // senha incorreta
  it('should not be albe to Authentication with wrong password', async () => {
    await expect(() =>
      SUT.execute({
        email: 'marcos@marcos22.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
