import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-stack/api/core/data-access'
import { ApiUserAdminService } from './api-user-admin.service'
import { ApiUserUserService } from './api-user-user.service'
import { ApiUserService } from './api-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserService, ApiUserAdminService, ApiUserUserService],
  exports: [ApiUserService],
})
export class ApiUserDataAccessModule {}
