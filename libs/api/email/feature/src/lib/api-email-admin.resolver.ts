import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-stack/api/auth/data-access'
import {
  AdminCreateEmailInput,
  AdminFindEmailsInput,
  AdminUpdateEmailInput,
  ApiEmailAdminService,
  Email,
} from '@pubkey-stack/api/email/data-access'
import { User } from '@pubkey-stack/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiEmailAdminResolver {
  constructor(private readonly service: ApiEmailAdminService) {}

  @Mutation(() => Email, { nullable: true })
  adminCreateEmail(@CtxUser() user: User, @Args('input') input: AdminCreateEmailInput) {
    return this.service.adminCreateEmail(user.id!, input)
  }
  @Mutation(() => Boolean, { nullable: true })
  adminDeleteEmail(@CtxUser() user: User, @Args('emailId') emailId: string) {
    return this.service.adminDeleteEmail(user.id!, emailId)
  }
  @Query(() => [Email], { nullable: true })
  adminFindEmails(@CtxUser() user: User, @Args('input') input: AdminFindEmailsInput) {
    return this.service.adminFindEmails(user.id!, input)
  }
  @Mutation(() => Email, { nullable: true })
  adminUpdateEmail(
    @CtxUser() user: User,
    @Args('emailId') emailId: string,
    @Args('input') input: AdminUpdateEmailInput,
  ) {
    return this.service.adminUpdateEmail(user.id!, emailId, input)
  }
}
