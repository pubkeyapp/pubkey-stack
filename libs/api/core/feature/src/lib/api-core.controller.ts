import { Controller, Get, Res } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-stack/api-core-data-access'
import { Response } from 'express-serve-static-core'

@Controller()
export class ApiCoreController {
  constructor(private readonly service: ApiCoreService) {}

  @Get('__/env.js')
  envJs(@Res() res: Response) {
    const js = this.service.envJs()
    res.setHeader('Content-Type', 'application/javascript')
    res.send(js)
  }

  @Get('__/env.json')
  envJson() {
    return this.service.envJson()
  }

  @Get('uptime')
  uptime() {
    return this.service.uptime()
  }
}
