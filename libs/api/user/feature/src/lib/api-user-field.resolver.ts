import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { getAvatarUrl } from '@pubkey-stack/api/core/data-access'
import { User } from '@pubkey-stack/api/user/data-access'

@Resolver(() => User)
export class ApiUserFieldResolver {
  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: User) {
    return user.avatarUrl?.length ? user.avatarUrl : getAvatarUrl(`pubkey-stack-${user.username}`, { variant: 'pixel' })
  }

  @ResolveField(() => String, { nullable: true })
  profileUrl(@Parent() user: User) {
    return ['/profile', user.username].join('/')
  }
}
