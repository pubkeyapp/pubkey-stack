import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CookieOptions } from 'express-serve-static-core'
import { ApiCoreConfig } from './config/configuration'
import { AppConfig } from './entity/app-config.entity'

@Injectable()
export class ApiCoreConfigService {
  private readonly logger = new Logger(ApiCoreConfigService.name)
  constructor(private readonly service: ConfigService<ApiCoreConfig>) {}

  get appConfig(): AppConfig {
    return {
      authDiscordEnabled: this.authDiscordEnabled,
      authPasswordEnabled: this.authPasswordEnabled,
      authRegisterEnabled: this.authRegisterEnabled,
    }
  }

  get authDiscordEnabled(): boolean {
    return this.service.get<boolean>('authDiscordEnabled') ?? false
  }

  get authPasswordEnabled(): boolean {
    return this.service.get<boolean>('authPasswordEnabled') ?? false
  }

  get authRegisterEnabled(): boolean {
    return this.service.get<boolean>('authRegisterEnabled') ?? false
  }

  get apiUrl(): string {
    return this.service.get<string>('apiUrl') as string
  }

  get cookieDomains(): string[] {
    return this.service.get<string[]>('cookieDomains') ?? []
  }

  get cookieName(): string {
    return this.service.get('cookieName') as string
  }

  cookieOptions(hostname: string): CookieOptions {
    const found = this.cookieDomains.find((domain) => hostname.endsWith(domain))
    if (!found) {
      this.logger.warn(
        `Not configured to set cookies for ${hostname}. cookieDomains: ${
          this.cookieDomains.length ? this.cookieDomains.join(', ') : 'not configured'
        }`,
      )
    }
    const isSecure = this.apiUrl.startsWith('https')
    return {
      httpOnly: true,
      secure: isSecure,
      domain: found || this.cookieDomains[0],
      sameSite: isSecure ? 'none' : 'strict',
    } as CookieOptions
  }
  get databaseProvision() {
    return this.service.get<boolean>('databaseProvision')
  }

  get databaseRandomData() {
    return this.service.get<boolean>('databaseRandomData')
  }

  get databaseReset() {
    return this.service.get<boolean>('databaseReset')
  }

  get discordAdminIds() {
    return this.service.get<string[]>('discordAdminIds')
  }

  get environment() {
    return this.service.get('environment')
  }

  get host() {
    return this.service.get<string>('host')
  }

  get port() {
    return this.service.get<number>('port')
  }

  get prefix() {
    return 'api'
  }
  get isDevelopment(): boolean {
    return this.environment === 'development'
  }

  get webUrl(): string {
    return this.service.get<string>('webUrl') as string
  }
}
