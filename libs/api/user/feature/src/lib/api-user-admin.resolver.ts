import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-stack/api/auth/data-access'
import { Paging } from '@pubkey-stack/api/core/data-access'
import {
  AdminCreateUserInput,
  AdminFindUsersInput,
  AdminUpdateUserInput,
  ApiUserAdminService,
  User,
} from '@pubkey-stack/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserAdminResolver {
  constructor(private readonly service: ApiUserAdminService) {}

  @Mutation(() => User, { nullable: true })
  adminCreateUser(@CtxUser() user: User, @Args('input') input: AdminCreateUserInput) {
    return this.service.adminCreateUser(user.id!, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.adminDeleteUser(user.id!, userId)
  }

  @Query(() => [User], { nullable: true })
  adminFindUsers(@CtxUser() user: User, @Args('input') input: AdminFindUsersInput) {
    return this.service.adminFindUsers(user.id!, input)
  }

  @Query(() => Paging, { nullable: true })
  adminFindUsersCount(@CtxUser() user: User, @Args('input') input: AdminFindUsersInput) {
    return this.service.adminFindUsersCount(user.id!, input)
  }

  @Query(() => User, { nullable: true })
  adminGetUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.adminGetUser(user.id!, userId)
  }

  @Mutation(() => User, { nullable: true })
  adminUpdateUser(@CtxUser() user: User, @Args('userId') userId: string, @Args('input') input: AdminUpdateUserInput) {
    return this.service.adminUpdateUser(user.id!, userId, input)
  }
}
