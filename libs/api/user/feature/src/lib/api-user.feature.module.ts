import { Module } from '@nestjs/common'
import { ApiUserDataAccessModule } from '@pubkey-stack/api-user-data-access'
import { ApiUserAdminResolver } from './api-user-admin.resolver'
import { ApiUserUserResolver } from './api-user-user.resolver'
import { ApiUserResolver } from './api-user.resolver'

@Module({
  imports: [ApiUserDataAccessModule],
  providers: [ApiUserResolver, ApiUserAdminResolver, ApiUserUserResolver],
})
export class ApiUserFeatureModule {}
