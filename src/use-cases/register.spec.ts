import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcrypt'
import { InMemoryUsersRpository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRpository
let sut: RegisterUseCase
describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRpository()
    sut = new RegisterUseCase(usersRepository)
  })
  // Testa se a senha foi criptografada
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      nome: 'Marcos',
      email: 'marcos@marcos22.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  // testa se o email ja existe
  it('should not be able to register with same email twice', async () => {
    const email = 'marcos@marcos.com'

    await sut.execute({
      nome: 'Marcos',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        nome: 'Marcos',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  // testa se o usuario foi criado
  it('should be albe to register', async () => {
    const { user } = await sut.execute({
      nome: 'Marcos',
      email: 'marcos@marcos22.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
