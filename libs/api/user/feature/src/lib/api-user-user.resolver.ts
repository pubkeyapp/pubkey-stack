import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-stack/api/auth/data-access'
import { Paging } from '@pubkey-stack/api/core/data-access'
import { ApiUserUserService, User, UserFindUsersInput, UserUpdateUserInput } from '@pubkey-stack/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserUserResolver {
  constructor(private readonly service: ApiUserUserService) {}

  @Query(() => [User], { nullable: true })
  userFindUsers(@CtxUser() user: User, @Args('input') input: UserFindUsersInput) {
    return this.service.userFindUsers(user.id as string, input)
  }

  @Query(() => User, { nullable: true })
  userGetUserByUsername(@CtxUser() user: User, @Args('username') username: string) {
    return this.service.userGetUserByUsername(user.id as string, username)
  }

  @Query(() => Paging, { nullable: true })
  userFindUsersCount(@CtxUser() user: User, @Args('input') input: UserFindUsersInput) {
    return this.service.userFindUsersCount(user.id as string, input)
  }

  @Mutation(() => User, { nullable: true })
  userUpdateUser(@CtxUser() user: User, @Args('input') input: UserUpdateUserInput) {
    return this.service.userUpdateUser(user.id as string, input)
  }
}
