import { Prisma } from '@prisma/client'
import { UserFindManyUserInput } from '../dto/user-find-many-user.input'

export function parseUserFindManyUserInput(input: UserFindManyUserInput): {
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
    ]
  }

  return {
    where,
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { updatedAt: 'desc' },
  }
}
