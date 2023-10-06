import { expect, describe, it } from 'vitest'
import { InMemoryUsersRpository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be albe to Authentication', async () => {
    const usersRepository = new InMemoryUsersRpository()
    const SUT = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRpository()
    const SUT = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      nome: 'Marcos Monteiro',
      email: 'marcos@marcos22.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      SUT.execute({
        email: 'marcos@marcos22.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  // senha incorreta
  it('should not be albe to Authentication with wrong password', async () => {
    const usersRepository = new InMemoryUsersRpository()
    const SUT = new AuthenticateUseCase(usersRepository)

    expect(() =>
      SUT.execute({
        email: 'marcos@marcos22.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
