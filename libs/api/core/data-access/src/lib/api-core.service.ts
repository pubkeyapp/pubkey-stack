import { Injectable } from '@nestjs/common'
import { UserRole, UserStatus } from '@prisma/client'
import { hasher } from 'node-object-hash'
import { ApiCoreConfigService } from './api-core-config.service'
import { ApiCoreDataService } from './api-core-data.service'

@Injectable()
export class ApiCoreService {
  readonly hasher = hasher({ sort: true, coerce: false })
  constructor(readonly config: ApiCoreConfigService, readonly data: ApiCoreDataService) {}

  async ensureUser(userId: string) {
    const item = await this.getUserById(userId)

    if (!item) {
      throw new Error('Unauthorized: No such user')
    }
    return item
  }

  async ensureUserActive(userId: string) {
    const item = await this.ensureUser(userId)

    if (item.status !== UserStatus.Active) {
      throw new Error('Unauthorized: Not an active user')
    }
    return item
  }

  async ensureUserAdmin(userId: string) {
    const user = await this.ensureUserActive(userId)

    if (user.role !== UserRole.Admin) {
      throw new Error('Unauthorized: Not an admin')
    }
    return user
  }

  private getUserById(userId: string) {
    return this.data.user.findUnique({ where: { id: userId }, include: { emails: true, identities: true } })
  }

  uptime() {
    return process.uptime()
  }
}
