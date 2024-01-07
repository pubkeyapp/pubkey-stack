import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import {
  ApiAnonJwtGuard,
  ApiAuthDiscordGuard,
  ApiAuthGithubGuard,
  ApiAuthService,
  ApiAuthTelegramGuard,
  ApiAuthTwitterGuard,
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

  @Get('telegram')
  @UseGuards(ApiAuthTelegramGuard)
  telegramAuthLogin() {
    // This method triggers the Telegram OAuth2 flow
  }

  @Get('telegram/callback')
  @UseGuards(ApiAnonJwtGuard, ApiAuthTelegramGuard)
  async telegramAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    await this.service.setUserCookie({ req, res, user: req.user })
    res.redirect(this.service.core.config.webUrl + '/dashboard')
  }

  @Get('twitter')
  @UseGuards(ApiAuthTwitterGuard)
  twitterAuthLogin() {
    // This method triggers the Twitter OAuth2 flow
  }

  @Get('twitter/callback')
  @UseGuards(ApiAnonJwtGuard, ApiAuthTwitterGuard)
  async twitterAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    await this.service.setUserCookie({ req, res, user: req.user })
    res.redirect(this.service.core.config.webUrl + '/dashboard')
  }

  @Get('me')
  @UseGuards(ApiAnonJwtGuard)
  async getMe(@Req() req: AuthRequest) {
    return req.user ?? 'anon'
  }
}
