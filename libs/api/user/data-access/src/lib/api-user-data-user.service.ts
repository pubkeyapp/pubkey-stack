import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-stack/api-core-data-access'
import { UserFindManyUserInput } from './dto/user-find-many-user.input'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { UserPaging } from './entity/user.entity'
import { getUserWhereUserInput } from './helpers/get-user-where-user.input'

@Injectable()
export class ApiUserDataUserService {
  private readonly logger = new Logger(ApiUserDataUserService.name)
  constructor(private readonly core: ApiCoreService) {}

  async findManyUser(input: UserFindManyUserInput): Promise<UserPaging> {
    return this.core.data.user
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserWhereUserInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
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
