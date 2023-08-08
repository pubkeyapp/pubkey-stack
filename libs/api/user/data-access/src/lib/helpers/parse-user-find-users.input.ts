import { Prisma } from '@prisma/client'
import { UserFindUsersInput } from '../dto/user-find-users.input'

export interface UserFindUsersParsedInput {
  orderBy: Prisma.UserOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.UserWhereInput
}

export function parseUserFindUsersInput(input: UserFindUsersInput): UserFindUsersParsedInput {
  return {
    where: getUserFindUsersWhere(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { updatedAt: 'desc' },
  }
}

function getUserFindUsersWhere(input: UserFindUsersInput): Prisma.UserWhereInput {
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
