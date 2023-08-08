import { ApiCoreService, Paging } from '@pubkey-stack/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { User as PrismaUser } from '@prisma/client'

import { UserFindUsersInput } from './dto/user-find-users.input'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { parseUserFindUsersInput } from './helpers/parse-user-find-users.input'

@Injectable()
export class ApiUserUserService {
  private readonly logger = new Logger(ApiUserUserService.name)
  constructor(private readonly core: ApiCoreService) {}

  async userFindUsers(userId: string, input: UserFindUsersInput): Promise<PrismaUser[]> {
    await this.core.ensureUserActive(userId)

    const { where, orderBy, take, skip } = parseUserFindUsersInput(input)
    const items = await this.core.data.user.findMany({ where, orderBy, take, skip })

    return items ?? []
  }

  async userFindUsersCount(userId: string, input: UserFindUsersInput): Promise<Paging> {
    await this.core.ensureUserActive(userId)

    const { where, orderBy, take, skip } = parseUserFindUsersInput(input)
    const [count, total] = await Promise.all([
      this.core.data.user.count({ where, orderBy, take, skip }),
      this.core.data.user.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

  async userUpdateUser(userId: string, input: UserUpdateUserInput) {
    await this.core.ensureUserActive(userId)
    return this.core.data.user.update({
      where: { id: userId },
      data: input,
    })
  }

  async userGetUserByUsername(userId: string, username: string) {
    await this.core.ensureUserActive(userId)
    const found = await this.core.data.user.findUnique({
      where: { username },
    })

    return {
      ...found,
    }
  }
}
