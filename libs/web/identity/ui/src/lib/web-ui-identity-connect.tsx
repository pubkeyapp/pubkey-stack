import { Alert } from '@mantine/core'
import { IdentityProvider } from '@pubkey-stack/sdk'
import { useUserFindManyIdentity } from '@pubkey-stack/web/identity/data-access'
import { UiDashboardContainer } from '@pubkey-stack/web/ui/core'

import { WebUiIdentityDiscordLinkButton } from './web-ui-identity-discord-link-button'
import { WebUiIdentityIcon } from './web-ui-identity-icon'
import { WebUiIdentitySolanaLinkButton } from './web-ui-identity-solana-link-button'

export function WebUiIdentityConnect() {
  const { hasDiscord, hasSolana, items, query } = useUserFindManyIdentity()
  return (
    <UiDashboardContainer>
      {hasDiscord ? (
        <Alert
          icon={<WebUiIdentityIcon provider={IdentityProvider.Discord} />}
          title="Connected"
          color="green"
          variant="outline"
        >
          Discord account is connected
        </Alert>
      ) : (
        <WebUiIdentityDiscordLinkButton />
      )}
      {hasSolana ? (
        <Alert
          icon={<WebUiIdentityIcon provider={IdentityProvider.Solana} />}
          title="Connected"
          color="green"
          variant="outline"
        >
          Solana wallet is connected
        </Alert>
      ) : (
        <WebUiIdentitySolanaLinkButton
          disabled={hasSolana}
          label="Link Solana Wallet"
          size="xl"
          fullWidth
          leftIcon={<WebUiIdentityIcon provider={IdentityProvider.Solana} />}
          items={items ?? []}
          refresh={() => query.refetch()}
        />
      )}
    </UiDashboardContainer>
  )
}
