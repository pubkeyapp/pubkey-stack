import { ApiCoreService, hashPassword, Paging, slugifyId } from '@pubkey-stack/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { User as PrismaUser } from '@prisma/client'
import { AdminCreateUserInput } from './dto/admin-create-user.input'
import { AdminFindUsersInput } from './dto/admin-find-users.input'
import { AdminUpdateUserInput } from './dto/admin-update-user.input'
import { parseAdminFindUsersInput } from './helpers/parse-admin-find-users.input'

@Injectable()
export class ApiUserAdminService {
  private readonly logger = new Logger(ApiUserAdminService.name)
  constructor(private readonly core: ApiCoreService) {}

  async adminCreateUser(adminId: string, input: AdminCreateUserInput): Promise<PrismaUser> {
    await this.core.ensureUserAdmin(adminId)
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

  async adminDeleteUser(adminId: string, userId: string): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    const exists = await this.adminGetUser(adminId, userId)
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

  async adminFindUsers(adminId: string, input: AdminFindUsersInput): Promise<PrismaUser[]> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindUsersInput(input)
    const items = await this.core.data.user.findMany({ where, orderBy, take, skip })

    return items ?? []
  }

  async adminFindUsersCount(adminId: string, input: AdminFindUsersInput): Promise<Paging> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindUsersInput(input)
    const [count, total] = await Promise.all([
      this.core.data.user.count({ where, orderBy, take, skip }),
      this.core.data.user.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

  async adminGetUser(adminId: string, userId: string): Promise<PrismaUser> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.user.findUnique({
      where: { id: userId },
    })
    if (!found) {
      throw new Error(`User ${userId} not found`)
    }
    return found
  }

  async adminUpdateUser(adminId: string, userId: string, input: AdminUpdateUserInput): Promise<PrismaUser> {
    await this.core.ensureUserAdmin(adminId)
    const exists = await this.adminGetUser(adminId, userId)

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
