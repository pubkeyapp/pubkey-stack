import { User } from '@pubkey-stack/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-stack/web-ui-core'

export type UserUiAvatarProps = UiAvatarProps & {
  user?: User
}

export function UserUiAvatar({ user, ...props }: UserUiAvatarProps) {
  return <UiAvatar avatarUrl={user?.avatarUrl} name={user?.username} {...props} />
}
