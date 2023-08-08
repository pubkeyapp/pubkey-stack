import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { IdentityProvider, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-stack/api/core/data-access'

import { Profile, Strategy } from 'passport-discord'
import { ApiAuthService, AuthRequest } from '../api-auth.service'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  private readonly provider = IdentityProvider.Discord
  constructor(private core: ApiCoreService, private service: ApiAuthService) {
    super({
      clientID: process.env['DISCORD_CLIENT_ID'],
      clientSecret: process.env['DISCORD_CLIENT_SECRET'],
      callbackURL: core.config.webUrl + '/api/auth/discord/callback',
      scope: ['guilds', 'email', 'identify'],
      passReqToCallback: true,
    })
  }

  async validate(req: AuthRequest, accessToken: string, refreshToken: string, profile: Profile) {
    if (req.user?.id) {
      throw new Error('User already logged in.')
    }

    const identityProfile = createDiscordProfile(profile)
    const found = await this.service.findUserByIdentity({
      provider: this.provider,
      providerId: profile.id,
    })

    if (found?.owner) {
      await this.core.data.identity.update({
        where: { id: found.id },
        data: { accessToken, refreshToken, verified: profile.verified, profile: identityProfile },
      })
      return found.owner
    }

    const identity: Prisma.IdentityCreateWithoutOwnerInput = {
      provider: this.provider,
      providerId: profile.id,
      accessToken,
      refreshToken,
      verified: profile.verified,
      profile: identityProfile,
    }
    return await this.service.createUserWithIdentity(identity)
  }
}

function createDiscordProfile(profile: Profile) {
  const avatarUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=512`
  const bannerUrl = `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.png?size=512`

  return {
    externalId: profile.id,
    email: profile.email,
    username: parseInt(profile.discriminator) > 0 ? `${profile.username}#${profile.discriminator}` : profile.username,
    avatarUrl,
    bannerUrl,
    verified: profile.verified,
  }
}
