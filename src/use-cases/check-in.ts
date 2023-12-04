import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkin-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'
import { getDistanceBetweenCordinates } from '@/utils/get-distance-between-coordinates'

interface CheckinUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn
}

export class CheckinUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const maxDistance = 0.1

    if (distance > maxDistance) {
      throw new Error()
    }

    const checkInOnSomeDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    console.log(checkInOnSomeDay)

    if (checkInOnSomeDay) {
      throw new Error('aaaaa')
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
