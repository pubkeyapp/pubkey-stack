import { Avatar } from '@mantine/core'
import { Identity, IdentityProvider } from '@solana-collective/sdk'
import { IconCurrencySolana } from '@tabler/icons-react'

export function IdentityUiAvatar({ item }: { item: Identity }) {
  if (item.provider === IdentityProvider.Solana) {
    return (
      <Avatar
        radius={100}
        styles={(theme) => ({
          root: { background: theme.fn.linearGradient(45, '#9945FF', '#14F195') },
          placeholder: { background: 'transparent', color: 'white' },
        })}
      >
        <IconCurrencySolana size={28} />
      </Avatar>
    )
  }
  return item.profile?.avatarUrl ? (
    <Avatar radius={100} src={item.profile?.avatarUrl} alt={`${item.provider} avatar`} />
  ) : (
    <Avatar radius={100}>{item.profile?.username.substring(0, 1)}</Avatar>
  )
}
