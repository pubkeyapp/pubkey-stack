import { Injectable } from '@nestjs/common'

import { ApiIdentityAdminService } from './api-identity-admin.service'
import { ApiIdentityUserService } from './api-identity-user.service'

@Injectable()
export class ApiIdentityService {
  constructor(readonly admin: ApiIdentityAdminService, readonly user: ApiIdentityUserService) {}
}
