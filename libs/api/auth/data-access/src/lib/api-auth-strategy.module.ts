import { type DynamicModule, Logger, Module, type Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ApiCoreDataAccessModule } from '@pubkey-stack/api-core-data-access'
import { ApiAuthDataAccessModule } from './api-auth-data-access.module'
import { ApiAuthTelegramGuard } from './guards/api-auth-telegram.guard'
import { ApiAuthDiscordStrategy } from './strategies/api-auth-discord.strategy'
import { ApiAuthGithubStrategy } from './strategies/api-auth-github.strategy'
import { ApiAuthTelegramStrategy } from './strategies/api-auth-telegram.strategy'
import { ApiAuthTwitterStrategy } from './strategies/api-auth-twitter.strategy'

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
    if (this.telegramEnabled()) {
      Logger.verbose('Telegram auth ENABLED', 'ApiAuthStrategyModule')
      strategies.push(...[ApiAuthTelegramStrategy, ApiAuthTelegramGuard])
    }
    if (this.twitterEnabled()) {
      Logger.verbose('Twitter auth ENABLED', 'ApiAuthStrategyModule')
      strategies.push(ApiAuthTwitterStrategy)
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

  // TODO: These should be coming from the ApiCoreConfigService instead of process.env
  static telegramEnabled(): boolean {
    return (
      // Telegram auth needs to be enabled
      !!process.env['AUTH_TELEGRAM_ENABLED'] &&
      // And we need to have the bot token set
      !!process.env['AUTH_TELEGRAM_BOT_TOKEN']
    )
  }

  // TODO: These should be coming from the ApiCoreConfigService instead of process.env
  static twitterEnabled(): boolean {
    return (
      // Twitter auth needs to be enabled
      !!process.env['AUTH_TWITTER_ENABLED'] &&
      // And we need to have the client ID and secret set
      !!process.env['AUTH_TWITTER_CONSUMER_KEY'] &&
      !!process.env['AUTH_TWITTER_CONSUMER_SECRET']
    )
  }
}
