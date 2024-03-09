import { Injectable, Logger } from '@nestjs/common'
import { User as PrismaUser } from '@prisma/client'
import { ApiCoreService, hashPassword, slugifyId } from '@pubkey-stack/api-core-data-access'
import { AdminCreateUserInput } from './dto/admin-create-user.input'
import { AdminFindManyUserInput } from './dto/admin-find-many-user.input'
import { AdminUpdateUserInput } from './dto/admin-update-user.input'
import { UserPaging } from './entity/user.entity'
import { getUserWhereAdminInput } from './helpers/get-user-where-admin.input'

@Injectable()
export class ApiUserDataAdminService {
  private readonly logger = new Logger(ApiUserDataAdminService.name)
  constructor(private readonly core: ApiCoreService) {}

  async createUser(input: AdminCreateUserInput): Promise<PrismaUser> {
    const username = slugifyId(input.username)
    if (!username.length) {
      throw new Error(`Username ${input.username} is not valid`)
    }
    const exists = await this.core.data.user.findUnique({
      where: { username: username },
    })
    if (exists) {
      throw new Error(`User ${username} already exists`)
    }
    return this.core.data.user.create({
      data: {
        username,
        password: input.password ? hashPassword(input.password) : undefined,
      },
    })
  }

  async deleteUser(userId: string): Promise<boolean> {
    const exists = await this.findOneUser(userId)
    if (!exists) {
      throw new Error(`User ${userId} not found`)
    }

    const deleted = await this.core.data.user.delete({ where: { id: userId } })

    return !!deleted
  }

  async findManyUser(input: AdminFindManyUserInput): Promise<UserPaging> {
    return this.core.data.user
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserWhereAdminInput(input),
        include: { identities: { orderBy: [{ provider: 'asc' }, { providerId: 'asc' }] } },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneUser(userId: string): Promise<PrismaUser> {
    const found = await this.core.data.user.findUnique({
      where: { id: userId },
    })
    if (!found) {
      throw new Error(`User ${userId} not found`)
    }
    return found
  }

  async updateUser(userId: string, input: AdminUpdateUserInput): Promise<PrismaUser> {
    const exists = await this.findOneUser(userId)

    if (!exists) {
      throw new Error(`User ${userId} not found`)
    }

    const newUsername = input.username ? slugifyId(input.username) : undefined
    if (newUsername && newUsername !== slugifyId(exists.username)) {
      const exists = await this.core.data.user.findUnique({
        where: { username: newUsername },
      })
      if (exists) {
        throw new Error(`User ${newUsername} already exists`)
      }
      this.logger.verbose(`Updating username ${userId} to ${newUsername}`)
    }
    return this.core.data.user.update({
      where: { id: userId },
      data: {
        ...input,
        username: newUsername,
      },
    })
  }
}
