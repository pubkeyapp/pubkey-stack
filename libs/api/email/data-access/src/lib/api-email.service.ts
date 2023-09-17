import { Injectable } from '@nestjs/common'
import { ApiAdminEmailService } from './api-admin-email.service'

@Injectable()
export class ApiEmailService {
  constructor(readonly admin: ApiAdminEmailService) {}
}
