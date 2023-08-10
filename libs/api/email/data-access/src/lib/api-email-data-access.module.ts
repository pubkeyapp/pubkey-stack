import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-stack/api/core/data-access'
import { ApiEmailAdminService } from './api-email-admin.service'
import { ApiEmailService } from './api-email.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiEmailService, ApiEmailAdminService],
  exports: [ApiEmailService],
})
export class ApiEmailDataAccessModule {}
