import { Avatar, getGradient } from '@mantine/core'
import { Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { IconCurrencySolana } from '@tabler/icons-react'

export function WebUiIdentityAvatar({ item }: { item: Identity }) {
  if (item.provider === IdentityProvider.Solana) {
    return (
      <Avatar
        radius={100}
        styles={(theme) => ({
          root: { background: getGradient({ deg: 45, from: '#9945FF', to: '#14F195' }, theme) },
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
