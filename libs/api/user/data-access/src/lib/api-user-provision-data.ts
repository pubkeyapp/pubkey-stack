import { IdentityProvider, Prisma, UserRole, UserStatus } from '@prisma/client'

export const provisionUsers: Prisma.UserCreateInput[] = [
  {
    username: 'alice',
    password: 'password',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [{ provider: IdentityProvider.Solana, providerId: 'ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG' }],
    },
  },
  {
    username: 'bob',
    password: 'password',
    role: UserRole.User,
  },
  // Charlie is a user with no password, so they can only log in with an external provider
  {
    username: 'charlie',
    role: UserRole.User,
  },
  // Dave is set to inactive, so they can't log in
  {
    username: 'dave',
    password: 'password',
    role: UserRole.User,
    status: UserStatus.Inactive,
  },
]
