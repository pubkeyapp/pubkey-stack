import { Alert } from '@mantine/core'
import { IdentityProvider } from '@pubkey-stack/sdk'
import { useUserIdentities } from '@pubkey-stack/web/identity/data-access'
import { UiDashboardContainer } from '@pubkey-stack/web/ui/core'

import { IdentityUiDiscordLinkButton } from './identity-ui-discord-link-button'
import { IdentityUiIcon } from './identity-ui-icon'
import { IdentityUiSolanaLinkButton } from './identity-ui-solana-link-button'

export function IdentityUiConnect() {
  const { hasDiscord, hasSolana, items, query } = useUserIdentities()
  return (
    <UiDashboardContainer>
      {hasDiscord ? (
        <Alert
          icon={<IdentityUiIcon provider={IdentityProvider.Discord} />}
          title="Connected"
          color="green"
          variant="outline"
        >
          Discord account is connected
        </Alert>
      ) : (
        <IdentityUiDiscordLinkButton />
      )}
      {hasSolana ? (
        <Alert
          icon={<IdentityUiIcon provider={IdentityProvider.Solana} />}
          title="Connected"
          color="green"
          variant="outline"
        >
          Solana wallet is connected
        </Alert>
      ) : (
        <IdentityUiSolanaLinkButton
          disabled={hasSolana}
          label="Link Solana Wallet"
          size="xl"
          fullWidth
          leftIcon={<IdentityUiIcon provider={IdentityProvider.Solana} />}
          items={items ?? []}
          refresh={() => query.refetch()}
        />
      )}
    </UiDashboardContainer>
  )
}
