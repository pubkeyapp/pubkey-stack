import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import {
  ApiAnonJwtGuard,
  ApiAuthDiscordGuard,
  ApiAuthGithubGuard,
  ApiAuthService,
  AuthRequest,
} from '@pubkey-stack/api-auth-data-access'
import { Response } from 'express-serve-static-core'

@Controller('auth')
export class ApiAuthController {
  constructor(private readonly service: ApiAuthService) {}

  @Get('discord')
  @UseGuards(ApiAuthDiscordGuard)
  discordAuthLogin() {
    // This method triggers the Discord OAuth2 flow
  }

  @Get('discord/callback')
  @UseGuards(ApiAnonJwtGuard, ApiAuthDiscordGuard)
  async discordAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    await this.service.setUserCookie({ req, res, user: req.user })
    res.redirect(this.service.core.config.webUrl + '/dashboard')
  }

  @Get('github')
  @UseGuards(ApiAuthGithubGuard)
  githubAuthLogin() {
    // This method triggers the GitHub OAuth2 flow
  }

  @Get('github/callback')
  @UseGuards(ApiAnonJwtGuard, ApiAuthGithubGuard)
  async githubAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    await this.service.setUserCookie({ req, res, user: req.user })
    res.redirect(this.service.core.config.webUrl + '/dashboard')
  }

  @Get('me')
  @UseGuards(ApiAnonJwtGuard)
  async getMe(@Req() req: AuthRequest) {
    return req.user ?? 'anon'
  }
}
