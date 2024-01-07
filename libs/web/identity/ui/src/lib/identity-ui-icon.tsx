import { IdentityProvider } from '@pubkey-stack/sdk'
import { IconBrandDiscord, IconBrandGithub, IconCurrencySolana, IconQuestionMark } from '@tabler/icons-react'

export function IdentityUiIcon({ provider, size }: { provider: IdentityProvider; size?: number }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IconBrandDiscord size={size} />
    case IdentityProvider.GitHub:
      return <IconBrandGithub size={size} />
    case IdentityProvider.Solana:
      return <IconCurrencySolana size={size} />
    default:
      return <IconQuestionMark size={size} />
  }
}
