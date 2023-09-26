import { ApiAuthDataAccessModule } from '@pubkey-stack/api-auth-data-access'
import { Module } from '@nestjs/common'
import { ApiAuthController } from './api-auth.controller'
import { ApiAuthResolver } from './api-auth.resolver'

@Module({
  controllers: [ApiAuthController],
  imports: [ApiAuthDataAccessModule],
  providers: [ApiAuthResolver],
})
export class ApiAuthFeatureModule {}
