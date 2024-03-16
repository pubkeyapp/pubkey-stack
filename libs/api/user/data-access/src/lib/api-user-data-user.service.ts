import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-stack/api-core-data-access'
import { UserUserFindManyInput } from './dto/user-user-find-many.input'
import { UserUserUpdateInput } from './dto/user-user-update.input'
import { UserPaging } from './entity/user.entity'
import { getUserWhereUserInput } from './helpers/get-user-where-user.input'

@Injectable()
export class ApiUserDataUserService {
  private readonly logger = new Logger(ApiUserDataUserService.name)
  constructor(private readonly core: ApiCoreService) {}

  async findManyUser(input: UserUserFindManyInput): Promise<UserPaging> {
    return this.core.data.user
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserWhereUserInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async updateUser(userId: string, input: UserUserUpdateInput) {
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
