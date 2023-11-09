import { z } from 'zod'
import 'dotenv/config'

const envScherma = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3334),
  DATABASE_URL: z.string(),
})

const _env = envScherma.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variable', _env.error.format())

  throw new Error('Invalid environment variable')
}

export const env = _env.data
