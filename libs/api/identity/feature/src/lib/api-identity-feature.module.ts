import { Module } from '@nestjs/common'
import { ApiIdentityDataAccessModule } from '@pubkey-stack/api/identity/data-access'
import { ApiAdminIdentityResolver } from './api-admin-identity.resolver'
import { ApiIdentityResolver } from './api-identity.resolver'
import { ApiUserIdentityResolver } from './api-user-identity.resolver'

@Module({
  imports: [ApiIdentityDataAccessModule],
  providers: [ApiAdminIdentityResolver, ApiIdentityResolver, ApiUserIdentityResolver],
})
export class ApiIdentityFeatureModule {}
