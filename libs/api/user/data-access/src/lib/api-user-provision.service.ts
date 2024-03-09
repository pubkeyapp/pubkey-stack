import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Prisma, UserStatus } from '@prisma/client'
import { ApiCoreService, CORE_APP_STARTED, hashPassword, slugifyId } from '@pubkey-stack/api-core-data-access'
import { provisionUsers } from './api-user-provision-data'

@Injectable()
export class ApiUserProvisionService {
  private readonly logger = new Logger(ApiUserProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  @OnEvent(CORE_APP_STARTED)
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await this.provisionUsers()
      this.logger.verbose(`Provisioned database`)
    }
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
}
