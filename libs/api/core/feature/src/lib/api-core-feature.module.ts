import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@pubkey-stack/api-auth-feature'
import { ApiCoreDataAccessModule } from '@pubkey-stack/api-core-data-access'
import { ApiEmailFeatureModule } from '@pubkey-stack/api-email-feature'
import { ApiIdentityFeatureModule } from '@pubkey-stack/api-identity-feature'
import { ApiUserFeatureModule } from '@pubkey-stack/api-user-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'

const imports = [
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiEmailFeatureModule,
  ApiIdentityFeatureModule,
  ApiUserFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
