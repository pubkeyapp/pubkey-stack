import { Prisma } from '@prisma/client'
import { AdminFindUsersInput } from '../dto/admin-find-users.input'

export interface AdminFindUsersParsedInput {
  orderBy: Prisma.UserOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.UserWhereInput
}

export function parseAdminFindUsersInput(input: AdminFindUsersInput): AdminFindUsersParsedInput {
  return {
    where: getAdminFindUsersWhere(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { updatedAt: 'desc' },
  }
}

function getAdminFindUsersWhere(input: AdminFindUsersInput): Prisma.UserWhereInput {
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
