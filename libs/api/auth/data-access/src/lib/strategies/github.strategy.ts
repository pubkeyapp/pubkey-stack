import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-stack/api-core-data-access'

import { Profile, Strategy } from 'passport-github'
import { ApiAuthService, AuthRequest } from '../api-auth.service'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  private readonly provider = IdentityProvider.GitHub
  constructor(private core: ApiCoreService, private service: ApiAuthService) {
    super({
      clientID: process.env['GITHUB_CLIENT_ID'],
      clientSecret: process.env['GITHUB_CLIENT_SECRET'],
      callbackURL: core.config.webUrl + '/api/auth/github/callback',
      scope: ['public_profile'],
      passReqToCallback: true,
    })
  }

  async validate(req: AuthRequest, accessToken: string, refreshToken: string, profile: Profile) {
    return this.service.validateRequest({
      req,
      providerId: profile.id,
      provider: this.provider,
      accessToken,
      refreshToken,
      profile: createGithubProfile(profile),
    })
  }
}

function createGithubProfile(profile: Profile) {
  return {
    externalId: profile.id,
    username: profile.username,
    avatarUrl: profile.photos?.[0].value,
    name: profile.displayName,
  }
}
