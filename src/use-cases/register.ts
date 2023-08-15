import { prisma } from '@/lib/prisma'
import { PrismaUserRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcrypt'

interface RegisterUserCaseRequest {
  nome: string
  email: string
  password: string
}

export async function registerUseCase({
  nome,
  email,
  password,
}: RegisterUserCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email ja exites')
  }

  const prismaUserRepository = new PrismaUserRepository()

  await prismaUserRepository.create({
    nome,
    email,
    password_hash,
  })
}
