import {
  ApiAuthGraphqlGuard,
  ApiAuthService,
  CtxUser,
  LoginInput,
  RegisterInput,
} from '@pubkey-stack/api/auth/data-access'
import { AppContext } from '@pubkey-stack/api/core/data-access'
import { User } from '@pubkey-stack/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiAuthResolver {
  constructor(private readonly service: ApiAuthService) {}

  @Query(() => User, { nullable: true })
  @UseGuards(ApiAuthGraphqlGuard)
  async me(@CtxUser() user: User) {
    return user
  }

  @Mutation(() => User, { nullable: true })
  async login(@Context() context: AppContext, @Args('input') input: LoginInput) {
    return this.service.login(context, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  async logout(@Context() context: AppContext) {
    return this.service.logout(context)
  }

  @Mutation(() => User, { nullable: true })
  async register(@Context() context: AppContext, @Args('input') input: RegisterInput) {
    return this.service.register(context, input)
  }
}
