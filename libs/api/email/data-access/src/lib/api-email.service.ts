import { Injectable } from '@nestjs/common'
import { ApiEmailAdminService } from './api-email-admin.service'

@Injectable()
export class ApiEmailService {
  constructor(readonly admin: ApiEmailAdminService) {}
}
