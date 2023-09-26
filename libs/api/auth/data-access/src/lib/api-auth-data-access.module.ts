import { ApiCoreDataAccessModule } from '@pubkey-stack/api-core-data-access'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ApiAuthService } from './api-auth.service'
import { ApiAuthDiscordGuard } from './guards/api-auth-discord.guard'
import { ApiAuthGraphQLUserGuard } from './guards/api-auth-graphql-user-guard.service'
import { ApiAuthJwtStrategy } from './strategies/api-auth-jwt.strategy'
import { DiscordStrategy } from './strategies/discord.strategy'

@Module({
  imports: [
    ApiCoreDataAccessModule,
    JwtModule.register({
      global: true,
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  providers: [ApiAuthDiscordGuard, ApiAuthGraphQLUserGuard, ApiAuthJwtStrategy, ApiAuthService, DiscordStrategy],
  exports: [ApiAuthService],
})
export class ApiAuthDataAccessModule {}
