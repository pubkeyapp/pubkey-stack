import { Prisma } from '@prisma/client'
import { AdminFindManyUserInput } from '../dto/admin-find-many-user.input'

export function parseAdminFindManyUserInput(input: AdminFindManyUserInput): {
  limit: number
  orderBy: Prisma.UserOrderByWithRelationInput
  page: number
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
    limit: input.limit ?? 10,
    orderBy: { updatedAt: 'desc' },
    page: input.page ?? 1,
    where,
  }
}
