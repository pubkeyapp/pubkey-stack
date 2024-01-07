import { useUserFindManyIdentity } from '@pubkey-stack/web-identity-data-access'
import { WebUiIdentityDiscordLinkButton } from './web-ui-identity-discord-link-button'
import { WebUiIdentitySolanaLinkButton } from './web-ui-identity-solana-link-button'
import { UiStack } from '@pubkey-ui/core'

export function WebUiIdentityConnect() {
  const { hasDiscord, hasSolana, items, query } = useUserFindManyIdentity()

  return hasDiscord && hasSolana ? null : (
    <UiStack>
      {!hasDiscord ? <WebUiIdentityDiscordLinkButton disabled={hasDiscord} /> : null}
      {!hasSolana ? (
        <WebUiIdentitySolanaLinkButton disabled={hasSolana} identities={items ?? []} refresh={() => query.refetch()} />
      ) : null}
    </UiStack>
  )
}
