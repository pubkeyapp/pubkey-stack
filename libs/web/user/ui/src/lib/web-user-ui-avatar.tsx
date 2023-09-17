import { Avatar, AvatarProps, Tooltip } from '@mantine/core'
import { getRandomInt, User } from '@pubkey-stack/sdk'
import { getColorByIndex } from '@pubkey-stack/web/ui/core'

export interface WebUserUiAvatarProps extends Omit<AvatarProps, 'src'> {
  user?: User
  tooltipLabel?: string
}
export function WebUserUiAvatar({ user, tooltipLabel, ...props }: WebUserUiAvatarProps) {
  const firstLetter = user?.username?.charAt(0) ?? '?'

  const content = user?.avatarUrl?.length ? (
    <Avatar radius={100} src={user.avatarUrl} alt={`User ${user.username} avatar`} {...props} />
  ) : (
    <Avatar radius={100} color={getColorByIndex(getRandomInt(user?.username ?? ''))} {...props}>
      {firstLetter}
    </Avatar>
  )

  return tooltipLabel ? (
    <Tooltip label={tooltipLabel} withArrow>
      {content}
    </Tooltip>
  ) : (
    content
  )
}
