import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from '@pubkey-stack/api/user/data-access'

@Resolver(() => User)
export class ApiUserResolver {
  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: User) {
    return user.avatarUrl?.length ? user.avatarUrl : null
  }

  @ResolveField(() => String, { nullable: true })
  profileUrl(@Parent() user: User) {
    return ['/profile', user.username].join('/')
  }
}
