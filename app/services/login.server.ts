import User from 'type/user'

export async function login(email: string, password: string): Promise<User> {
  return await {
    id: '1',
    username: 'name',
    passwordHash: 'test',
    uuid: 'aaaaaa',
    createdAt: 'date',
    updatedAt: 'date',
  }
}
