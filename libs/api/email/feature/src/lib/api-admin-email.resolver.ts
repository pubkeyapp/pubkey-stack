import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-stack/api-auth-data-access'
import {
  AdminCreateEmailInput,
  AdminFindManyEmailInput,
  AdminUpdateEmailInput,
  ApiEmailService,
  Email,
} from '@pubkey-stack/api-email-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminEmailResolver {
  constructor(private readonly service: ApiEmailService) {}

  @Mutation(() => Email, { nullable: true })
  adminCreateEmail(@Args('input') input: AdminCreateEmailInput) {
    return this.service.admin.createEmail(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteEmail(@Args('emailId') emailId: string) {
    return this.service.admin.deleteEmail(emailId)
  }

  @Query(() => [Email], { nullable: true })
  adminFindManyEmail(@Args('input') input: AdminFindManyEmailInput) {
    return this.service.admin.findManyEmail(input)
  }

  @Mutation(() => Email, { nullable: true })
  adminUpdateEmail(@Args('emailId') emailId: string, @Args('input') input: AdminUpdateEmailInput) {
    return this.service.admin.updateEmail(emailId, input)
  }
}
