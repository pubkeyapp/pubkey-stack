import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-stack/api-core-data-access'
import { ApiAdminEmailService } from './api-admin-email.service'
import { ApiEmailService } from './api-email.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiEmailService, ApiAdminEmailService],
  exports: [ApiEmailService],
})
export class ApiEmailDataAccessModule {}
