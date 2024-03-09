import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ApiCoreService } from './api-core.service'
import { ApiCoreConfigModule } from './config/api-core-config.module'
import { ApiCoreGraphQLModule } from './graphql/api-core-graphql.module'
import { serveStaticFactory } from './helpers/serve-static-factory'

@Module({
  imports: [
    ApiCoreConfigModule,
    ApiCoreGraphQLModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRootAsync({ useFactory: serveStaticFactory() }),
  ],
  providers: [ApiCoreService],
  exports: [ApiCoreService],
})
export class ApiCoreDataAccessModule {}
