import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class ApiCoreDataService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreDataService.name)

  constructor() {
    super()
  }

  async onModuleInit() {
    await this.$connect()
    this.logger.verbose(`Connected to database`)
  }
}
