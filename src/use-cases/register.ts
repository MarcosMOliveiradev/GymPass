import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcrypt'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserCaseRequest {
  nome: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ nome, email, password }: RegisterUserCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      nome,
      email,
      password_hash,
    })
  }
}
