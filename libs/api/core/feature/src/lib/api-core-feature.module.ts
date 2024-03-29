import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@pubkey-stack/api-auth-feature'
import { ApiCoreDataAccessModule } from '@pubkey-stack/api-core-data-access'
import { ApiIdentityFeatureModule } from '@pubkey-stack/api-identity-feature'
import { ApiUserFeatureModule } from '@pubkey-stack/api-user-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiIdentityFeatureModule,
  ApiUserFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
