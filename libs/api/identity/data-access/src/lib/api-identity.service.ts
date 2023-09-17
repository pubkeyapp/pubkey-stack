import { Injectable } from '@nestjs/common'

import { ApiAdminIdentityService } from './api-admin-identity.service'
import { ApiUserIdentityService } from './api-user-identity.service'

@Injectable()
export class ApiIdentityService {
  constructor(readonly admin: ApiAdminIdentityService, readonly user: ApiUserIdentityService) {}
}
