import { Injectable } from '@nestjs/common'
import { ApiCoreConfigService } from './api-core-config.service'
import { ApiCorePrismaClient, prismaClient } from './api-core-prisma-client'

@Injectable()
export class ApiCoreService {
  readonly data: ApiCorePrismaClient = prismaClient
  constructor(readonly config: ApiCoreConfigService) {}

  uptime() {
    return process.uptime()
  }
}
