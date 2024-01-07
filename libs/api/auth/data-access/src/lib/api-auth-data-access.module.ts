import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ApiCoreDataAccessModule } from '@pubkey-stack/api-core-data-access'
import { ApiAuthStrategyModule } from './api-auth-strategy.module'
import { ApiAuthService } from './api-auth.service'
import { ApiAuthGraphQLUserGuard } from './guards/api-auth-graphql-user-guard.service'
import { ApiAuthJwtStrategy } from './strategies/api-auth-jwt.strategy'

@Module({
  imports: [
    ApiCoreDataAccessModule,
    JwtModule.register({
      global: true,
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
    ApiAuthStrategyModule.registerAsync(),
  ],
  providers: [ApiAuthGraphQLUserGuard, ApiAuthJwtStrategy, ApiAuthService],
  exports: [ApiAuthService],
})
export class ApiAuthDataAccessModule {}
