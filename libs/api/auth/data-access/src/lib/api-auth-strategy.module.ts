import { type DynamicModule, Logger, Module, type Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ApiCoreDataAccessModule } from '@pubkey-stack/api-core-data-access'
import { ApiAuthDataAccessModule } from './api-auth-data-access.module'
import { ApiAuthDiscordStrategy } from './strategies/api-auth-discord.strategy'
import { ApiAuthGithubStrategy } from './strategies/api-auth-github.strategy'

@Module({})
export class ApiAuthStrategyModule {
  static async registerAsync(): Promise<DynamicModule> {
    await ConfigModule.envVariablesLoaded

    const strategies = this.getStrategies()

    return {
      module: ApiAuthStrategyModule,
      imports: [ApiCoreDataAccessModule, ApiAuthDataAccessModule],
      providers: [...strategies],
      exports: [...strategies],
    }
  }

  static getStrategies(): Provider[] {
    const strategies: Provider[] = []

    if (this.discordEnabled()) {
      Logger.verbose('Discord auth ENABLED', 'ApiAuthStrategyModule')
      strategies.push(ApiAuthDiscordStrategy)
    }
    if (this.githubEnabled()) {
      Logger.verbose('Github auth ENABLED', 'ApiAuthStrategyModule')
      strategies.push(ApiAuthGithubStrategy)
    }
    return strategies
  }

  // TODO: These should be coming from the ApiCoreConfigService instead of process.env
  static discordEnabled(): boolean {
    return (
      // Discord auth needs to be enabled
      !!process.env['AUTH_DISCORD_ENABLED'] &&
      // And we need to have the client ID and secret set
      !!process.env['AUTH_DISCORD_CLIENT_ID'] &&
      !!process.env['AUTH_DISCORD_CLIENT_SECRET']
    )
  }

  // TODO: These should be coming from the ApiCoreConfigService instead of process.env
  static githubEnabled(): boolean {
    return (
      // GitHub auth needs to be enabled
      !!process.env['AUTH_GITHUB_ENABLED'] &&
      // And we need to have the client ID and secret set
      !!process.env['AUTH_GITHUB_CLIENT_ID'] &&
      !!process.env['AUTH_GITHUB_CLIENT_SECRET']
    )
  }
}
