import { Prisma } from '@prisma/client'
import { UserFindManyUserInput } from '../dto/user-find-many-user.input'

export interface UserFindManyUserParsedInput {
  orderBy: Prisma.UserOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.UserWhereInput
}

export function parseUserFindManyUserInput(input: UserFindManyUserInput): UserFindManyUserParsedInput {
  return {
    where: getWhereInput(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { updatedAt: 'desc' },
  }
}

function getWhereInput(input: UserFindManyUserInput): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { username: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
