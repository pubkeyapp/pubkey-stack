import { useUserFindManyIdentity } from '@pubkey-stack/web-identity-data-access'
import { WebUiIdentityDiscordLinkButton } from './web-ui-identity-discord-link-button'
import { WebUiIdentitySolanaLinkButton } from './web-ui-identity-solana-link-button'
import { UiStack } from '@pubkey-ui/core'
import { WebUiIdentityGithubLinkButton } from './web-ui-identity-github-link-button'

export function WebUiIdentityConnect() {
  const { hasDiscord, hasGithub, hasSolana, items, query } = useUserFindManyIdentity()

  return hasDiscord && hasSolana ? null : (
    <UiStack>
      {!hasDiscord ? <WebUiIdentityDiscordLinkButton disabled={hasDiscord} /> : null}
      {!hasGithub ? <WebUiIdentityGithubLinkButton disabled={hasGithub} /> : null}
      {!hasSolana ? (
        <WebUiIdentitySolanaLinkButton disabled={hasSolana} identities={items ?? []} refresh={() => query.refetch()} />
      ) : null}
    </UiStack>
  )
}
