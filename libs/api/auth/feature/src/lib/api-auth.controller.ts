import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import { ApiAuthDiscordGuard, ApiAuthService, AuthRequest } from '@pubkey-stack/api-auth-data-access'
import { Response } from 'express'

@Controller('auth')
export class ApiAuthController {
  constructor(private readonly service: ApiAuthService) {}

  @Get('discord')
  @UseGuards(ApiAuthDiscordGuard)
  discordAuthLogin() {
    // This method triggers the Discord OAuth2 flow
    return
  }

  @Get('discord/callback')
  @UseGuards(ApiAuthDiscordGuard)
  async discordAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    await this.service.setUserCookie({ req, res, user: req.user })
    res.redirect(this.service.core.config.webUrl + '/dashboard')
  }
}
