import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  findById(id: string): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findyManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  coutByUserId(userId: string): Promise<number>
  findByUserIdOnDate(userId: string, data: Date): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
