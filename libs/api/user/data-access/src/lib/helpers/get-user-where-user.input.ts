import { Prisma, UserStatus } from '@prisma/client'
import { UserUserFindManyInput } from '../dto/user-user-find-many.input'

export function getUserWhereUserInput(input: UserUserFindManyInput): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = {
    status: {
      in: [UserStatus.Active],
    },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { username: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
