import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-stack/api-core-data-access'
import { ApiUserDataAdminService } from './api-user-data-admin.service'
import { ApiUserDataUserService } from './api-user-data-user.service'
import { ApiUserProvisionService } from './api-user-provision.service'
import { ApiUserService } from './api-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserService, ApiUserDataAdminService, ApiUserDataUserService, ApiUserProvisionService],
  exports: [ApiUserService],
})
export class ApiUserDataAccessModule {}
