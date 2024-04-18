import User from 'type/user'
import bcrypt from 'bcrypt'
import { prisma } from '~/db.server'

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  return null
}

export async function register(username: string, password: string) {
  let passwordHash = await bcrypt.hash(password, 10)
  return prisma.user.create({
    data: { username, passwordHash },
  })
}
