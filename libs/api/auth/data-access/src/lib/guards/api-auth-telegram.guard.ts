import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class ApiAuthTelegramGuard extends AuthGuard('telegram') {}
