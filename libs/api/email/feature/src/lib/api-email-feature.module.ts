import { ApiEmailDataAccessModule } from '@pubkey-stack/api-email-data-access'
import { Module } from '@nestjs/common'
import { ApiAdminEmailResolver } from './api-admin-email.resolver'

@Module({
  imports: [ApiEmailDataAccessModule],
  providers: [ApiAdminEmailResolver],
})
export class ApiEmailFeatureModule {}
