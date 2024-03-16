import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-stack/api-auth-data-access'
import {
  IdentityAdminCreateInput,
  IdentityAdminFindManyInput,
  ApiIdentityService,
  Identity,
} from '@pubkey-stack/api-identity-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiIdentityAdminResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Mutation(() => Identity, { nullable: true })
  adminCreateIdentity(@Args('input') input: IdentityAdminCreateInput) {
    return this.service.admin.createIdentity(input)
  }
  @Mutation(() => Boolean, { nullable: true })
  adminDeleteIdentity(@Args('identityId') identityId: string) {
    return this.service.admin.deleteIdentity(identityId)
  }
  @Query(() => [Identity], { nullable: true })
  adminFindManyIdentity(@Args('input') input: IdentityAdminFindManyInput) {
    return this.service.admin.findManyIdentity(input)
  }
}
