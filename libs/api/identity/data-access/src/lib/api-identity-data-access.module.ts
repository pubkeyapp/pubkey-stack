import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-stack/api/core/data-access'
import { ApiIdentityAdminService } from './api-identity-admin.service'
import { ApiIdentityUserService } from './api-identity-user.service'
import { ApiIdentityService } from './api-identity.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiIdentityAdminService, ApiIdentityService, ApiIdentityUserService],
  exports: [ApiIdentityService],
})
export class ApiIdentityDataAccessModule {}
