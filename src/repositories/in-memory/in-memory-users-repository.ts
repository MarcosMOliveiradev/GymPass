import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRpository implements UsersRepository {
  public itens: User[] = []

  async findByEmail(email: string) {
    const user = this.itens.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      nome: data.nome,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.itens.push(user)
    return user
  }
}
