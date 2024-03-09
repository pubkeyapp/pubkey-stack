import { Module } from '@nestjs/common'
import { ApiIdentityDataAccessModule } from '@pubkey-stack/api-identity-data-access'
import { ApiIdentityAdminResolver } from './api-identity-admin.resolver'
import { ApiIdentityAnonResolver } from './api-identity-anon.resolver'
import { ApiIdentityUserResolver } from './api-identity-user.resolver'
import { ApiIdentityResolver } from './api-identity.resolver'

@Module({
  imports: [ApiIdentityDataAccessModule],
  providers: [ApiIdentityAdminResolver, ApiIdentityAnonResolver, ApiIdentityResolver, ApiIdentityUserResolver],
})
export class ApiIdentityFeatureModule {}
