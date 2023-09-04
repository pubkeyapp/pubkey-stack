import { Prisma } from '@prisma/client'
import { AdminFindManyUserInput } from '../dto/admin-find-many-user.input'

export function parseAdminFindManyUserInput(input: AdminFindManyUserInput): {
  orderBy: Prisma.UserOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.UserWhereInput
} {
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

  return {
    where,
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { updatedAt: 'desc' },
  }
}
