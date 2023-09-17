import { IdentityProvider } from '@pubkey-stack/sdk'
import { IconBrandDiscord, IconCurrencySolana, IconQuestionMark } from '@tabler/icons-react'

export function WebUiIdentityIcon({ provider }: { provider: IdentityProvider }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IconBrandDiscord />
    case IdentityProvider.Solana:
      return <IconCurrencySolana />
    default:
      return <IconQuestionMark />
  }
}
