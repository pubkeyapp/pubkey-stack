import { useUserFindManyIdentity } from '@pubkey-stack/web-identity-data-access'
import { UiStack } from '@pubkey-ui/core'
import { IdentityUiDiscordLinkButton } from './identity-ui-discord-link-button'
import { IdentityUiGithubLinkButton } from './identity-ui-github-link-button'
import { IdentityUiSolanaLinkButton } from './identity-ui-solana-link-button'

export function IdentityUiConnect() {
  const { hasDiscord, hasGithub, hasSolana, items, query } = useUserFindManyIdentity()

  return hasDiscord && hasSolana ? null : (
    <UiStack>
      {!hasDiscord ? <IdentityUiDiscordLinkButton disabled={hasDiscord} /> : null}
      {!hasGithub ? <IdentityUiGithubLinkButton disabled={hasGithub} /> : null}
      {!hasSolana ? (
        <IdentityUiSolanaLinkButton disabled={hasSolana} identities={items ?? []} refresh={() => query.refetch()} />
      ) : null}
    </UiStack>
  )
}
