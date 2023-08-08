import { User } from '@pubkey-stack/sdk'
import { Avatar, AvatarProps, Tooltip } from '@mantine/core'

export interface WebUserUiAvatarProps extends AvatarProps {
  user?: User
  tooltipLabel?: string
}
export function WebUserUiAvatar({ user, tooltipLabel, ...props }: WebUserUiAvatarProps) {
  const firstLetter = user?.username?.charAt(0) ?? '?'
  const content = user?.avatarUrl ? (
    <Avatar radius={100} src={user.avatarUrl} alt={`User ${user.username} avatar`} {...props} />
  ) : (
    <Avatar radius={100} color="brand" {...props}>
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
