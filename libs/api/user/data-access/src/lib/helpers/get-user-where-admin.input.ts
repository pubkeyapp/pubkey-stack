import { Prisma } from '@prisma/client'
import { UserAdminFindManyInput } from '../dto/user-admin-find-many.input'

export function getUserWhereAdminInput(input: UserAdminFindManyInput): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { username: { contains: input.search, mode: 'insensitive' } },
      { identities: { some: { providerId: { contains: input.search, mode: 'insensitive' } } } },
    ]
  }

  if (input.role) {
    where.role = input.role
  }
  if (input.status) {
    where.status = input.status
  }

  return where
}
