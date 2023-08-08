import { ApiCoreDataAccessModule } from '@pubkey-stack/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiUserAdminService } from './api-user-admin.service'
import { ApiUserUserService } from './api-user-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserAdminService, ApiUserUserService],
  exports: [ApiUserAdminService, ApiUserUserService],
})
export class ApiUserDataAccessModule {}
