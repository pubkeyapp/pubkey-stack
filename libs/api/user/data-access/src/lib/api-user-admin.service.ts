import { Injectable, Logger } from '@nestjs/common'
import { User as PrismaUser } from '@prisma/client'
import { ApiCoreService, hashPassword, Paging, slugifyId } from '@pubkey-stack/api/core/data-access'
import { AdminCreateUserInput } from './dto/admin-create-user.input'
import { AdminFindManyUserInput } from './dto/admin-find-many-user.input'
import { AdminUpdateUserInput } from './dto/admin-update-user.input'
import { parseAdminFindManyUserInput } from './helpers/parse-admin-find-many-user.input'

@Injectable()
export class ApiUserAdminService {
  private readonly logger = new Logger(ApiUserAdminService.name)
  constructor(private readonly core: ApiCoreService) {}

  async createUser(input: AdminCreateUserInput): Promise<PrismaUser> {
    const exists = await this.core.data.user.findUnique({
      where: { username: input.username },
    })
    if (exists) {
      throw new Error(`User ${input.username} already exists`)
    }
    return this.core.data.user.create({
      data: {
        username: input.username,
        password: input.password ? hashPassword(input.username) : undefined,
      },
    })
  }

  async deleteUser(userId: string): Promise<boolean> {
    const exists = await this.findOneUser(userId)
    if (!exists) {
      throw new Error(`User ${userId} not found`)
    }

    await this.core.data.identity.deleteMany({ where: { ownerId: userId } })
    await this.core.data.email.deleteMany({ where: { ownerId: userId } })
    const deleted = await this.core.data.user.delete({
      where: { id: userId },
    })

    return !!deleted
  }

  async findManyUser(input: AdminFindManyUserInput): Promise<PrismaUser[]> {
    const { where, orderBy, take, skip } = parseAdminFindManyUserInput(input)
    const items = await this.core.data.user.findMany({ where, orderBy, take, skip })

    return items ?? []
  }

  async findManyUserCount(input: AdminFindManyUserInput): Promise<Paging> {
    const { where, orderBy, take, skip } = parseAdminFindManyUserInput(input)
    const [count, total] = await Promise.all([
      this.core.data.user.count({ where, orderBy, take, skip }),
      this.core.data.user.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
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
