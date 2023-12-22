import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkin-repository'

interface FetchUserCheckInsUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsUseCaseResponse {
  checkIn: CheckIn[]
}

export class FetchUserCheckInsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse> {
    const checkIn = await this.checkInRepository.findyManyByUserId(userId, page)

    return {
      checkIn,
    }
  }
}
