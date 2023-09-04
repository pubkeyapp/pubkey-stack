import { Prisma } from '@prisma/client'
import { UserFindManyUserInput } from '../dto/user-find-many-user.input'

export function parseUserFindManyUserInput(input: UserFindManyUserInput): {
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
    ]
  }

  return {
    limit: input.limit ?? 10,
    orderBy: { updatedAt: 'desc' },
    page: input.page ?? 1,
    where,
  }
}
