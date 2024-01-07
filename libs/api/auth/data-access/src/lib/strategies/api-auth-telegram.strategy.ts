import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-stack/api-core-data-access'
import { TelegramStrategy as Strategy } from 'passport-telegram-official'
import { ApiAuthService, AuthRequest } from '../api-auth.service'

interface Profile {
  id: string
  username: string
  displayName: string
  photos: { value: string }[]
}

@Injectable()
export class ApiAuthTelegramStrategy extends PassportStrategy(Strategy, 'telegram') {
  constructor(private core: ApiCoreService, private service: ApiAuthService) {
    super({
      botToken: core.config.authTelegramBotToken,
      callbackURL: core.config.webUrl + '/api/auth/telegram/callback',
      passReqToCallback: true,
      queryExpiration: 86400,
    })
  }

  async validate(req: AuthRequest, accessToken: string, refreshToken: string, profile: Profile) {
    return this.service.validateRequest({
      req,
      providerId: profile.id,
      provider: IdentityProvider.Telegram,
      accessToken,
      refreshToken,
      profile: createTelegramProfile(profile),
    })
  }
}

function createTelegramProfile(profile: Profile) {
  return {
    externalId: profile.id,
    username: profile.username,
    name: profile.displayName,
    avatarUrl: profile.photos?.[0]?.value,
  }
}
