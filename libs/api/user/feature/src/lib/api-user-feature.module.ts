import { ApiUserDataAccessModule } from '@pubkey-stack/api/user/data-access'
import { Module } from '@nestjs/common'
import { ApiUserAdminResolver } from './api-user-admin.resolver'
import { ApiUserFieldResolver } from './api-user-field.resolver'
import { ApiUserUserResolver } from './api-user-user.resolver'

@Module({
  imports: [ApiUserDataAccessModule],
  providers: [ApiUserFieldResolver, ApiUserAdminResolver, ApiUserUserResolver],
})
export class ApiUserFeatureModule {}
