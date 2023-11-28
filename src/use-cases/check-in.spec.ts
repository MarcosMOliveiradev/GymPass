import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRpository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckinUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInRpository
let sut: CheckinUseCase

describe('Checkin Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRpository()
    sut = new CheckinUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  // Testa se a senha foi criptografada
  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym_id 01',
      userId: 'user_is 01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym_id 01',
      userId: 'user_is 01',
    })

    await expect(() => {
      sut.execute({
        gymId: 'gym_id 01',
        userId: 'user_is 01',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym_id 01',
      userId: 'user_is 01',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym_id 01',
      userId: 'user_is 01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
