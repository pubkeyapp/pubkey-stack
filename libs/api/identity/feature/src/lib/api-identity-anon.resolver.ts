import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BaseContext } from '@pubkey-stack/api-core-data-access'
import {
  ApiIdentityService,
  IdentityChallenge,
  RequestIdentityChallengeInput,
  VerifyIdentityChallengeInput,
} from '@pubkey-stack/api-identity-data-access'

@Resolver()
export class ApiIdentityAnonResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Query(() => IdentityChallenge, { nullable: true })
  anonRequestIdentityChallenge(@Context() ctx: BaseContext, @Args('input') input: RequestIdentityChallengeInput) {
    return this.service.anon.requestIdentityChallenge(ctx, input)
  }

  @Mutation(() => IdentityChallenge, { nullable: true })
  anonVerifyIdentityChallenge(@Context() ctx: BaseContext, @Args('input') input: VerifyIdentityChallengeInput) {
    return this.service.anon.verifyIdentityChallenge(ctx, input)
  }
}
