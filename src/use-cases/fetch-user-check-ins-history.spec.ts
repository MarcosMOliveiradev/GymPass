import { expect, describe, it, beforeEach, vi } from 'vitest'
import { InMemoryCheckInRpository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { FetchUserCheckInsUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInRpository
let sut: FetchUserCheckInsUseCase

describe('Fetch user check-in history Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRpository()
    sut = new FetchUserCheckInsUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      userId: 'user 01',
      page: 1,
    })

    expect(checkIn).toHaveLength(2)
    expect(checkIn).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 0; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }
    const { checkIn } = await sut.execute({
      userId: 'user 01',
      page: 2,
    })

    expect(checkIn).toHaveLength(2)
    expect(checkIn).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
