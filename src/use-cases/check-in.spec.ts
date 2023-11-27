import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRpository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckinUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInRpository
let sut: CheckinUseCase

describe('Checkin Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRpository()
    sut = new CheckinUseCase(checkInsRepository)
  })
  // Testa se a senha foi criptografada
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym_id 01',
      userId: 'user_is 01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
