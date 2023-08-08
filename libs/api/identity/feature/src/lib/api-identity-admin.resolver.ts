import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-stack/api/auth/data-access'
import {
  AdminCreateIdentityInput,
  AdminFindIdentitiesInput,
  ApiIdentityService,
  Identity,
} from '@pubkey-stack/api/identity/data-access'
import { User } from '@pubkey-stack/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiIdentityAdminResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Mutation(() => Identity, { nullable: true })
  adminCreateIdentity(@CtxUser() user: User, @Args('input') input: AdminCreateIdentityInput) {
    return this.service.admin.adminCreateIdentity(user.id, input)
  }
  @Mutation(() => Boolean, { nullable: true })
  adminDeleteIdentity(@CtxUser() user: User, @Args('identityId') identityId: string) {
    return this.service.admin.adminDeleteIdentity(user.id, identityId)
  }
  @Query(() => [Identity], { nullable: true })
  adminFindIdentities(@CtxUser() user: User, @Args('input') input: AdminFindIdentitiesInput) {
    return this.service.admin.adminFindIdentities(user.id, input)
  }
}
