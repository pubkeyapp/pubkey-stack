import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Prisma, UserStatus } from '@prisma/client'
import { fakeUsers, provisionUsers } from './api-core-provision-data'
import { CORE_APP_STARTED } from './api-core.events'
import { ApiCoreService } from './api-core.service'
import { hashPassword } from './helpers/hash-validate-password'
import { slugifyId } from './helpers/slugify-id'

@Injectable()
export class ApiCoreProvisionService {
  private readonly logger = new Logger(ApiCoreProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  @OnEvent(CORE_APP_STARTED)
  async onApplicationStarted() {
    if (this.core.config.databaseReset) {
      await this.resetDatabase()
      this.logger.verbose(`Reset database`)
    }
    if (this.core.config.databaseProvision) {
      await this.provisionDatabase()
      this.logger.verbose(`Provisioned database`)
    }
    if (this.core.config.databaseReset && this.core.config.databaseRandomData) {
      await this.generateRandomData()
      this.logger.verbose(`Generated random data`)
    }
  }

  private async generateRandomData() {
    await Promise.all(fakeUsers(42).map((user) => this.provisionUser(user)))
  }

  private async provisionDatabase() {
    await this.provisionUsers()
  }

  private async provisionUsers() {
    await Promise.all(provisionUsers.map((user) => this.provisionUser(user)))
  }

  private async provisionUser(input: Prisma.UserCreateInput) {
    const username = slugifyId(input.username)
    const existing = await this.core.data.user.count({ where: { username } })
    if (existing < 1) {
      await this.core.data.user.create({
        data: {
          ...input,
          id: username,
          password: input.password ? hashPassword(input.password) : undefined,
          status: input.status ?? UserStatus.Active,
        },
      })
      this.logger.verbose(
        `Provisioned ${input.role} ${input.username} ${input.password ? 'and password' : 'and external provider'}`,
      )
      return
    }
    this.logger.verbose(
      `Log in with ${input.role} ${input.username} ${input.password ? 'and password' : 'an external provider'}`,
    )
  }

  private async resetDatabase() {
    await this.core.data.identityChallenge.deleteMany()
    await this.core.data.identity.deleteMany()
    await this.core.data.user.deleteMany()
  }
}
