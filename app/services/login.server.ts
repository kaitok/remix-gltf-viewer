import User from 'type/user'
import { prisma } from '~/db.server'
import bcrypt from 'bcrypt'

export async function login(username: string, password: string): Promise<User> {
  const user: any = await prisma.user.findUnique({
    where: { username },
  })
  if (!user) {
    throw new Error('User not found')
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    String(user.passwordHash)
  )
  if (!isCorrectPassword) {
    throw new Error('Incorrect password')
  }

  return user
}
