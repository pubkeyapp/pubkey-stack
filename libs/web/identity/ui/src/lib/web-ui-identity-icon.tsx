import { IdentityProvider } from '@pubkey-stack/sdk'
import { IconBrandDiscord, IconBrandGithub, IconCurrencySolana, IconQuestionMark } from '@tabler/icons-react'

export function WebUiIdentityIcon({ provider }: { provider: IdentityProvider }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IconBrandDiscord />
    case IdentityProvider.GitHub:
      return <IconBrandGithub />
    case IdentityProvider.Solana:
      return <IconCurrencySolana />
    default:
      return <IconQuestionMark />
  }
}
