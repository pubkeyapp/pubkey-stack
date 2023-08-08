import { Module } from '@nestjs/common'
import { ApiIdentityDataAccessModule } from '@pubkey-stack/api/identity/data-access'
import { ApiIdentityAdminResolver } from './api-identity-admin.resolver'
import { ApiIdentityFieldResolver } from './api-identity-field.resolver'
import { ApiIdentityUserResolver } from './api-identity-user.resolver'

@Module({
  imports: [ApiIdentityDataAccessModule],
  providers: [ApiIdentityAdminResolver, ApiIdentityFieldResolver, ApiIdentityUserResolver],
})
export class ApiIdentityFeatureModule {}
