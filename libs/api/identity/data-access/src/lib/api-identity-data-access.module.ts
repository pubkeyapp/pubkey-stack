import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-stack/api/core/data-access'
import { ApiAdminIdentityService } from './api-admin-identity.service'
import { ApiUserIdentityService } from './api-user-identity.service'
import { ApiIdentityService } from './api-identity.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAdminIdentityService, ApiIdentityService, ApiUserIdentityService],
  exports: [ApiIdentityService],
})
export class ApiIdentityDataAccessModule {}
