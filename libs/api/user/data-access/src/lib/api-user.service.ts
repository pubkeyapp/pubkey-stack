import { Injectable } from '@nestjs/common'
import { ApiUserUserService } from './api-user-user.service'
import { ApiUserAdminService } from './api-user-admin.service'

@Injectable()
export class ApiUserService {
  constructor(readonly admin: ApiUserAdminService, readonly user: ApiUserUserService) {}
}
