import { Injectable, Logger } from '@nestjs/common'
import { User as PrismaUser } from '@prisma/client'
import { ApiCoreService, Paging } from '@pubkey-stack/api/core/data-access'

import { UserFindManyUserInput } from './dto/user-find-many-user.input'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { parseUserFindManyUserInput } from './helpers/parse-user-find-many-user.input'

@Injectable()
export class ApiUserUserService {
  private readonly logger = new Logger(ApiUserUserService.name)
  constructor(private readonly core: ApiCoreService) {}

  async findManyUser(input: UserFindManyUserInput): Promise<PrismaUser[]> {
    const { where, orderBy, take, skip } = parseUserFindManyUserInput(input)
    const items = await this.core.data.user.findMany({ where, orderBy, take, skip })

    return items ?? []
  }

  async findManyUserCount(input: UserFindManyUserInput): Promise<Paging> {
    const { where, orderBy, take, skip } = parseUserFindManyUserInput(input)
    const [count, total] = await Promise.all([
      this.core.data.user.count({ where, orderBy, take, skip }),
      this.core.data.user.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

  async updateUser(userId: string, input: UserUpdateUserInput) {
    return this.core.data.user.update({ where: { id: userId }, data: input })
  }

  async findOneUser(username: string) {
    const found = await this.core.data.user.findUnique({ where: { username } })

    if (!found) {
      throw new Error(`User ${username} not found`)
    }
    return found
  }
}
