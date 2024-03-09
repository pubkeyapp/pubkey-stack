import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ApiCoreProvisionService } from './api-core-provision.service'
import { ApiCoreService } from './api-core.service'
import { ApiCoreConfigModule } from './config/api-core-config.module'
import { ApiCoreGraphQLModule } from './graphql/api-core-graphql.module'
import { serveStaticFactory } from './helpers/serve-static-factory'

@Module({
  imports: [
    ApiCoreConfigModule,
    ApiCoreGraphQLModule,
    ScheduleModule.forRoot(),
    ServeStaticModule.forRootAsync({ useFactory: serveStaticFactory() }),
  ],
  providers: [ApiCoreService, ApiCoreProvisionService],
  exports: [ApiCoreService],
})
export class ApiCoreDataAccessModule {}
